import { ThemeProvider } from '@emotion/react';
import { GlobalStyles, theme } from './styles';

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			Screen Share App.
		</ThemeProvider>
	);
}
