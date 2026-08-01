import { Heart } from "lucide-react";

export default function Hud() {
    return (
        <div className="flex justify-between">
            <div className="top-5 left-5 absolute flex gap-2 text-white font-bold text-lg ">
                score : 2
            </div>
            <div className="absolute top-5 right-5 flex gap-2">
                <Heart className="fill-red-500 text-red-500" />
                <Heart className="fill-red-500 text-red-500" />
                <Heart className="fill-red-500 text-red-500" />
            </div>
        </div>
    );
}