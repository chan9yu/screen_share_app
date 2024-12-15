import { useMainService } from '../../contexts';
import { useScreenShare } from '../../hooks';
import * as S from './RoomContainer.styles';

export default function RoomContainer() {
	const { mainService } = useMainService();

	const { changeScreenShare, sharing, startScreenShare, stopScreenShare, stream, videoRef } = useScreenShare();

	return (
		<S.Container>
			<S.Video ref={videoRef} autoPlay playsInline />
			{!mainService.isHost && (
				<S.Toolbar>
					<S.Menu color="blue" onClick={startScreenShare}>
						Start Screen
					</S.Menu>
					<S.Menu color="blue" disabled={!sharing} onClick={changeScreenShare}>
						Change Screen
					</S.Menu>
					<S.Menu color="red" disabled={!sharing} onClick={stopScreenShare}>
						Stop Screen
					</S.Menu>
				</S.Toolbar>
			)}
		</S.Container>
	);
}
