"use client"

import { useEffect, useState } from "react";
import Bomb from "./components/Bomb";
import Daamin from "./components/Daamin";
import Durian from "./components/Durian";
import Hud from "./components/Hud";
import Joystick from "./components/Joystick";
import LocationPrompt from "./components/you_lost";
import Manan from "./components/Manan";

export function detectDevice() {
  const userAgent = navigator.userAgent;
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  return mobileRegex.test(userAgent) ? "Mobile Device" : "Desktop Device";
}

export default function Game() {
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
  const isDesktop = detectDevice() === "Desktop Device";

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
  };

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
    }, 16);

    return () => clearInterval(interval);
  }, [direction]);

  useEffect(() => {
    if (daaminDead || lives <= 0) return;

    const randomChance = Math.random();
    if (randomChance < 0.008) {
      setDurianX(mananX);
      setDurianY(8);
      setDurianActive(true);
    }
  }, [mananX, daaminDead, lives]);

  useEffect(() => {
    if (daaminDead || lives <= 0 || bombActive || lives > 1) return;

    const randomChance = Math.random();
    if (randomChance < 0.012) {
      setBombX(mananX);
      setBombY(8);
      setBombActive(true);
    }
  }, [mananX, daaminDead, lives, bombActive]);

  useEffect(() => {
    if (!durianActive || durianX === null) return;

    const interval = setInterval(() => {
      setDurianY((prev) => {
        const next = prev + 2;
        const caughtDurian = next >= 72 && Math.abs(durianX - daaminX) < 12;

        if (caughtDurian) {
          setScore((currentScore) => currentScore + 1);
          setDurianActive(false);
          setDurianX(null);
          return 0;
        }

        if (next >= 100) {
          const nextLives = Math.max(lives - 1, 0);
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
    }, 40);

    return () => clearInterval(interval);
  }, [durianActive, durianX, daaminX, lives]);

  useEffect(() => {
    if (!bombActive || bombX === null) return;

    const interval = setInterval(() => {
      setBombY((prev) => {
        const next = prev + 2;
        const hitDaamin = next >= 72 && Math.abs(bombX - daaminX) < 12;

        if (hitDaamin) {
          const nextLives = Math.max(lives - 1, 0);
          setLives(nextLives);
          if (nextLives <= 0) {
            setDaaminDead(true);
          }
          setBombActive(false);
          setBombX(null);
          return 0;
        }

        if (next >= 100) {
          setScore((currentScore) => currentScore + 1);
          setBombActive(false);
          setBombX(null);
          return 0;
        }

        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [bombActive, bombX, daaminX, lives]);

  useEffect(() => {
    if (!isDesktop || daaminDead) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setDaaminX((prev) => Math.max(prev - 5, 10));
      }

      if (event.key === "ArrowRight") {
        setDaaminX((prev) => Math.min(prev + 5, 90));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDesktop, daaminDead]);

  useEffect(() => {
    if (lives <= 0 && !daaminDead) {
      setDaaminDead(true);
    }
  }, [lives, daaminDead]);

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-3xl border border-purple-400/20 bg-gradient-to-b from-purple-950/80 to-slate-950/95 shadow-[0_0_25px_rgba(168,85,247,0.15),inset_0_0_30px_rgba(168,85,247,0.05)] backdrop-blur-md"
    >
      <Hud score={score} lives={lives} />
      <Manan x={mananX} />
      {durianActive && durianX !== null && <Durian x={durianX} y={durianY} />}
      {bombActive && bombX !== null && <Bomb x={bombX} y={bombY} />}
      <Daamin x={daaminX} isDesktop={isDesktop} isDead={daaminDead} />
      {daaminDead && <LocationPrompt onAllow={resetGame} lf={true} />}
      <Joystick
        moveLeft={() => setDaaminX((prev) => Math.max(prev - 5, 10))}
        moveRight={() => setDaaminX((prev) => Math.min(prev + 5, 90))}
      />
    </div>
  );
}
