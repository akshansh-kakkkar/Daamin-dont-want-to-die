"use client"

import Image from "next/image";

interface MananProps {
  x: number;
}

export default function Manan({ x }: MananProps) {
  return (
    <div
      className="absolute scale-67 top-4 h-60 w-30 wiggle -translate-y-12 -translate-x-1/2 rounded-full object-cover"
      style={{
        left: `${x}%`,
        transition: "left 0.30s linear",
      }}
    >
      <Image
        src="/manan.png"
        alt="Manan"
        fill
        className="absolute object-cover"
      />
    </div>
  );
}
