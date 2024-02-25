import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const Home = () => {
  const currentLevel = 1;
  return (
    <div className="flex flex-col items-center spacer h-screen  bg-[url('/layered-waves-haikei.svg')]">
      <div className="mx-6 mt-8">
        <Image
          src="/DarkVertical.png"
          alt="logo"
          width={500}
          height={500}
        />
      </div>
      <Link href="/game">
        <Button
          className="mt-8 text-xl"
          size="lg">
          Play Level {currentLevel}
        </Button>
      </Link>
      <div className="mt-8 text-white">
        <span>
          Number of levels completed{" "}
          <span className=" text-[#F9DC34]">{currentLevel - 1}</span>
        </span>
      </div>

      <div className="mt-8 text-white">
        <span>
          Number of levels available{" "}
          <span className=" text-[#F9DC34]">{currentLevel - 1}</span>
        </span>
      </div>

      <div className="mt-8 text-white">
        <span>
          Score <span className=" text-[#F9DC34]">{currentLevel - 1}</span>
        </span>
      </div>
    </div>
  );
};

export default Home;
