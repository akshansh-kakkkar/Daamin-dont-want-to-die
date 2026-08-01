"use client"
import Image from "next/image"
interface MananProps{
    x : number
}
export default function Manan({x}: MananProps) {
    return (
        <div className="relative left-1/2 h-60 w-30  -translate-x-1/2 rounded-full object-cover">
            <Image
                src="/manan.png"
                alt="Manan"
                fill
                className="absolute object-cover"
                style={{
                    transform: `translateX(${x}px)`,
                }}
            />
        </div>
    )
}