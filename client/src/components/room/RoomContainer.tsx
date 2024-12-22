import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { useMainService } from '../../contexts';
import { GuestScreen, HostScreen } from './__private__';
import * as S from './RoomContainer.styles';

export default function RoomContainer() {
	const { mainService, isHost, setJoined } = useMainService();

	// local 환경에서 한 번만 실행할 수 있도록 임시 설정
	const hasExecuted = useRef(false);

	const handleClose = () => {
		if (confirm('나가시겠습니까?')) {
			mainService.sendLeave();
			setJoined(false);
		}
	};

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
