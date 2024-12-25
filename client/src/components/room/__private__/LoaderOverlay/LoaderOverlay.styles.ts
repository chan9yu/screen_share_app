import styled from '@emotion/styled';

export const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 20px;
	background-color: ${({ theme }) => theme.colors.gray_opacity[90]};
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1000;
`;

export const Message = styled.span`
	color: ${({ theme }) => theme.colors.white};
	font: ${({ theme }) => theme.typography.B300};
`;

export const Buttons = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

export const Button = styled.button<{ color: 'red' | 'blue' }>`
	min-width: 120px;
	height: 40px;
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
		background-color: ${({ color, theme }) => theme.colors[color][100]};
	}

	&:hover:not(&:disabled) {
		background-color: ${({ color, theme }) => theme.colors[color][600]};
	}

	&:active:not(&:disabled) {
		background-color: ${({ color, theme }) => theme.colors[color][700]};
	}
`;
