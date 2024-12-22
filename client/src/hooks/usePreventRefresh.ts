import { useEffect } from 'react';

type UsePreventRefreshProps = {
	callback?: () => void;
	shouldPreventDefault?: boolean;
};

export default function usePreventRefresh({ callback, shouldPreventDefault = true }: UsePreventRefreshProps) {
	const preventClose = (e: BeforeUnloadEvent) => {
		shouldPreventDefault && e.preventDefault();
		callback?.();
	};

	useEffect(() => {
		window.addEventListener('beforeunload', preventClose);

		return () => {
			window.removeEventListener('beforeunload', preventClose);
		};
	}, [callback, shouldPreventDefault]);
}
