import { ComponentProps } from 'react';
import * as icons from '../../../assets/svgs';

type IconProps = {
	name: keyof typeof icons;
} & ComponentProps<'svg'>;

export default function Icon({ name, ...rest }: IconProps) {
	const SVGIcon = icons[name];

	return <SVGIcon {...rest} />;
}
