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
	joined: boolean;
	setJoined: Dispatch<SetStateAction<boolean>>;
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
	const [joined, setJoined] = useState(false);

	useEffect(() => {
		mainService.connectToSocket();
		mainService.on('state', data => {
			setJoined(data?.joined);
		});
	}, []);

	const value = useMemo(() => ({ mainService, joined, setJoined }), [joined]);

	return <MainServiceContext.Provider value={value}>{children}</MainServiceContext.Provider>;
}
