import styled from '@emotion/styled';

export const Container = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
`;

export const CloseButton = styled.button`
	width: 20px;
	height: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 16px;
	border-radius: 999px;
	cursor: pointer;
	position: absolute;
	top: 20px;
	right: 20px;
	background-color: ${({ theme }) => theme.colors.red[600]};
	color: ${({ theme }) => theme.colors.white};
	font: ${({ theme }) => theme.typography.B200};
`;
