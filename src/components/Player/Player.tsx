import { FC, useState, useEffect } from 'react';

import styles from './Player.module.scss';

import { Image } from 'components/Image/Image';

import { LiaRandomSolid } from 'react-icons/lia';
import { FiRepeat } from 'react-icons/fi';
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi';
import { BsFillPauseFill, BsPlayFill } from 'react-icons/bs';

import { ISong } from 'models/ISong';

import { formatSeconds } from 'utils/formatSeconds';

interface PlayerProps {
	songs: ISong[];
	currentSong: ISong;
	isPlaying: boolean;
	audioElement: any;
	togglePlay: (currentTime: number) => void;
	stopPlaying: () => void;
	previousTrack: () => void;
	nextTrack: () => void;
	shuffleSongs: () => void;
}

export const Player: FC<PlayerProps> = ({
	audioElement,
	currentSong,
	isPlaying,
	songs,
	togglePlay,
	stopPlaying,
	nextTrack,
	previousTrack,
	shuffleSongs,
}) => {
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [isRepeat, setRepeat] = useState<boolean>(false);

	useEffect(() => {
		const interval = setInterval(() => {
			if (isPlaying) {
				setCurrentTime(currentTime + 1);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [isPlaying, currentTime]);

	useEffect(() => {
		if (currentTime === currentSong.duration) {
			if (isRepeat) {
				audioElement.current.play();
				setCurrentTime(0);
			} else {
				audioElement.current.pause();
				stopPlaying();
				setCurrentTime(0);
			}
		}
	}, [currentTime]);

	const handleChangeTime = (e: string) => {
		setCurrentTime(Number(e));
		audioElement.current.currentTime = currentTime;
		console.log(audioElement.current.currentTime);
	};

	const toggleRepeat = () => setRepeat(!isRepeat);

	const handleNextTrack = () => {
		setCurrentTime(0);
		nextTrack();
	};

	const handlePreviousTrack = () => {
		setCurrentTime(0);
		previousTrack();
	};

	return (
		<div className={styles.player}>
			<Image url={currentSong.image} />
			<div className={styles.title}>
				<h1>{currentSong.name}</h1>
				<p>{currentSong.author}</p>
			</div>

			<div className={styles.duration}>
				<input
					className={styles.durationEntry}
					type='range'
					min='0'
					max={currentSong.duration}
					step='1'
					value={currentTime}
					onChange={e => handleChangeTime(e.target.value)}
				/>
				<div className={styles.durationTime}>
					<p>{formatSeconds(currentTime)}</p>
					<p>{formatSeconds(currentSong.duration)}</p>
				</div>
			</div>

			<div className={styles.controls}>
				<button onClick={shuffleSongs} className={styles.otherButton}>
					<LiaRandomSolid />
				</button>
				<button onClick={handlePreviousTrack} className={styles.controlSong}>
					<BiSkipPrevious />
				</button>
				<button
					onClick={() => togglePlay(currentTime)}
					className={styles.pause}
				>
					{isPlaying ? <BsFillPauseFill /> : <BsPlayFill />}
				</button>
				<button onClick={handleNextTrack} className={styles.controlSong}>
					<BiSkipNext />
				</button>
				<button
					onClick={toggleRepeat}
					className={
						isRepeat
							? `${styles.otherButton} ${styles.active}`
							: styles.otherButton
					}
				>
					<FiRepeat />
				</button>
			</div>
		</div>
	);
};
