"use client"
import Image from "next/image"
interface DaaminProps{
    x : number
}
export default function Manan({x}: DaaminProps) {
    return (
        <div style={{
            left: `${x}%`,
        }} className="relative left-1/2 h-80 w-60 translate-y-39 -translate-x-1/2 rounded-full object-cover">
            <Image
                src="/daamin.png"
                alt="Daamin"
                fill
                className="absolute object-center bottom-0"
            />
        </div>
    )
}