import { ThemeProvider } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { JoinContainer } from './components';
import { MainServiceProvider } from './contexts';
import { GlobalStyles, theme } from './styles';

export default function App() {
	return (
		<MainServiceProvider>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<ToastContainer position="top-center" autoClose={2000} hideProgressBar />
				{/* service views */}
				<JoinContainer />
			</ThemeProvider>
		</MainServiceProvider>
	);
}
