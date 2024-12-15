import { useTheme } from '@emotion/react';
import { useState } from 'react';

import { Icon } from '../common';
import * as S from './JoinContainer.styles';

export default function JoinContainer() {
	const { colors } = useTheme();

	const [accessCode, setAccessCode] = useState<string | null>(null);

	const handleCreateAccessCode = () => {
		if (accessCode) {
			setAccessCode(null);
		} else {
			const newCode = Math.floor(100000 + Math.random() * 900000).toString();
			setAccessCode(newCode);
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
					{accessCode && (
						<S.AccessCode>
							{accessCode.slice(0, 3)}&nbsp;{accessCode.slice(3)}
							<S.IconBox>
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
					<S.Input placeholder="엑세스 코드를 입력하세요" />
				</S.CaedContents>
				<S.Button color="red">연결</S.Button>
			</S.Card>
		</S.Container>
	);
}
