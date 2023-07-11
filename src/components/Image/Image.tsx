import { FC } from 'react';

import styles from './Image.module.scss';

type ImageProps = {
	url: string;
};

export const Image: FC<ImageProps> = ({ url }) => {
	return (
		<div className={styles.image}>
			<img src={url} alt='poster-audio' />
		</div>
	);
};
