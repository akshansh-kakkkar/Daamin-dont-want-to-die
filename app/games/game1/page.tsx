"use client"
import { useEffect, useState } from "react";
import Bomb from "./components/Bomb";
import Daamin from "./components/Daamin";
import Durian from "./components/Durian";
import Hud from "./components/Hud";
import Joystick from "./components/Joystick";
import Manan from "./components/Manan";

export default function game() {
    const [mananX, setMananX] = useState(50);
    const [direction, setDirection] = useState<1 | -1>(1);
    const [daaminX, setDaaminX] = useState(50);
useEffect(() => {
  const interval = setInterval(() => {
    setMananX((prev) => {
      if (prev >= 90) {
        setDirection(-1);
        return prev;
      }

      if (prev <= 10) {
        setDirection(1);
        return prev;
      }

      return prev + direction;
    });
  }, 16);

  return () => clearInterval(interval);
}, [direction]);
    return (
        <div className="relative w-full h-full overflow-hidden     rounded-3xl
    bg-gradient-to-b
    from-purple-950/80
    to-slate-950/95
    border border-purple-400/20
    shadow-[0_0_25px_rgba(168,85,247,0.15),inset_0_0_30px_rgba(168,85,247,0.05)]
    backdrop-blur-md">
            <Hud />
            <Manan x={mananX}/>
            <Durian />
            <Bomb />
            <Daamin x={daaminX} />
            <Joystick moveLeft={() => setDaaminX((prev) => Math.max(prev - 5, 10))}
                moveRight={() => setDaaminX((prev) => Math.min(prev + 5, 90))} />
        </div>
    )
}