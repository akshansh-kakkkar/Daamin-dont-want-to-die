import Image from "next/image";

export default function Durian(){
    return(
        <div className="relative z-60  left-1/2 top-72 h-40 w-20 -translate-x-1/2">
    <Image
      src="/durian.png"
      alt="Durian"
      fill
      className="absolute"
    />
    </div>
    )
}