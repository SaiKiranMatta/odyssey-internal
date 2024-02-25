"use client";

import { useEffect, useRef, useState } from "react";
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
  const [atext, setAtext] = useState("_");
  const [isanimatingleft, setisanimatingleft] = useState(true);
  const [isanimatingright, setisanimatingright] = useState(true);
  const leftRef = useRef();
  const rightRef = useRef();

  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  const isInRange = (position, side, elementRef) => {
    const [x, y] = position.split(" ").map((value) => parseFloat(value));

    // Convert x and y values from pixels to rems
    const baseFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const xRem = x / baseFontSize;
    const yRem = y / baseFontSize;
    const eyRem = yRem;

    return (eyRem >= -1.5 && eyRem <= 1.5) || eyRem <= -12.5 || eyRem >= 12.5;
  };

  useEffect(() => {
    const leftPosition = window.getComputedStyle(
      leftRef.current
    ).backgroundPosition;
    const rightPosition = window.getComputedStyle(
      rightRef.current
    ).backgroundPosition;

    if (
      isInRange(leftPosition, "left") &&
      isInRange(rightPosition, "right") &&
      atext == "2" &&
      !isanimatingleft &&
      !isanimatingright
    ) {
      setText("Success!");
      setTimeout(() => {
        onComplete(8);
      }, 2000);
    }
  }, [atext, leftRef, rightRef, isanimatingleft, isanimatingright, onComplete]);

  const stopAnimation = (side) => {
    let currentPos;
    if (side === "left") {
      currentPos = window.getComputedStyle(leftRef.current).backgroundPosition;
      setisanimatingleft(false);
    } else if (side === "right") {
      currentPos = window.getComputedStyle(rightRef.current).backgroundPosition;
      setisanimatingright(false);
    }

    // Set the current background position as the final position
    if (side === "left") {
      leftRef.current.style.backgroundPosition = currentPos;
    } else if (side === "right") {
      rightRef.current.style.backgroundPosition = currentPos;
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCommandSubmit = () => {
    const matchTheme = inputValue.match(/^\/theme (dark|light)$/);

    const match = inputValue.match(/^\/(text|help|rotate)\s*(.*)$/);

    if (match) {
      const [, command, text] = match;

      switch (command) {
        case "rotate":
          if (!isNaN(text)) {
            setInputValue("");
          }
        case "text":
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

    const stopLeftMatch = inputValue.match(/^\/stop left$/);
    const stopRightMatch = inputValue.match(/^\/stop right$/);

    if (stopLeftMatch) {
      stopAnimation("left");
      setInputValue("");
    } else if (stopRightMatch) {
      stopAnimation("right");
      setInputValue("");
    }

    const startLeftMatch = inputValue.match(/^\/start left$/);
    const startRightMatch = inputValue.match(/^\/start right$/);

    if (startLeftMatch) {
      setisanimatingleft(true);
      setInputValue("");
    } else if (startRightMatch) {
      setisanimatingright(true);
      setInputValue("");
    }
  };

  const closeHelpModal = () => {
    setHelpModalOpen(false);
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleCommandSubmit();
    }
  };
  return (
    <div className="flex flex-col items-center mt-4 ">
      <h1 className="px-4 py-2 text-2xl text-purple-600 bg-yellow-300 rounded-full">
        Level 7
      </h1>
      <p className="mx-10 mt-8 text-xl font-semibold ">{text}</p>
      <div className="flex justify-between w-64 h-64 px-4 py-4 mt-4 text-xl border">
        <div
          ref={leftRef}
          className={`flex flex-col w-16 h-56 text-center border bg-[url('/leftcol.png')]                 bg-cover bg-repeat-y ${
            isanimatingleft ? "spin-left" : ""
          }`}>
          <ul>
            {/* <li className="py-2 border-b "> 2 </li>
                        <li className="py-2 border-b "> 9 </li>
                        <li className="py-2 border-b "> 3 </li>
                        <li className="py-2 border-b "> 4 </li>
                        <li className="py-2 border-b "> 9 </li> */}
          </ul>
        </div>
        <div className="flex flex-col w-16 h-56 text-black bg-white border">
          <ul>
            <li className="py-2 border-b  border-[#e5e7eb]">+ 5 =</li>
            <li className="py-2 border-b border-[#e5e7eb]">- 1 =</li>
            <li className="py-2 border-b border-[#e5e7eb]">* {atext} =</li>
          </ul>
        </div>
        <div
          ref={rightRef}
          className={`flex flex-col w-16 h-56 text-center border bg-[url('/rightcol.png')] bg-cover bg-repeat-y ${
            isanimatingright ? "spin-right" : ""
          }`}>
          {/* <ul>
                        <li className="py-2 border-b ">7</li>
                        <li className="py-2 border-b ">8</li>
                        <li className="py-2 border-b ">6</li>
                        <li className="py-2 border-b ">9</li>
                        <li className="py-2 border-b ">1</li>
                    </ul> */}
        </div>
      </div>
      <span
        className="mx-10 mt-4 mb-8 cursor-pointer "
        onClick={() => setHelpModalOpen(true)}>
        Type /help to get commands and hints
      </span>

      <div className="flex gap-1">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleEnter}
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
              <li>/start [left|right]</li>
              <li>/stop [left|right]</li>
              <li>/text [text]</li>
              <li>/help</li>
              <li>/theme [dark|light]</li>
            </ul>

            <div className="text-center ">
              <button
                className="p-2 mt-4 text-white bg-blue-500 rounded-md "
                onClick={closeHelpModal}>
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
