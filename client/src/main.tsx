import { ThemeProvider } from '@emotion/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import { MainServiceProvider } from './contexts';
import { GlobalStyles, theme } from './styles';

const rootElement = document.getElementById('root');

if (!rootElement) {
	throw new Error('Root element with id "root" not found');
}

createRoot(rootElement).render(
	<StrictMode>
		<MainServiceProvider>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<ToastContainer position="top-center" autoClose={1500} hideProgressBar />
				<App />
			</ThemeProvider>
		</MainServiceProvider>
	</StrictMode>
);
