import Bomb from "./components/Bomb";
import Daamin from "./components/Daamin";
import Durian from "./components/Durian";
import Hud from "./components/Hud";
import Manan from "./components/Manan";

export default function game(){
    return (
        <div className="bg-[#ffffff] h-full rounded-2xl border-2 ">
            <Hud />
            <Manan />
            <Durian />
            <Daamin />
            <Bomb />
        </div>
    )
}