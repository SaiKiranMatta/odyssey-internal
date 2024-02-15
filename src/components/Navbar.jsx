import React from "react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
    return (
        <div className=" flex w-screen border-t-2 border-purple-600 h-16 bg-purple-600 items-center px-3 justify-between">
            <Link href="/">
                <span className="md:text-3xl text-2xl font-semibold text-yellow-300">
                    Odyssey
                </span>
            </Link>
            <ModeToggle />
        </div>
    );
};

export default Navbar;
