import styled from '@emotion/styled';

export const Container = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
`;

export const CloseButton = styled.button`
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 999px;
	cursor: pointer;
	position: absolute;
	top: 20px;
	right: 20px;
	transition: 150ms;
	background-color: ${({ theme }) => theme.colors.red[500]};
	color: ${({ theme }) => theme.colors.white};
	font: ${({ theme }) => theme.typography.B200};

	&:hover {
		background-color: ${({ theme }) => theme.colors.red[600]};
	}

	&:active {
		background-color: ${({ theme }) => theme.colors.red[700]};
	}

	> svg {
		flex-shrink: 0;
	}
`;
