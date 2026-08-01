import Image from "next/image";

interface DurianProps {
  x: number;
  y: number;
}

export default function Durian({ x, y }: DurianProps) {
  return (
    <div
      className="absolute h-20 w-20"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, 0)",
      }}
    >
      <Image src="/durian.png" alt="Durian" fill className="object-contain" />
    </div>
  );
}