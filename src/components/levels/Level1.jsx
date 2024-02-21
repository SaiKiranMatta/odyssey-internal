"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { useTheme } from "next-themes";

const Level1 = ({ onComplete }) => {
    const [rotationAngle, setRotationAngle] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const { setTheme } = useTheme();

    useEffect(() => {
        if (rotationAngle === 180) {
            onComplete(2);
        }
    }, [rotationAngle, onComplete]);
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            handleCommandSubmit();
        }
    };

    const handleCommandSubmit = () => {
        const match = inputValue.match(/^\/rotate (\d+)$/);
        const matchTheme = inputValue.match(/^\/theme (dark|light)$/);

        if (match) {
            const angle = parseInt(match[1], 10);
            if (!isNaN(angle)) {
                setRotationAngle((prevAngle) => (prevAngle + angle) % 360);
                setInputValue("");
            }
        } else if (matchTheme) {
            const theme = matchTheme[1];
            setTheme(theme);
            setInputValue("");
        }
    };

    return (
        <div className="flex flex-col items-center mt-4 ">
            <h1 className="px-4 py-2 text-2xl text-purple-600 bg-yellow-300 rounded-full">
                Level 1
            </h1>
            <p className=" mt-8 text-xl font-semibold mb-[-1rem]">
                Convert this 6 into 9
            </p>
            <Image
                src="/six.png"
                alt="69"
                width={500}
                height={500}
                style={{ transform: `rotate(${rotationAngle}deg)` }}
            />
            <div className="flex gap-1">
                <Input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleEnter}
                    placeholder="Enter command..."
                />
                <button onSubmit={handleCommandSubmit}>
                    <Image
                        src="/runcode.png"
                        alt="Run"
                        height={35}
                        width={35}
                        className="p-1 bg-blue-600 rounded-sm "
                    />
                </button>
            </div>
        </div>
    );
};

export default Level1;
