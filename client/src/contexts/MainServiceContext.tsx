import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';
import { toast } from 'react-toastify';

import { webrtcApi } from '../apis';
import { MainService } from '../services';

type MainServiceContextProps = {
	mainService: MainService;
	isHost: boolean;
	setIsHost: Dispatch<SetStateAction<boolean>>;
	joined: boolean;
	setJoined: Dispatch<SetStateAction<boolean>>;
	connectionState: RTCPeerConnectionState | null;
	remoteStream: MediaStream | null;
};

const MainServiceContext = createContext<MainServiceContextProps | undefined>(undefined);
const mainService = new MainService();

export const useMainService = () => {
	const context = useContext(MainServiceContext);
	if (!context) {
		throw new Error('useMainService must be used within a MainServiceProvider');
	}

	return context;
};

export function MainServiceProvider({ children }: PropsWithChildren) {
	const [isHost, setIsHost] = useState(false);
	const [isConnected, setIsConnected] = useState(false);
	const [joined, setJoined] = useState(false);
	const [connectionState, setConnectionState] = useState<RTCPeerConnectionState | null>(null);
	const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

	// local 환경에서 한 번만 실행할 수 있도록 임시 설정
	const hasExecuted = useRef(false);

	useEffect(() => {
		if (!hasExecuted.current) {
			mainService.connectToSocket();

			mainService.on('state', data => {
				setJoined(data?.joined);
				setConnectionState(data?.connection ?? null);
			});

			mainService.on('media', data => {
				setRemoteStream(data?.remoteStream ?? null);
			});

			hasExecuted.current = true;
		}
	}, []);

	const handleConnectionUpdate = useCallback(async () => {
		if (joined) {
			setIsConnected(true);
			return;
		}

		const { servers } = await webrtcApi.getWebRTCTurn();

		if (isConnected) {
			toast.error('상대방과 연결이 종료되어 대기 페이지로 이동합니다.');
			setRemoteStream(null);
			mainService.resetRTCPeer({ iceServers: servers });
			mainService.reconnectSocket();
		} else {
			mainService.initRTCPeer({ iceServers: servers });
			mainService.connectToSocket();
		}
	}, [joined, isConnected]);

	useEffect(() => {
		handleConnectionUpdate();
	}, [joined, isConnected]);

	const value = useMemo(
		() => ({
			mainService,
			isHost,
			setIsHost,
			joined,
			setJoined,
			connectionState,
			remoteStream
		}),
		[isHost, joined, connectionState, remoteStream]
	);

	return <MainServiceContext.Provider value={value}>{children}</MainServiceContext.Provider>;
}
