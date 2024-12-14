import { css, Global } from '@emotion/react';
import emotionReset from 'emotion-reset';

const styles = css`
	${emotionReset}

	*, *::after, *::before {
		box-sizing: border-box;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
	}

	body,
	#root {
		width: 100dvw;
		height: 100dvh;
		background-color: #f3f4f5;
		color: #1f2937;
		font-family: 'Arial', sans-serif;
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
	return <Global styles={styles} />;
}
