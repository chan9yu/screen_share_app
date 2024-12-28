import { useTheme } from '@emotion/react';
import { RotatingLines } from 'react-loader-spinner';

import * as S from './LoaderOverlay.styles';

type ActionButton = {
	text?: string;
	onClick?: () => void;
};

type LoaderOverlayProps = {
	message?: string;
	confirmAction?: ActionButton;
	cancelAction?: ActionButton;
};

export default function LoaderOverlay({ message, confirmAction, cancelAction }: LoaderOverlayProps) {
	const { colors } = useTheme();

	return (
		<S.Container>
			<RotatingLines
				visible={true}
				width="96"
				strokeColor={colors.white}
				strokeWidth="5"
				animationDuration="0.75"
				ariaLabel="loader-overlay"
			/>
			{message && <S.Message>{message}</S.Message>}
			<S.Buttons>
				{confirmAction && (
					<S.Button color="blue" onClick={confirmAction.onClick}>
						{confirmAction.text ?? '확인'}
					</S.Button>
				)}
				{cancelAction && (
					<S.Button color="red" onClick={cancelAction.onClick}>
						{cancelAction.text ?? '취소'}
					</S.Button>
				)}
			</S.Buttons>
		</S.Container>
	);
}
