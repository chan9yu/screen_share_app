import { useEffect } from 'react';

import { useMainService } from '../../../../contexts';
import { useScreenShare } from '../../../../hooks';
import * as S from './HostScreen.styles';

export default function HostScreen() {
	const { mainService } = useMainService();
	const { changeScreenShare, sharing, startScreenShare, stream, videoRef } = useScreenShare();

	useEffect(() => {
		if (stream) {
			mainService.sendOffer(stream);
		}
	}, [stream]);

	return (
		<S.Container id="host-screen">
			<S.Video ref={videoRef} autoPlay playsInline />
			<S.Toolbar>
				<S.Menu color="blue" disabled={sharing} onClick={startScreenShare}>
					Start Screen
				</S.Menu>
				<S.Menu color="blue" disabled={!sharing} onClick={changeScreenShare}>
					Change Screen
				</S.Menu>
			</S.Toolbar>
		</S.Container>
	);
}
