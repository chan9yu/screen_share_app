import { ThemeProvider } from '@emotion/react';

import { JoinContainer } from './components';
import { GlobalStyles, theme } from './styles';

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<JoinContainer />
		</ThemeProvider>
	);
}
