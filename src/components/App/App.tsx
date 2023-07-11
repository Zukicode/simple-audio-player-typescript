import { FC, useState, useEffect, useRef } from 'react';

import styles from './App.module.scss';

import { Player } from 'components/Player/Player';

import { ISong } from 'models/ISong';

import songsData from 'data/songs.json';

export const App: FC = () => {
	const [songs] = useState<ISong[]>(songsData);
	const [isPlaying, setPlaying] = useState<boolean>(false);
	const [currentSong, setCurrentSong] = useState<ISong>(songs[0]);
	const [activeIndex, setActiveIndex] = useState<number>(0);

	const audioElement = useRef<any>();

	const togglePlay = (currentTime: number) => {
		if (isPlaying === false) {
			setPlaying(true);
			audioElement.current.play();
		} else {
			setPlaying(false);
			audioElement.current.pause();
		}

		console.log(audioElement);
	};

	const stopPlaying = () => setPlaying(false);

	const nextTrack = () => {
		if (activeIndex === songs.length - 1) {
			setActiveIndex(0);
			setCurrentSong(songs[0]);
		} else {
			setActiveIndex(activeIndex + 1);
		}
		setPlaying(false);
	};

	const previousTrack = () => {
		if (activeIndex === 0) {
			setActiveIndex(songs.length - 1);
			setCurrentSong(songs[songs.length - 1]);
		} else {
			setActiveIndex(activeIndex - 1);
		}
		setPlaying(false);
	};

	const shuffleSongs = () => {
		var randomSong = Math.floor(Math.random() * songs.length);
		setCurrentSong(songs[randomSong]);
		setPlaying(false);
	};

	useEffect(() => {
		setCurrentSong(songs[activeIndex]);
	}, [activeIndex, songs]);

	return (
		<div className={styles.Application}>
			<audio src={currentSong?.url} ref={audioElement} />
			<Player
				songs={songs}
				currentSong={currentSong}
				isPlaying={isPlaying}
				audioElement={audioElement}
				togglePlay={togglePlay}
				stopPlaying={stopPlaying}
				previousTrack={previousTrack}
				nextTrack={nextTrack}
				shuffleSongs={shuffleSongs}
			/>
		</div>
	);
};
