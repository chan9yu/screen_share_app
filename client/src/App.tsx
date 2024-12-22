import styled from '@emotion/styled';

import { JoinContainer, RoomContainer } from './components';
import { useMainService } from './contexts';

export default function App() {
	const { joined } = useMainService();

	return (
		<>
			{joined ? <RoomContainer /> : <JoinContainer />}
			<VersionTab>v{APP_VERSION}</VersionTab>
		</>
	);
}

const VersionTab = styled.p`
	position: fixed;
	left: 12px;
	bottom: 12px;
	color: ${({ theme }) => theme.colors.gray[500]};
	font: ${({ theme }) => theme.typography.M200};
`;
