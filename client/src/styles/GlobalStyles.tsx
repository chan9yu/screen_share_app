import { css, Global, Theme, useTheme } from '@emotion/react';
import emotionReset from 'emotion-reset';

import PretendardVariable from '../assets/font/PretendardVariable.woff2';

const createGlobalStyles = (theme: Theme) => css`
	${emotionReset}

	@font-face {
		font-family: 'Pretendard Variable';
		font-weight: 400 500 700;
		font-style: normal;
		font-display: swap;
		src: url(${PretendardVariable}) format('woff2-variations');
	}

	*,
	*::after,
	*::before {
		box-sizing: border-box;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
	}

	body,
	#root {
		width: 100dvw;
		height: 100dvh;
		background-color: ${theme.colors.blueGray[100]};
		color: ${theme.colors.gray[800]};
		font: ${theme.typography.R200};
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	button {
		background: none;
		border: none;
		cursor: pointer;
	}
`;

export default function GlobalStyles() {
	const theme = useTheme();
	const globalStyles = createGlobalStyles(theme);

	return <Global styles={globalStyles} />;
}
