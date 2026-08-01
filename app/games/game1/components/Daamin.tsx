"use client"

import Image from "next/image";

interface DaaminProps {
  x: number;
  isDesktop?: boolean;
  isDead?: boolean;
}

export default function Daamin({ x, isDesktop = false, isDead = false }: DaaminProps) {
  return (
    <div
      style={{
        left: `${x}%`,
        transition: isDesktop ? "left 0.18s ease-out" : "none",
        opacity: isDead ? 0.35 : 1,
        filter: isDead ? "grayscale" : "none",
      }}
      className="relative left-1/2 h-80 w-60 translate-y-100 -translate-x-1/2 rounded-full object-cover"
    >
      <Image
        src="/daamin.png"
        alt="Daamin"
        fill
        className="absolute bottom-0 object-center"
      />
    </div>
  );
}