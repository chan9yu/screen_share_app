import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { roomApi } from '../../apis';
import { Icon } from '../common';
import * as S from './JoinContainer.styles';

export default function JoinContainer() {
	const { colors } = useTheme();

	const [roomId, setRoomId] = useState<string | null>(null);

	const handleCreateAccessCode = async () => {
		if (roomId) {
			try {
				await roomApi.closeRoom(roomId);
				setRoomId(null);
			} catch (error) {
				console.error(error);
			}
		} else {
			try {
				const { roomId } = await roomApi.createRoom();
				setRoomId(roomId);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleCopyToRoomId = async () => {
		if (!roomId) return;

		try {
			await navigator.clipboard.writeText(roomId);
			toast.success('클립보드에 복사하였습니다.');
		} catch (error) {
			console.error('Failed to copy text:', error);
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
				<S.CardDescription>다른 사용자가 원격으로 내 컴퓨터를 제어할 수 있도록 코드를 생성합니다</S.CardDescription>
				<S.CaedContents>
					{roomId && (
						<S.AccessCode>
							{roomId.slice(0, 3)}&nbsp;{roomId.slice(3)}
							<S.IconBox onClick={handleCopyToRoomId}>
								<Icon name="clipboard" width={18} stroke={colors.gray[800]} />
							</S.IconBox>
						</S.AccessCode>
					)}
				</S.CaedContents>
				<S.Button color="blue" onClick={handleCreateAccessCode}>
					{roomId ? '취소' : '코드 생성'}
				</S.Button>
			</S.Card>
			<S.Card>
				<S.CardHeader>
					<S.CardIcon color="red">
						<Icon name="monitor_up" stroke={colors.red[500]} />
					</S.CardIcon>
					<S.CardTitle>다른 컴퓨터에 연결</S.CardTitle>
				</S.CardHeader>
				<S.CardDescription>원격 액세스 코드를 입력하여 다른 컴퓨터에 연결합니다</S.CardDescription>
				<S.CaedContents>
					<S.Input placeholder="엑세스 코드를 입력하세요" />
				</S.CaedContents>
				<S.Button color="red">연결</S.Button>
			</S.Card>
		</S.Container>
	);
}
