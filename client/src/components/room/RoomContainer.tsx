import { useEffect, useRef } from 'react';

import { useMainService } from '../../contexts';
import { useScreenShare } from '../../hooks';
import * as S from './RoomContainer.styles';

export default function RoomContainer() {
	const { mainService, isHost, remoteStream } = useMainService();

	const { changeScreenShare, sharing, startScreenShare, stopScreenShare, stream, videoRef } = useScreenShare();

	useEffect(() => {
		if (stream) {
			mainService.sendOffer(stream);
		}
	}, [stream]);

	const remoteVideoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (remoteVideoRef.current && remoteStream) {
			remoteVideoRef.current.srcObject = remoteStream;
			remoteVideoRef.current.play();
		}
	}, [remoteStream]);

	return (
		<S.Container>
			{isHost ? (
				<>
					<S.Video id="local-video" ref={videoRef} autoPlay playsInline />
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
				</>
			) : (
				<S.Video id="remote-video" ref={remoteVideoRef} autoPlay playsInline />
			)}
		</S.Container>
	);
}
