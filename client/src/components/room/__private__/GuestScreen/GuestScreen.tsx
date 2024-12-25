import { useEffect, useRef } from 'react';

import { useMainService } from '../../../../contexts';
import LoaderOverlay from '../LoaderOverlay';
import * as S from './GuestScreen.styles';

type GuestScreenProps = {
	onClose: () => void;
};

export default function GuestScreen({ onClose }: GuestScreenProps) {
	const remoteVideoRef = useRef<HTMLVideoElement>(null);

	const { connectionState, remoteStream } = useMainService();

	useEffect(() => {
		if (remoteVideoRef.current && remoteStream) {
			remoteVideoRef.current.srcObject = remoteStream;
			remoteVideoRef.current.play();
		}
	}, [remoteStream]);

	return (
		<S.Container id="guest-screen">
			{connectionState !== 'connected' && (
				<LoaderOverlay
					message="준비 중입니다. 잠시만 기다려주세요."
					cancelAction={{ onClick: onClose, text: '나가기' }}
				/>
			)}
			<S.Video ref={remoteVideoRef} autoPlay playsInline />
		</S.Container>
	);
}
