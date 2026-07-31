import { ReactNode } from "react";
import { Luckiest_Guy } from "next/font/google";
const LuckiestGuy = Luckiest_Guy({
    subsets: ['latin'],
    weight: ["400"],
})
export default function page({ children }: { children: ReactNode }) {
    return (
        <div className={`bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#020617_45%,_#000_100%)]  flex-col gap-12 h-screen w-screen flex py-10  text-center`}>
            <div className={`float text-white [-webkit-text-stroke:3px_#fff] ${LuckiestGuy} text-5xl font-bold glow`}>
               Mission Keep Daamin Alive
            </div>
           <div className="mx-20 h-full ">
            {children}
           </div>
        </div>
    )
}