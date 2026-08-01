import { Heart } from "lucide-react";

interface HudProps {
  score: number;
  lives: number;
}

export default function Hud({ score, lives }: HudProps) {
  return (
    <div className="flex justify-between">
      <div className="absolute left-5 top-5 flex gap-2 text-lg font-bold text-white">
        score : {score}
      </div>
      <div className="absolute right-5 top-5 flex gap-2">
        {Array.from({ length: 3 }, (_, index) => (
          <Heart
            key={index}
            className={index < lives ? "fill-red-500 text-red-500" : "fill-slate-500/40 text-slate-500/40"}
          />
        ))}
      </div>
    </div>
  );
}