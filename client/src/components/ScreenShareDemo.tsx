import { useRef, useState } from 'react';

export default function ScreenShareDemo() {
	const videoRef = useRef<HTMLVideoElement>(null);

	const [sharing, setSharing] = useState(false);
	const [stream, setStream] = useState<MediaStream | null>(null);

	const startScreenShare = async () => {
		try {
			const displayStream = await navigator.mediaDevices.getDisplayMedia({
				video: true,
				audio: true
			});

			if (videoRef.current) {
				videoRef.current.srcObject = displayStream;
				videoRef.current.play();
			}

			displayStream.getVideoTracks()[0].onended = () => {
				stopScreenShare();
			};

			setStream(displayStream);
			setSharing(true);
		} catch (error) {
			console.error('Error accessing display media:', error);
		}
	};

	const stopScreenShare = () => {
		if (videoRef.current && videoRef.current.srcObject) {
			const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
			tracks.forEach(track => track.stop());
			videoRef.current.srcObject = null;
		}

		setStream(null);
		setSharing(false);
	};

	const changeScreenShare = async () => {
		if (!stream || !videoRef.current) return;

		try {
			const newDisplayStream = await navigator.mediaDevices.getDisplayMedia({
				video: true,
				audio: true
			});

			const videoTrack = newDisplayStream.getVideoTracks()[0];
			const sender = stream.getVideoTracks()[0];

			if (sender) {
				stream.getTracks().forEach(track => track.stop());
				videoTrack.onended = () => stopScreenShare();
				setStream(newDisplayStream);
				videoRef.current.srcObject = newDisplayStream;
			}
		} catch (error) {
			console.error('Error changing display media:', error);
		}
	};

	return (
		<div style={{ textAlign: 'center', marginTop: '50px' }}>
			<h1>Screen Share Demo</h1>
			<div style={{ marginBottom: '10px' }}>
				<button
					onClick={sharing ? stopScreenShare : startScreenShare}
					style={{
						padding: '10px 20px',
						fontSize: '16px',
						cursor: 'pointer',
						backgroundColor: sharing ? 'red' : 'green',
						color: 'white',
						border: 'none',
						borderRadius: '5px',
						marginRight: '10px'
					}}
				>
					{sharing ? 'Stop Sharing' : 'Start Sharing'}
				</button>
				{sharing && (
					<button
						onClick={changeScreenShare}
						style={{
							padding: '10px 20px',
							fontSize: '16px',
							cursor: 'pointer',
							backgroundColor: 'blue',
							color: 'white',
							border: 'none',
							borderRadius: '5px'
						}}
					>
						Change Screen
					</button>
				)}
			</div>
			<div style={{ marginTop: '20px' }}>
				<video
					ref={videoRef}
					style={{ width: '80%', border: '1px solid black', borderRadius: '10px' }}
					autoPlay
					muted
				></video>
			</div>
		</div>
	);
}
