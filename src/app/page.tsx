'use client';

import React, { useRef, useState, useEffect } from 'react';
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
  const [ring, setRing] = useState<JSX.Element | null>(null);
  const [fadeOut, setFadeOut] = useState(false); // State to handle fade out

  const generateRandomSize = () => {
    const size = Math.floor(Math.random() * 200) + 100;
    return { width: `${size}px`, height: `${size}px` };
  };

  const generateRandomBorderWidth = () => {
    return Math.floor(Math.random() * 7) + 3;
  };

  const generateRandomColor = (palette: string[]): string => {
    return palette[Math.floor(Math.random() * palette.length)];
  };

  const generateRing = () => {
    const size = generateRandomSize();
    const borderWidth = generateRandomBorderWidth();
    const blueColor = generateRandomColor(bluePalette);
    const indigoColor = generateRandomColor(indigoPalette);
    const cyanColor = generateRandomColor(cyanPalette);
    const dropShadowColor = generateRandomColor(combinedPalette);

    const style = {
      ...size,
      borderWidth: `${borderWidth}px`,
      borderColor: blueColor,
      backgroundColor: 'transparent',
      animationName: 'fadeInOut',
      animationTimingFunction: 'linear',
      animationDuration: '27s',
      animationIterationCount: 'infinite',
      animationFillMode: 'forwards',
      filter: `blur(5px) drop-shadow(0 0 10px ${dropShadowColor})`,
      position: 'absolute' as 'absolute',
      transform: 'translate(-50%, -50%)',
    } as React.CSSProperties;

    return (
      <div
        key={`center-ring-${Math.random()}`}
        className={styles.ring}
        style={style}
      >
        <style jsx>{`
          @keyframes fadeInOut {
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

  useEffect(() => {
    if (isPlaying) {
      const initialDelay = 1800; // 1.8 second delay for 1st ring

      const timeoutId = setTimeout(() => {
        setRing(generateRing());
        const intervalId = setInterval(() => {
          setRing(generateRing());
        }, 27000); // Update ring every 27 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount or pause
      }, initialDelay);

      return () => clearTimeout(timeoutId); // Cleanup timeout on unmount or pause
    } else {
      setRing(null);
    }
  }, [isPlaying]);

  const handleTogglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
      setFadeOut((prev) => !prev); // Toggle fade state
    }
  };

  return (
    <div className={styles.watercolorContainer} onClick={handleTogglePlay}>
      <audio
        ref={audioRef}
        src='/audio/blue-sharp-2.mp3'
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div
        className={`${styles.playPauseText} ${fadeOut ? styles.fadeOut : ''}`}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </div>
      <div className={styles.watercolorRings}>{ring}</div>
    </div>
  );
}
