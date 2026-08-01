import { Luckiest_Guy } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
const LuckiestGuy = Luckiest_Guy({
  subsets: ['latin'],
  weight: ['400']
})
export default function Home() {
  return (
    <div className="relative flex justify-center items-center text-center flex-col gap-12 px-22 overflow-hidden h-screen w-full">
      <div className="absolute inset-0 bg-[url('/scape.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative z-1222 flex flex-col justify-between gap-8 items-center text-center justify-center">
        <div className={`float text-[#C084FC] flex justify-between items-center text-center ${LuckiestGuy.className} text-5xl font-bold glow shadow-purple-glow`}>
          Daamin Desires Durian.
        </div>
        <div className="flex gap-48 justify-between items-center w-full">
          <div className="z-500 absolute translate-x-52 animate-bounce text-9xl font-bold text-[#a64cff] bottom-0">6</div>
          <div className="wiggle relative w-120 h-120  animate-bounce bg-[#C084fc] rounded-2xl">
            <Image src={'/smuggler-glasses.png'} alt="thug glasses" width={120} height={102} className="relative top-3 left-47 right-8 z-500" />
            <Image src={'/knife.png'} alt="thug glasses" width={160} height={160} className="relative top-3 left-47 right-8 z-500 animate-spin" />
            <Image src={'/manan.png'} alt="Manan" fill className="px-12" />
          </div>
          <Link href={'/games/game1'} className="flex justify-center items-center flex-col">
            <div className="relative w-80 h-80">
              <Image src={'/daamin.png'} alt="Landing daamin" fill className="absolute w-fit bg-[#C084FC] rounded-t-2xl" />
              <Image src={'/durian.png'} alt="Durian" width={100} height={100} className="z-500 absolute -bottom-8 -rotate-90 translate-x-30" />
            </div>
            <div className={`float rounded-b-2xl border-[#C084FC] border-4 w-full text-[#C084FC] flex items-center text-center justify-center py-4 ${LuckiestGuy} text-5xl font-bold glow shadow-purple-glow`}>Save Me</div>
          </Link>
          <div className="z-500 absolute right-52 animate-bounce text-9xl font-bold text-[#a64cff] bottom-0">7</div>

          <div className="wiggle relative w-120 h-120  bg-[#C084fc] rounded-2xl">
            <Image src={'/smuggler-glasses.png'} alt="thug glasses" width={120} height={102} className="relative top-3 left-47 right-8 z-500" />
            <Image src={'/knife.png'} alt="thug glasses" width={160} height={160} className="relative rotate-180 top-3 left-47 right-8 z-500 animate-spin " />
            <Image src={'/manan.png'} alt="Manan" fill className="px-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
