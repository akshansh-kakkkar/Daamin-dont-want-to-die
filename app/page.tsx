import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
     <Link href={'/games'}>Click Me for going to the games dashboard</Link>
    </div>
  );
}
