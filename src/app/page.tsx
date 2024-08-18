'use client';

import React, { useRef, useState } from 'react';
import styles from './page.module.scss';
import {
  bluePalette,
  indigoPalette,
  cyanPalette,
  combinedPalette,
} from '../../util/palettes';

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rings, setRings] = useState<JSX.Element[]>([]);

  const generateRandomPosition = () => {
    const top = Math.floor(Math.random() * 100);
    const left = Math.floor(Math.random() * 100);
    return { top: `${top}%`, left: `${left}%` };
  };

  const generateRandomSize = () => {
    const size = Math.floor(Math.random() * 200) + 40;
    return { width: `${size}px`, height: `${size}px` };
  };

  const generateRandomBorderWidth = () => {
    return Math.floor(Math.random() * 7) + 3;
  };

  const generateRandomColor = (palette: string[]): string => {
    return palette[Math.floor(Math.random() * palette.length)];
  };

  const generateRing = (i: number) => {
    const position = generateRandomPosition();
    const size = generateRandomSize();
    const borderWidth = generateRandomBorderWidth();
    const blueColor = generateRandomColor(bluePalette);
    const indigoColor = generateRandomColor(indigoPalette);
    const cyanColor = generateRandomColor(cyanPalette);
    const dropShadowColor = generateRandomColor(combinedPalette);
    const animationName = `fadeInOut-${i}-${Math.random()}`;

    const style = {
      ...position,
      ...size,
      borderWidth: `${borderWidth}px`,
      borderColor: blueColor,
      backgroundColor: 'transparent',
      animationName,
      animationTimingFunction: 'linear',
      animationDuration: '27s',
      animationIterationCount: '1',
      animationFillMode: 'forwards',
      filter: `blur(5px) drop-shadow(0 0 10px ${dropShadowColor})`,
    };

    return (
      <div key={`${i}-${Math.random()}`} className={styles.ring} style={style}>
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
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);

      const generatedRings = Array.from({ length: 27 }, (_, i) =>
        generateRing(i)
      );

      generatedRings.forEach((ring, i) => {
        setTimeout(() => {
          setRings((prevRings) => [...prevRings, ring]);
        }, i * 9000);
      });
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setRings([]);
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
      <div className={styles.watercolorRings}>{rings}</div>
    </div>
  );
}
