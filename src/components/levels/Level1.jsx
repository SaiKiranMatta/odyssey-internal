"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";

const Level1 = ({ onComplete }) => {
    const [rotationAngle, setRotationAngle] = useState(0);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (rotationAngle === 180) {
            onComplete();
        }
    }, [rotationAngle, onComplete]);
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleCommandSubmit = () => {
        const match = inputValue.match(/^\/rotate (\d+)$/);

        if (match) {
            const angle = parseInt(match[1], 10);
            if (!isNaN(angle)) {
                setRotationAngle((prevAngle) => (prevAngle + angle) % 360);
                setInputValue("");
            }
        }
    };

    return (
        <div className=" flex flex-col items-center mt-4">
            <h1 className="text-2xl text-purple-600 px-4 py-2 rounded-full bg-yellow-300">
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
                    placeholder="Enter command..."
                />
                <button onClick={handleCommandSubmit}>
                    <Image
                        src="/runcode.png"
                        alt="Run"
                        height={35}
                        width={35}
                        className=" bg-blue-600 rounded-sm p-1"
                    />
                </button>
            </div>
        </div>
    );
};

export default Level1;
