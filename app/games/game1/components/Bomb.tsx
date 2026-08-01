import Image from "next/image";

interface BombProps {
  x: number;
  y: number;
}

export default function Bomb({ x, y }: BombProps) {
  return (
    <div
      className="absolute h-16 w-16"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, 0)",
      }}
    >
      <Image src="/bomb.png" alt="Bomb" fill className="object-contain" />
    </div>
  );
}