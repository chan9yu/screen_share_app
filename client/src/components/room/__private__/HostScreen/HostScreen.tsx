import { useEffect } from 'react';

import { useMainService } from '../../../../contexts';
import { useScreenShare } from '../../../../hooks';
import LoaderOverlay from '../LoaderOverlay';
import * as S from './HostScreen.styles';

type HostScreenProps = {
	onClose: () => void;
};

export default function HostScreen({ onClose }: HostScreenProps) {
	const { connectionState, mainService } = useMainService();
	const { changeScreenShare, sharing, startScreenShare, stream, videoRef } = useScreenShare();

	useEffect(() => {
		if (stream) {
			mainService.sendOffer(stream);
		}
	}, [stream]);

	return (
		<S.Container id="host-screen">
			{connectionState !== 'connected' && (
				<LoaderOverlay
					message="공유를 시작해주세요."
					cancelAction={{ onClick: onClose, text: '나가기' }}
					confirmAction={{ onClick: startScreenShare, text: '화면공유' }}
				/>
			)}
			<S.Video ref={videoRef} autoPlay playsInline />
			<S.Toolbar>
				<S.Menu color="blue" disabled={!sharing} onClick={changeScreenShare}>
					Change Screen
				</S.Menu>
			</S.Toolbar>
		</S.Container>
	);
}
