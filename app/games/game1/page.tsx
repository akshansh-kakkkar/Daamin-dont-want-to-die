"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import Bomb from "./components/Bomb";
import Daamin from "./components/Daamin";
import Durian from "./components/Durian";
import Hud from "./components/Hud";
import Joystick from "./components/Joystick";
import GameOverSequence from "./components/you_lost";
import Manan from "./components/Manan";

export function detectDevice() {
  const userAgent = navigator.userAgent;
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  return mobileRegex.test(userAgent) ? "Mobile Device" : "Desktop Device";
}

export default function Game() {
  const gameRef = useRef<HTMLDivElement>(null);
  const daaminXRef = useRef(50);
  const audioContextRef = useRef<AudioContext | null>(null);
  const bgmIntervalRef = useRef<number | null>(null);
  const bgmNoteRef = useRef(0);
  const [mananX, setMananX] = useState(50);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [daaminX, setDaaminX] = useState(50);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [durianX, setDurianX] = useState<number | null>(null);
  const [durianY, setDurianY] = useState(0);
  const [durianActive, setDurianActive] = useState(false);
  const [bombX, setBombX] = useState<number | null>(null);
  const [bombY, setBombY] = useState(0);
  const [bombActive, setBombActive] = useState(false);
  const [daaminDead, setDaaminDead] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  const isDesktop = detectDevice() === "Desktop Device";

  const enemyMoveDelay = Math.max(14, 44 - difficulty * 3);
  const projectileMoveDelay = Math.max(16, 28 - difficulty);
  const projectileStep = 4 + difficulty * 0.2;
  const durianDropChance = Math.min(0.017, 0.002 + difficulty * 0.0015);
  const bombDropChance = Math.min(0.012, 0.001 + difficulty * 0.0011);

  useEffect(() => {
    daaminXRef.current = daaminX;
  }, [daaminX]);

  const hitsDaamin = useCallback((projectileX: number, projectileY: number, projectileSize: number) => {
    const game = gameRef.current;
    if (!game) return false;

    const gameWidth = game.clientWidth;
    const gameHeight = game.clientHeight;
    const playerWidth = 240;
    const playerHeight = 320;
    const playerBottom = 16;
    const playerLeft = (daaminXRef.current / 100) * gameWidth - playerWidth / 2;
    const playerTop = gameHeight - playerBottom - playerHeight;
    const projectileLeft = (projectileX / 100) * gameWidth - projectileSize / 2;
    const projectileTop = (projectileY / 100) * gameHeight;

    return (
      projectileLeft < playerLeft + playerWidth &&
      projectileLeft + projectileSize > playerLeft &&
      projectileTop < playerTop + playerHeight &&
      projectileTop + projectileSize > playerTop
    );
  }, []);

  const playTone = useCallback((frequency: number, duration: number, volume: number, type: OscillatorType) => {
    const audioContext = audioContextRef.current ?? new AudioContext();
    audioContextRef.current = audioContext;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gain.gain.setValueAtTime(volume, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  }, []);

  const startGameAudio = useCallback(() => {
    const audioContext = audioContextRef.current ?? new AudioContext();
    audioContextRef.current = audioContext;
    void audioContext.resume();

    if (bgmIntervalRef.current !== null) return;

    const melody = [261.63, 329.63, 392, 329.63, 293.66, 349.23, 440, 349.23];
    const playNextNote = () => {
      playTone(melody[bgmNoteRef.current], 0.28, 0.035, "triangle");
      bgmNoteRef.current = (bgmNoteRef.current + 1) % melody.length;
    };

    playNextNote();
    bgmIntervalRef.current = window.setInterval(playNextNote, 360);
  }, [playTone]);

  const playScoreSound = useCallback(() => {
    startGameAudio();
    playTone(660, 0.1, 0.1, "square");
    window.setTimeout(() => playTone(880, 0.14, 0.1, "square"), 70);
  }, [playTone, startGameAudio]);

  const playLifeLostSound = useCallback(() => {
    startGameAudio();
    playTone(260, 0.16, 0.12, "sawtooth");
    window.setTimeout(() => playTone(130, 0.28, 0.12, "sawtooth"), 90);
  }, [playTone, startGameAudio]);

  const playBlastSound = useCallback(() => {
    startGameAudio();
    playTone(85, 0.35, 0.09, "sawtooth");
    window.setTimeout(() => playTone(52, 0.24, 0.07, "square"), 50);
  }, [playTone, startGameAudio]);

  useEffect(() => () => {
    if (bgmIntervalRef.current !== null) {
      window.clearInterval(bgmIntervalRef.current);
    }
    void audioContextRef.current?.close();
  }, []);

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setDaaminDead(false);
    setDurianX(null);
    setDurianY(0);
    setDurianActive(false);
    setBombX(null);
    setBombY(0);
    setBombActive(false);
    setDaaminX(50);
    setMananX(50);
    setDirection(1);
    setDifficulty(0);
  };

  useEffect(() => {
    if (daaminDead) return;

    const interval = setInterval(() => {
      setDifficulty((current) => Math.min(current + 1, 10));
    }, 5_000);

    return () => clearInterval(interval);
  }, [daaminDead]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMananX((prev) => {
        const next = prev + direction;

        if (next >= 90) {
          setDirection(-1);
          return 90;
        }

        if (next <= 10) {
          setDirection(1);
          return 10;
        }

        return next;
      });
    }, enemyMoveDelay);

    return () => clearInterval(interval);
  }, [direction, enemyMoveDelay]);

  useEffect(() => {
    if (daaminDead || lives <= 0 || durianActive) return;

    const randomChance = Math.random();
    if (randomChance < durianDropChance) {
      setDurianX(mananX);
      setDurianY(1);
      setDurianActive(true);
    }
  }, [mananX, daaminDead, durianActive, durianDropChance, lives]);

  useEffect(() => {
    if (daaminDead || lives <= 0 || bombActive || lives > 1) return;

    const randomChance = Math.random();
    if (randomChance < bombDropChance) {
      setBombX(mananX);
      setBombY(1);
      setBombActive(true);
    }
  }, [mananX, daaminDead, lives, bombActive, bombDropChance]);

  useEffect(() => {
    if (!durianActive || durianX === null) return;

    const interval = setInterval(() => {
      setDurianY((prev) => {
        const next = prev + projectileStep;
        const caughtDurian = hitsDaamin(durianX, next, 80);

        if (caughtDurian) {
          playScoreSound();
          setScore((currentScore) => currentScore + 1);
          setDurianActive(false);
          setDurianX(null);
          return 0;
        }

        if (next >= 100) {
          const nextLives = Math.max(lives - 1, 0);
          playLifeLostSound();
          setLives(nextLives);
          if (nextLives <= 0) {
            setDaaminDead(true);
          }
          setDurianActive(false);
          setDurianX(null);
          return 0;
        }

        return next;
      });
    }, projectileMoveDelay);

    return () => clearInterval(interval);
  }, [durianActive, durianX, hitsDaamin, lives, playLifeLostSound, playScoreSound, projectileMoveDelay, projectileStep]);

  useEffect(() => {
    if (!bombActive || bombX === null) return;

    const interval = setInterval(() => {
      setBombY((prev) => {
        const next = prev + projectileStep;
        const hitDaamin = hitsDaamin(bombX, next, 64);

        if (hitDaamin) {
          const nextLives = Math.max(lives - 1, 0);
          playLifeLostSound();
          setLives(nextLives);
          if (nextLives <= 0) {
            setDaaminDead(true);
          }
          setBombActive(false);
          setBombX(null);
          return 0;
        }

        if (next >= 100) {
          playScoreSound();
          setScore((currentScore) => currentScore + 1);
          setBombActive(false);
          setBombX(null);
          return 0;
        }

        return next;
      });
    }, projectileMoveDelay);

    return () => clearInterval(interval);
  }, [bombActive, bombX, hitsDaamin, lives, playLifeLostSound, playScoreSound, projectileMoveDelay, projectileStep]);

  useEffect(() => {
    if (!isDesktop || daaminDead) return;

    const pressedKeys = new Set<string>();
    let direction = 0;
    let speed = 0;
    const leftKeys = new Set(["arrowleft", "a"]);
    const rightKeys = new Set(["arrowright", "d"]);

    const updateDirection = () => {
      const nextDirection = Number([...rightKeys].some((key) => pressedKeys.has(key))) -
        Number([...leftKeys].some((key) => pressedKeys.has(key)));

      if (nextDirection !== direction) {
        speed = 0;
        direction = nextDirection;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      startGameAudio();

      const key = event.key.toLowerCase();
      if (leftKeys.has(key) || rightKeys.has(key)) {
        event.preventDefault();
        pressedKeys.add(key);
        updateDirection();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      pressedKeys.delete(event.key.toLowerCase());
      updateDirection();
    };

    const stopMoving = () => {
      pressedKeys.clear();
      direction = 0;
      speed = 0;
    };

    const movementInterval = setInterval(() => {
      if (direction === 0) return;

      speed = Math.min(speed + 0.08, 1.5);
      setDaaminX((prev) => Math.min(Math.max(prev + direction * speed, 10), 90));
    }, 16);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", stopMoving);

    return () => {
      clearInterval(movementInterval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", stopMoving);
    };
  }, [isDesktop, daaminDead, startGameAudio]);

  useEffect(() => {
    if (lives <= 0 && !daaminDead) {
      setDaaminDead(true);
    }
  }, [lives, daaminDead]);

  return (
    <div
      ref={gameRef}
      onPointerDown={startGameAudio}
      className="relative h-full w-full overflow-hidden rounded-3xl border border-purple-400/20 bg-gradient-to-b from-purple-950/80 to-slate-950/95 shadow-[0_0_25px_rgba(168,85,247,0.15),inset_0_0_30px_rgba(168,85,247,0.05)] backdrop-blur-md"
    >
      <Hud score={score} lives={lives} />
      <Manan x={mananX} />
      {durianActive && durianX !== null && <Durian x={durianX} y={durianY} />}
      {bombActive && bombX !== null && <Bomb x={bombX} y={bombY} />}
      <Daamin x={daaminX} isDead={daaminDead} />
      {daaminDead && <GameOverSequence onReplay={resetGame} onBlast={playBlastSound} />}
      <Joystick
        moveLeft={() => setDaaminX((prev) => Math.max(prev - 5, 10))}
        moveRight={() => setDaaminX((prev) => Math.min(prev + 5, 90))}
      />
    </div>
  );
}
