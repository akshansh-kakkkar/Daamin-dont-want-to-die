import Link from "next/link";

export default function hello(){
    return(
        <div>
            <Link href={'/games/game1'}>Go to Game1</Link>
        </div>
    )
}