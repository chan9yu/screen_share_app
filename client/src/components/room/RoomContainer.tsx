import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { useMainService } from '../../contexts';
import { usePreventRefresh } from '../../hooks';
import { GuestScreen, HostScreen } from './__private__';
import * as S from './RoomContainer.styles';

export default function RoomContainer() {
	const { mainService, isHost, setJoined } = useMainService();

	// local 환경에서 한 번만 실행할 수 있도록 임시 설정
	const hasExecuted = useRef(false);

	const handleLeave = () => {
		mainService.sendLeave();
		setJoined(false);
	};

	const handleClose = () => {
		confirm('나가시겠습니까?') && handleLeave();
	};

	usePreventRefresh({
		callback: handleLeave,
		shouldPreventDefault: false
	});

	useEffect(() => {
		if (!hasExecuted.current) {
			const message = isHost ? '공유를 시작해주세요.' : '공유 준비 중입니다.';
			toast.info(message);
			hasExecuted.current = true;
		}
	}, []);

	return (
		<S.Container>
			{isHost ? <HostScreen /> : <GuestScreen />}
			<S.CloseButton onClick={handleClose}>X</S.CloseButton>
		</S.Container>
	);
}
