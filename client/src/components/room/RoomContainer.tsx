import { useTheme } from '@emotion/react';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { useMainService } from '../../contexts';
import { usePreventRefresh } from '../../hooks';
import { Icon } from '../common';
import { GuestScreen, HostScreen } from './__private__';
import * as S from './RoomContainer.styles';

export default function RoomContainer() {
	const { colors } = useTheme();
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

	// 새로고침 시 접속 중인 room leave
	usePreventRefresh({
		callback: handleLeave,
		shouldPreventDefault: false
	});

	useEffect(() => {
		if (!hasExecuted.current) {
			toast.info('방에 입장하였습니다.');
			hasExecuted.current = true;
		}
	}, []);

	return (
		<S.Container>
			{isHost ? <HostScreen onClose={handleClose} /> : <GuestScreen onClose={handleClose} />}
			<S.CloseButton onClick={handleClose}>
				<Icon name="close" color={colors.white} width={16} height={16} />
			</S.CloseButton>
		</S.Container>
	);
}
