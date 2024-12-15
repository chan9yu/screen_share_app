import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';
import { MainService } from '../services/MainService';
import { toast } from 'react-toastify';

type MainServiceContextProps = {
	mainService: MainService;
	isHost: boolean;
	setIsHost: Dispatch<SetStateAction<boolean>>;
	joined: boolean;
	setJoined: Dispatch<SetStateAction<boolean>>;
	remoteStream?: MediaStream;
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
	const [joined, setJoined] = useState(false);
	const [remoteStream, setRemoteStream] = useState<MediaStream>();

	// local 환경에서 한 번만 실행할 수 있도록 임시 설정
	const hasExecuted = useRef(false);

	useEffect(() => {
		if (!hasExecuted.current) {
			mainService.connectToSocket();
			mainService.on('state', data => {
				setJoined(data?.joined);

				if (!data?.joined) {
					toast.error('연결이 종료되어 대기 페이지로 이동합니다.');
				}
			});

			mainService.on('media', data => {
				setRemoteStream(data?.remoteStream);
			});

			hasExecuted.current = true;
		}
	}, []);

	const value = useMemo(
		() => ({
			mainService,
			isHost,
			setIsHost,
			joined,
			setJoined,
			remoteStream
		}),
		[isHost, joined, remoteStream]
	);

	return <MainServiceContext.Provider value={value}>{children}</MainServiceContext.Provider>;
}
