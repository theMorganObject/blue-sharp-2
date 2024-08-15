'use client';

import React, { useRef, useState } from 'react';
import styles from './page.module.scss';

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const bluePalette: string[] = [
    '#a5d8ff',
    '#74c0fc',
    '#4dabf7',
    '#339af0',
    '#228be6',
    '#1971c2',
    '#1864ab',
    '#0f609b',
    '#0a3f78',
  ];

  const indigoPalette: string[] = [
    '#91a7ff',
    '#748ffc',
    '#5c7cfa',
    '#4c6ef5',
    '#4263eb',
    '#3b5bdb',
    '#364fc7',
    '#2e3b94',
    '#1e2871',
  ];

  const cyanPalette: string[] = [
    '#99e9f2',
    '#66d9e8',
    '#15aabf',
    '#1098ad',
    '#0c8599',
    '#0b7285',
    '#085d6d',
    '#064852',
  ];

  const combinedPalette = [...bluePalette, ...indigoPalette, ...cyanPalette];

  const generateRandomPosition = () => {
    const top = Math.floor(Math.random() * 100);
    const left = Math.floor(Math.random() * 100);
    return { top: `${top}%`, left: `${left}%` };
  };

  const generateRandomSize = () => {
    const size = Math.floor(Math.random() * 200) + 40; // Random size between 40px and 200px
    return { width: `${size}px`, height: `${size}px` };
  };

  const generateRandomBorderWidth = () => {
    return Math.floor(Math.random() * 7) + 3; // Random border width between 3px and 9px
  };

  const generateRandomColor = (palette: string[]): string => {
    return palette[Math.floor(Math.random() * palette.length)];
  };

  const rings = Array.from({ length: 3 }, (_, i) => {
    const position = generateRandomPosition();
    const size = generateRandomSize();
    const borderWidth = generateRandomBorderWidth();
    const blueColor = generateRandomColor(bluePalette);
    const indigoColor = generateRandomColor(indigoPalette);
    const cyanColor = generateRandomColor(cyanPalette);
    const dropShadowColor = generateRandomColor(combinedPalette);
    const animationName = `fadeInOut-${i}`;

    const style = {
      ...position,
      ...size,
      borderWidth: `${borderWidth}px`,
      animationName,
      animationTimingFunction: 'linear',
      animationDuration: '27s',
      animationIterationCount: 'infinite',
      animationFillMode: 'forwards',
      borderColor: blueColor,
    };

    return (
      <div key={i} className={styles.ring} style={style}>
        <style jsx>{`
          @keyframes ${animationName} {
            0% {
              opacity: 0;
              transform: scale(0.8);
              border-color: ${blueColor};
              filter: blur(5px) drop-shadow(0 0 0 ${dropShadowColor});
            }
            37.04% {
              opacity: 1;
              transform: scale(1.4);
              border-color: ${indigoColor};
              filter: blur(5px) drop-shadow(0 0 0 ${dropShadowColor});
            }
            50% {
              filter: blur(5px) drop-shadow(0 0 10px ${dropShadowColor});
            }
            100% {
              opacity: 0;
              transform: scale(2);
              border-color: ${cyanColor};
              filter: blur(10px) drop-shadow(0 0 25px ${dropShadowColor});
            }
          }
        `}</style>
      </div>
    );
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
