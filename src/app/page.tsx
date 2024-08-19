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
  const [mainRing, setMainRing] = useState<JSX.Element | null>(null);
  const [extraRing, setExtraRing] = useState<JSX.Element | null>(null);
  const [thirdRing, setThirdRing] = useState<JSX.Element | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  const generateRandomSize = () => {
    const size = Math.floor(Math.random() * 100) + 100;
    return { width: `${size}px`, height: `${size}px` };
  };

  const generateRandomPosition = () => {
    const top = Math.floor(Math.random() * 80) + 10; // Random top position between 10% and 90%
    const left = Math.floor(Math.random() * 80) + 10; // Random left position between 10% and 90%
    return { top: `${top}%`, left: `${left}%` };
  };

  const generateRandomBorderWidth = () => {
    return Math.floor(Math.random() * 7) + 3;
  };

  const generateRandomColor = (palette: string[]): string => {
    return palette[Math.floor(Math.random() * palette.length)];
  };

  const generateRing = (isExtra: boolean = false) => {
    const size = generateRandomSize();
    const borderWidth = generateRandomBorderWidth();
    const blueColor = generateRandomColor(bluePalette);
    const indigoColor = generateRandomColor(indigoPalette);
    const cyanColor = generateRandomColor(cyanPalette);
    const dropShadowColor = generateRandomColor(combinedPalette);

    const positionStyle = isExtra ? generateRandomPosition() : {};

    const style = {
      ...size,
      ...positionStyle,
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
      <div key={`ring-${Math.random()}`} className={styles.ring} style={style}>
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
      const initialDelay = 1800; // 1.8 second delay for 1st ring to sync with music

      const mainTimeoutId = setTimeout(() => {
        setMainRing(generateRing());
        const mainIntervalId = setInterval(() => {
          setMainRing(generateRing());
        }, 27000);

        return () => clearInterval(mainIntervalId);
      }, initialDelay);

      const extraRingDelay = 60000;
      const extraTimeoutId = setTimeout(() => {
        setExtraRing(generateRing(true));
        const extraIntervalId = setInterval(() => {
          setExtraRing(generateRing(true));
        }, 27000);

        return () => clearInterval(extraIntervalId);
      }, extraRingDelay);

      const thirdRingDelay = 142000;
      const thirdTimeoutId = setTimeout(() => {
        setThirdRing(generateRing(true));
        const thirdIntervalId = setInterval(() => {
          setThirdRing(generateRing(true));
        }, 27000);

        return () => clearInterval(thirdIntervalId);
      }, thirdRingDelay);

      return () => {
        clearTimeout(mainTimeoutId);
        clearTimeout(extraTimeoutId);
        clearTimeout(thirdTimeoutId);
      };
    } else {
      setMainRing(null);
      setExtraRing(null);
      setThirdRing(null);
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
      setFadeOut((prev) => !prev);
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
      <div className={styles.watercolorRings}>
        {mainRing}
        {extraRing}
        {thirdRing}
      </div>
    </div>
  );
}
