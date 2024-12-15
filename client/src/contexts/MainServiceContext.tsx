import { PropsWithChildren, createContext, useContext, useEffect, useMemo } from 'react';
import { MainService } from '../services/MainService';

type MainServiceContextProps = {
	mainService: MainService;
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
	const value = useMemo(() => ({ mainService }), []);

	return <MainServiceContext.Provider value={value}>{children}</MainServiceContext.Provider>;
}
