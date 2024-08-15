'use client';

import React, { useRef, useState } from 'react';
import styles from './page.module.scss';

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const generateRandomPosition = () => {
    const top = Math.floor(Math.random() * 100);
    const left = Math.floor(Math.random() * 100);
    return { top: `${top}%`, left: `${left}%` };
  };

  const generateRandomSize = () => {
    const size = Math.floor(Math.random() * 300) + 100; // Random size between 100px and 400px
    return { width: `${size}px`, height: `${size}px` };
  };

  const rings = Array.from({ length: 3 }, (_, i) => {
    // Reduced to 3 rings
    const position = generateRandomPosition();
    const size = generateRandomSize();
    const style = { ...position, ...size };
    return <div key={i} className={styles.ring} style={style}></div>;
  });

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={styles.watercolorContainer}>
      <audio
        ref={audioRef}
        src='/audio/blue-sharp-2.wav'
        onPlay={handlePlay}
        onPause={handlePause}
      />
      <button onClick={isPlaying ? handlePause : handlePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <div
        className={`${styles.watercolorRings} ${
          isPlaying ? styles.playing : ''
        }`}
      >
        {rings}
      </div>
    </div>
  );
}
