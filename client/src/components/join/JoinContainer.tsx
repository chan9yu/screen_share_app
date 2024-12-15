import { useTheme } from '@emotion/react';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { roomApi } from '../../apis';
import { useMainService } from '../../contexts';
import { Icon } from '../common';
import * as S from './JoinContainer.styles';

export default function JoinContainer() {
	const { colors } = useTheme();
	const { mainService, setIsHost } = useMainService();

	const [createdRoomId, setCreatedRoomId] = useState('');
	const [joinRoomId, setJoinRoomId] = useState('');

	const handleCreateRoomId = async () => {
		if (createdRoomId) {
			mainService.sendLeave();

			try {
				await roomApi.closeRoom(createdRoomId);
				setCreatedRoomId('');
				setIsHost(false);
			} catch (error) {
				console.error(error);
			}
		} else {
			try {
				const { roomId } = await roomApi.createRoom();
				setCreatedRoomId(roomId);
				setIsHost(true);
				mainService.sendJoin(roomId);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleCopyToRoomId = async () => {
		if (!createdRoomId) return;

		try {
			await navigator.clipboard.writeText(createdRoomId);
			toast.success('클립보드에 복사하였습니다.');
		} catch (error) {
			console.error('Failed to copy text:', error);
		}
	};

	const handleChangeJoinRoomId = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value.length <= 6) {
			setJoinRoomId(e.target.value);
		}
	};

	const handleConnectRoom = async () => {
		if (!joinRoomId) {
			toast.error('RoomId가 필요합니다.');
			return;
		}

		const { success } = await roomApi.validateRoom(joinRoomId);

		if (success) {
			mainService.sendJoin(joinRoomId);
		} else {
			toast.error('방이 존재하지 않습니다.');
		}
	};

	return (
		<S.Container>
			<S.Card>
				<S.CardHeader>
					<S.CardIcon color="blue">
						<Icon name="monitor" stroke={colors.blue[500]} />
					</S.CardIcon>
					<S.CardTitle>화면 공유</S.CardTitle>
				</S.CardHeader>
				<S.CardDescription>다른 사용자가 원격으로 내 컴퓨터를 제어할 수 있도록 방을 생성합니다.</S.CardDescription>
				<S.CaedContents>
					{createdRoomId && (
						<S.RoomId>
							{createdRoomId.slice(0, 3)}&nbsp;{createdRoomId.slice(3)}
							<S.IconBox onClick={handleCopyToRoomId}>
								<Icon name="clipboard" width={18} stroke={colors.gray[800]} />
							</S.IconBox>
						</S.RoomId>
					)}
				</S.CaedContents>
				<S.Button color="blue" onClick={handleCreateRoomId}>
					{createdRoomId ? '취소' : '방 생성'}
				</S.Button>
			</S.Card>
			<S.Card>
				<S.CardHeader>
					<S.CardIcon color="red">
						<Icon name="monitor_up" stroke={colors.red[500]} />
					</S.CardIcon>
					<S.CardTitle>다른 컴퓨터에 연결</S.CardTitle>
				</S.CardHeader>
				<S.CardDescription>만들어진 방의 ID를 입력하여 다른 컴퓨터에 연결합니다.</S.CardDescription>
				<S.CaedContents>
					<S.Input
						type="number"
						maxLength={6}
						minLength={6}
						placeholder="입장할 방의 ID를 입력하세요"
						disabled={!!createdRoomId}
						value={joinRoomId}
						onChange={handleChangeJoinRoomId}
					/>
				</S.CaedContents>
				<S.Button color="red" disabled={!!createdRoomId} onClick={handleConnectRoom}>
					연결
				</S.Button>
			</S.Card>
		</S.Container>
	);
}
