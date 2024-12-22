import styled from '@emotion/styled';

export const Container = styled.div`
	width: 100%;
	height: 100%;
`;

export const Video = styled.video`
	width: 100%;
	height: 100%;
`;

export const LoadingText = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	color: ${({ theme }) => theme.colors.gray[400]};
	font: ${({ theme }) => theme.typography.M500};
`;
