import Image from "next/image";

export default function Bomb() {
    return (
        <div className=" bottom-52 right-1/3 h-16 w-16 relative">
            <Image
                src="/bomb.png"
                alt="Bomb"fill
                className="absolute"
            />
        </div>
    )
}