import styled from '@emotion/styled';

export const Container = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
`;

export const Video = styled.video`
	width: 100%;
	height: 100%;
`;

export const Toolbar = styled.div`
	position: absolute;
	left: 50%;
	bottom: 20px;
	transform: translateX(-50%);
	display: flex;
	gap: 8px;
`;

export const Menu = styled.button<{ color: 'red' | 'green' | 'blue' }>`
	padding: 10px 20px;
	font: ${({ theme }) => theme.typography.R200};
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	border: 0;
	transition: 150ms;
	background-color: ${({ color, theme }) => theme.colors[color][500]};
	color: ${({ theme }) => theme.colors.white};
	font: ${({ theme }) => theme.typography.B200};

	&:disabled {
		cursor: not-allowed;
		background-color: ${({ color, theme }) => theme.colors[color][200]};
	}

	&:hover:not(&:disabled) {
		background-color: ${({ color, theme }) => theme.colors[color][600]};
	}

	&:active:not(&:disabled) {
		background-color: ${({ color, theme }) => theme.colors[color][700]};
	}
`;
