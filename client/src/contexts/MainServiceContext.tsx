import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react';
import { MainService } from '../services/MainService';

type MainServiceContextProps = {
	mainService: MainService;
	isHost: boolean;
	setIsHost: Dispatch<SetStateAction<boolean>>;
	joined: boolean;
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

	useEffect(() => {
		mainService.connectToSocket();
		mainService.on('state', data => {
			setJoined(data?.joined);
		});

		mainService.on('media', data => {
			setRemoteStream(data?.remoteStream);
		});
	}, []);

	const value = useMemo(
		() => ({
			mainService,
			isHost,
			setIsHost,
			joined,
			remoteStream
		}),
		[isHost, joined, remoteStream]
	);

	return <MainServiceContext.Provider value={value}>{children}</MainServiceContext.Provider>;
}
