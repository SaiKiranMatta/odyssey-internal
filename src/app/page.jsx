import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Link href="/game">
        <Image
          alt="game levels"
          src="/gamelevels.jpg"
          width={500}
          height={500}
        />
      </Link>
    </main>
  );
}
