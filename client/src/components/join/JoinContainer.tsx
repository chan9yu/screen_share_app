import { useTheme } from '@emotion/react';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { roomApi } from '../../apis';
import { useMainService } from '../../contexts';
import { Icon } from '../common';
import * as S from './JoinContainer.styles';

export default function JoinContainer() {
	const { colors } = useTheme();
	const { mainService } = useMainService();

	const [accessCode, setAccessCode] = useState('');

	const handleCreateAccessCode = async () => {
		if (accessCode) {
			mainService.sendLeave(accessCode);

			try {
				await roomApi.closeRoom(accessCode);
				setAccessCode('');
			} catch (error) {
				console.error(error);
			}
		} else {
			try {
				const { roomId } = await roomApi.createRoom();
				setAccessCode(roomId);
				mainService.sendJoin(roomId);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleCopyToRoomId = async () => {
		if (!accessCode) return;

		try {
			await navigator.clipboard.writeText(accessCode);
			toast.success('클립보드에 복사하였습니다.');
		} catch (error) {
			console.error('Failed to copy text:', error);
		}
	};

	// 다른 컴퓨터에 연결

	const [joinAccessCode, setJoinAccessCode] = useState<string>('');

	const handleChangeJoinAccessCode = (e: ChangeEvent<HTMLInputElement>) => {
		// setJoinAccessCode(e.target.value);
	};

	const handleConnectRoom = () => {
		// if (!joinAccessCode) {
		// 	alert('엑세스 코드가 필요합니다.');
		// 	return;
		// }
		// sendJoinRoom(joinAccessCode);
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
					{accessCode && (
						<S.AccessCode>
							{accessCode.slice(0, 3)}&nbsp;{accessCode.slice(3)}
							<S.IconBox onClick={handleCopyToRoomId}>
								<Icon name="clipboard" width={18} stroke={colors.gray[800]} />
							</S.IconBox>
						</S.AccessCode>
					)}
				</S.CaedContents>
				<S.Button color="blue" onClick={handleCreateAccessCode}>
					{accessCode ? '취소' : '코드 생성'}
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
					<S.Input
						type="number"
						maxLength={6}
						minLength={6}
						placeholder="엑세스 코드를 입력하세요"
						value={joinAccessCode}
						onChange={handleChangeJoinAccessCode}
					/>
				</S.CaedContents>
				<S.Button color="red" onClick={handleConnectRoom}>
					연결
				</S.Button>
			</S.Card>
		</S.Container>
	);
}
