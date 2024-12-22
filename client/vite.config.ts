import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	plugins: [
		react({
			jsxImportSource: '@emotion/react',
			babel: {
				plugins: ['@emotion/babel-plugin']
			}
		}),
		svgr({
			include: '**/*.svg?react'
		})
	],
	server: {
		host: '0.0.0.0',
		port: 3035
	},
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version)
	}
});
