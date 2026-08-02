"use client";

import Image from "next/image";
import { RotateCcw } from "lucide-react";
import { type CSSProperties, useEffect, useState } from "react";

interface GameOverSequenceProps {
  onReplay: () => void;
  onBlast: () => void;
}

const bombBursts = [
  { left: 8, top: 57, delay: 0 },
  { left: 20, top: 72, delay: 90 },
  { left: 31, top: 45, delay: 180 },
  { left: 43, top: 68, delay: 270 },
  { left: 52, top: 52, delay: 360 },
  { left: 62, top: 76, delay: 450 },
  { left: 72, top: 43, delay: 540 },
  { left: 82, top: 65, delay: 630 },
  { left: 91, top: 51, delay: 720 },
  { left: 15, top: 34, delay: 810 },
  { left: 48, top: 31, delay: 900 },
  { left: 88, top: 28, delay: 990 },
];

export default function GameOverSequence({ onReplay, onBlast }: GameOverSequenceProps) {
  const [showReplay, setShowReplay] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowReplay(true), 1_650);
    const blastTimers = [650, 1_000, 1_350].map((delay) => window.setTimeout(onBlast, delay));

    return () => {
      window.clearTimeout(timer);
      blastTimers.forEach((blastTimer) => window.clearTimeout(blastTimer));
    };
  }, [onBlast]);

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      <style>{`
        @keyframes game-over-bomb {
          0% { top: -90px; opacity: 0; transform: translateX(-50%) rotate(-30deg) scale(0.7); }
          12% { opacity: 1; }
          78% { top: var(--landing-y); opacity: 1; transform: translateX(-50%) rotate(290deg) scale(1); }
          100% { top: var(--landing-y); opacity: 0; transform: translateX(-50%) rotate(330deg) scale(0.2); }
        }

        @keyframes game-over-blast {
          0%, 76% { opacity: 0; transform: translate(-50%, -50%) scale(0.1); }
          82% { opacity: 1; transform: translate(-50%, -50%) scale(0.75); }
          90% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.65); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(2.5); }
        }

        @keyframes replay-appear {
          from { opacity: 0; transform: translate(-50%, 16px) scale(0.7); }
          to { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
      `}</style>

      {bombBursts.map((bomb, index) => (
        <div key={index}>
          <div
            className="absolute h-16 w-16"
            style={{
              left: `${bomb.left}%`,
              "--landing-y": `${bomb.top}%`,
              animation: `game-over-bomb 850ms ease-in ${bomb.delay}ms forwards`,
            } as CSSProperties}
          >
            <Image src="/bomb.png" alt="" fill className="object-contain" />
          </div>
          <div
            className="absolute h-24 w-24 rounded-full border-4 border-yellow-100 bg-[radial-gradient(circle,_#fff7a0_0%,_#facc15_20%,_#fb923c_43%,_#ef4444_65%,_transparent_70%)] shadow-[0_0_34px_16px_rgba(239,68,68,0.85)]"
            style={{
              left: `${bomb.left}%`,
              top: `calc(${bomb.top}% + 32px)`,
              animation: `game-over-blast 850ms ease-out ${bomb.delay}ms forwards`,
            }}
          />
        </div>
      ))}

      {showReplay && (
        <button
          type="button"
          onClick={onReplay}
          aria-label="Replay game"
          title="Replay"
          className="pointer-events-auto absolute bottom-8 left-1/2 grid h-16 w-16 place-items-center rounded-full border border-white/40 bg-slate-950/80 text-white shadow-[0_0_30px_rgba(251,146,60,0.8)] backdrop-blur transition hover:scale-110 hover:bg-orange-500"
          style={{ animation: "replay-appear 300ms ease-out forwards" }}
        >
          <RotateCcw className="h-8 w-8" />
        </button>
      )}
    </div>
  );
}
