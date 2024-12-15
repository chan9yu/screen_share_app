import { useRef, useState } from 'react';

export default function useScreenShare() {
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [sharing, setSharing] = useState(false);

	const videoRef = useRef<HTMLVideoElement>(null);

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

	const stopScreenShare = () => {
		if (videoRef.current && videoRef.current.srcObject) {
			const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
			tracks.forEach(track => track.stop());
			videoRef.current.srcObject = null;
		}

		setStream(null);
		setSharing(false);
	};

	return {
		stream,
		sharing,
		videoRef,
		startScreenShare,
		changeScreenShare,
		stopScreenShare
	};
}
