import '@emotion/react';
import type { ThemeType } from '../styles';

declare module '@emotion/react' {
	export interface Theme extends ThemeType {}
}
