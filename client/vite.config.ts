import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3035
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	}
});
