import styled from '@emotion/styled';

export const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 24px;
`;

export const Card = styled.div`
	width: 400px;
	padding: 40px;
	display: flex;
	flex-direction: column;
	gap: 16px;
	background-color: ${({ theme }) => theme.colors.white};
	box-shadow: 0px 2px 2px 0px ${({ theme }) => theme.colors.gray_opacity[10]};
	border-radius: 8px;
`;

export const CardHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

export const CardIcon = styled.div<{ color: 'red' | 'blue' }>`
	background-color: ${({ color, theme }) => theme.colors[color][50]};
	padding: 12px;
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const CardTitle = styled.h3`
	font: ${({ theme }) => theme.typography.B400};
`;

export const CardDescription = styled.span`
	color: ${({ theme }) => theme.colors.gray[600]};
	font: ${({ theme }) => theme.typography.R200};
`;

export const CaedContents = styled.div`
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const AccessCode = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	font: ${({ theme }) => theme.typography.B1000};
`;

export const IconBox = styled.div`
	position: absolute;
	top: 50%;
	right: 0;
	transform: translateY(-50%);
	width: 40px;
	height: 40px;
	cursor: pointer;
	border-radius: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: 150ms;
	border: 1px solid ${({ theme }) => theme.colors.gray[100]};

	&:hover {
		border-color: ${({ theme }) => theme.colors.gray[200]};
	}
`;

export const Input = styled.input`
	width: 100%;
	height: 100%;
	border-radius: 4px;
	padding: 12px;
	transition: 150ms;
	border: 1px solid ${({ theme }) => theme.colors.gray[100]};
	font: ${({ theme }) => theme.typography.R200};

	&[type='number']::-webkit-inner-spin-button {
		appearance: none;
	}

	&:focus {
		outline: 0;
		border-color: ${({ theme }) => theme.colors.gray[200]};
	}
`;

export const Button = styled.button<{ color: 'red' | 'blue' }>`
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

	&:hover {
		background-color: ${({ color, theme }) => theme.colors[color][600]};
	}

	&:active {
		background-color: ${({ color, theme }) => theme.colors[color][700]};
	}
`;
