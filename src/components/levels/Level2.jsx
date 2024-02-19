import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";

const Level2 = ({ onComplete }) => {
    const { theme, setTheme } = useTheme();
    const [rotationAngle, setRotationAngle] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [image, setImage] = useState("/birdincage.png");
    const [initialRender, setInitialRender] = useState(true);
    const [text, setText] = useState("Release the bird");

    // Set the theme to a specific color when the component mounts
    useEffect(() => {
        setTheme("dark");
        setInitialRender(false);
    }, []);

    useEffect(() => {
        if (!initialRender && theme === "light") {
            setImage("/bird.png");
            setText("Bird is free!");
            setTimeout(() => {
                onComplete(3);
            }, 2000);
        }
    }, [theme, initialRender, onComplete]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
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
                Level 2
            </h1>
            <p className=" mt-8 text-xl font-semibold mb-[-1rem]">{text}</p>
            <Image
                className="my-5 "
                src={image}
                alt="bird"
                width={200}
                height={300}
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
                        className="p-1 bg-blue-600 rounded-sm "
                    />
                </button>
            </div>
        </div>
    );
};

export default Level2;
