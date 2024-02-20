"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast";

const Level7 = ({ onComplete }) => {
    const [rotationAngle, setRotationAngle] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const { setTheme } = useTheme();
    const { toast } = useToast();
    const [text, setText] = useState("Solve the equations");
    const [atext, setAtext] = useState("");

    const [isHelpModalOpen, setHelpModalOpen] = useState(false);

    useEffect(() => {
        if (atext === "opensys") {
            setText("Success!");
            setTimeout(() => {
                onComplete(7);
            }, 2000);
        }
    }, [atext, onComplete]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleCommandSubmit = () => {
        const matchTheme = inputValue.match(/^\/theme (dark|light)$/);

        const match = inputValue.match(/^\/(text|help|rotate)\s*(.*)$/);
        console.log(match);

        if (match) {
            const [, command, text] = match;
            console.log(match);

            switch (command) {
                case "rotate":
                    if (!isNaN(text)) {
                        setRotationAngle(
                            (prevAngle) => (prevAngle + parseInt(text)) % 360
                        );
                        setInputValue("");
                    }
                case "text":
                    console.log(1);
                    setAtext(text.toLowerCase());

                    break;
                case "help":
                    setHelpModalOpen(true);
                    break;
                default:
                    break;
            }
        } else if (matchTheme) {
            const theme = matchTheme[1];
            setTheme(theme);
            setInputValue("");
        }
    };

    const closeHelpModal = () => {
        setHelpModalOpen(false);
    };

    return (
        <div className="flex flex-col items-center mt-4 ">
            <h1 className="px-4 py-2 text-2xl text-purple-600 bg-yellow-300 rounded-full">
                Level 7
            </h1>
            <p className="mx-10 mt-8 text-xl font-semibold ">{text}</p>
            <div className="flex justify-between w-64 h-64 px-4 py-4 mt-4 text-xl border">
                <div className="flex flex-col w-16 h-56 text-center border bg-[url('/leftcol.png')] bg-cover">
                    <ul>
                        {/* <li className="py-2 border-b "> 4 </li>
                        <li className="py-2 border-b "> 9 </li>
                        <li className="py-2 border-b "> 2 </li>
                        <li className="py-2 border-b "> 9 </li>
                        <li className="py-2 border-b "> 3 </li> */}
                    </ul>
                </div>
                <div className="flex flex-col w-16 h-56 border">
                    <ul>
                        <li className="py-2 border-b ">+ 5 =</li>
                        <li className="py-2 border-b ">- 1 =</li>
                        <li className="py-2 border-b ">* _ =</li>
                    </ul>
                </div>
                <div className="flex flex-col w-16 h-56 text-center border bg-[url('/rightcol.png')] bg-cover">
                    <ul>
                        {/* <li className="py-2 border-b ">9</li>
                        <li className="py-2 border-b ">1</li>
                        <li className="py-2 border-b ">7</li>
                        <li className="py-2 border-b ">8</li>
                        <li className="py-2 border-b ">6</li> */}
                    </ul>
                </div>
            </div>
            <span
                className="mx-10 mt-4 mb-8 cursor-pointer "
                onClick={() => setHelpModalOpen(true)}
            >
                Type /help to get commands and hints
            </span>

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

            {isHelpModalOpen && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                    <div className="p-4 bg-white rounded-md">
                        <h2 className="flex flex-col mb-2 text-xl font-bold">
                            Available Commands:
                        </h2>
                        <ul>
                            <li>/rotate [number]</li>
                            <li>/text [text]</li>
                            <li>/help</li>
                            <li>/theme [dark|light]</li>
                        </ul>
                        <h2 className="flex flex-col my-2 text-xl font-bold">
                            Hint:
                        </h2>
                        <p>Internet giant's address</p>
                        <div className="text-center ">
                            <button
                                className="p-2 mt-4 text-white bg-blue-500 rounded-md "
                                onClick={closeHelpModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Level7;
