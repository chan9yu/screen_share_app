import { useEffect, useRef } from 'react';

import { useMainService } from '../../../../contexts';
import * as S from './GuestScreen.styles';

export default function GuestScreen() {
	const remoteVideoRef = useRef<HTMLVideoElement>(null);

	const { remoteStream } = useMainService();

	useEffect(() => {
		if (remoteVideoRef.current && remoteStream) {
			remoteVideoRef.current.srcObject = remoteStream;
			remoteVideoRef.current.play();
		}
	}, [remoteStream]);

	return (
		<S.Container id="guest-screen">
			{!remoteStream && <S.LoadingText>준비 중입니다. 잠시만 기다려주세요.</S.LoadingText>}
			<S.Video ref={remoteVideoRef} autoPlay playsInline />
		</S.Container>
	);
}
