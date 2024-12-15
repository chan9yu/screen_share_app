import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { useMainService } from '../../contexts';
import { useScreenShare } from '../../hooks';
import * as S from './RoomContainer.styles';

export default function RoomContainer() {
	const { mainService, isHost, remoteStream, setJoined } = useMainService();
	const { changeScreenShare, sharing, startScreenShare, stopScreenShare, stream, videoRef } = useScreenShare();

	const remoteVideoRef = useRef<HTMLVideoElement>(null);
	// local 환경에서 한 번만 실행할 수 있도록 임시 설정
	const hasExecuted = useRef(false);

	const handleClose = () => {
		if (confirm('나가시겠습니까?')) {
			mainService.sendLeave();
			// mainService.close();
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

	useEffect(() => {
		if (stream) {
			mainService.sendOffer(stream);
		}
	}, [stream]);

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
						<S.Menu color="blue" disabled={sharing} onClick={startScreenShare}>
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
				<>
					{!remoteStream && <S.Loading>준비 중입니다. 잠시만 기다려주세요.</S.Loading>}
					<S.Video id="remote-video" ref={remoteVideoRef} autoPlay playsInline />
				</>
			)}
			<S.CloseButton onClick={handleClose}>X</S.CloseButton>
		</S.Container>
	);
}
