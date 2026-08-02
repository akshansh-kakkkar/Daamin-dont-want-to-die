"use client";

import { useEffect, useRef } from "react";

export default function ArcadeHomeMusic() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const melody = [261.63, 329.63, 392, 329.63, 293.66, 349.23, 440, 349.23];
    let noteIndex = 0;

    const playNote = () => {
      const audioContext = audioContextRef.current;
      if (!audioContext) return;

      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(melody[noteIndex], audioContext.currentTime);
      gain.gain.setValueAtTime(0.035, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.28);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.28);
      noteIndex = (noteIndex + 1) % melody.length;
    };

    const startMusic = () => {
      const audioContext = audioContextRef.current ?? new AudioContext();
      audioContextRef.current = audioContext;
      void audioContext.resume();

      if (intervalRef.current !== null) return;
      playNote();
      intervalRef.current = window.setInterval(playNote, 360);
    };

    window.addEventListener("pointerdown", startMusic, { once: true });
    window.addEventListener("keydown", startMusic, { once: true });

    return () => {
      window.removeEventListener("pointerdown", startMusic);
      window.removeEventListener("keydown", startMusic);
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
      void audioContextRef.current?.close();
    };
  }, []);

  return null;
}
