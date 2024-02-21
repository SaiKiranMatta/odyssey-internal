import React from "react";
import Link from "next/link";
// import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between w-screen h-16 px-3 bg-purple-600 border-t-2 border-purple-600 ">
      <Link href="/">
        <span className="text-2xl font-semibold text-yellow-300 md:text-3xl">
          Odyssey
        </span>
      </Link>
      {/* <ModeToggle /> */}
    </div>
  );
};

export default Navbar;
