import { JoinContainer, RoomContainer } from './components';
import { useMainService } from './contexts';

export default function App() {
	const { joined } = useMainService();

	return joined ? <RoomContainer /> : <JoinContainer />;
}
