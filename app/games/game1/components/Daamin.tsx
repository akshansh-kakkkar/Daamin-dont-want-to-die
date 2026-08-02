"use client"

import Image from "next/image";

interface DaaminProps {
  x: number;
  isDead?: boolean;
}

export default function Daamin({ x, isDead = false }: DaaminProps) {
  return (
    <div
      style={{
        left: `${x}%`,
        opacity: isDead ? 0.35 : 1,
        filter: isDead ? "grayscale" : "none",
      }}
      className="absolute wiggle 7 bottom-4 scale-60 translate-y-18 rounded-full h-80 w-120 -translate-x-1/2"
    >
      <Image
        src="/daamin.png"
        alt="Daamin"
        fill
        className="absolute bottom-0"
      />
    </div>
  );
}
