import { ArrowLeft, ArrowRight } from "lucide-react";
interface JoystickProps {
  moveLeft: () => void;
  moveRight: () => void;
}
export default function Joystick({moveLeft, moveRight} : JoystickProps) {
  return (
    <div className="absolute bottom-8 flex w-full items-center justify-between px-10">
      <button onClick={moveLeft} className="rounded-full border border-white/20 bg-white/10 p-4 backdrop-blur">
        <ArrowLeft className="h-10 w-10 text-white" />
      </button>

      <button onClick={moveRight} className="rounded-full border border-white/20 bg-white/10 p-4 backdrop-blur">
        <ArrowRight className="h-10 w-10 text-white" />
      </button>
    </div>
  );
}