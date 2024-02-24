"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast";

const Level16 = ({ onComplete }) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const { setTheme } = useTheme();
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [atext, setAtext] = useState("_");
  const [isanimatingone, setisanimatingone] = useState(true);
  const [isanimatingtwo, setisanimatingtwo] = useState(true);
  const [isanimatingthree, setisanimatingthree] = useState(true);
  const [isanimatingfour, setisanimatingfour] = useState(true);

  const oneRef = useRef();
  const twoRef = useRef();
  const threeRef = useRef();
  const fourRef = useRef();

  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  const isInRange = (position) => {
    const [x, y] = position.split(" ").map((value) => parseFloat(value));

    // Convert x and y values from pixels to rems
    const baseFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const xRem = x / baseFontSize;
    const yRem = y / baseFontSize;
    console.log(yRem);
    const eyRem = yRem / 15;
    console.log(eyRem);

    return xRem >= 0 && xRem <= 1 && eyRem >= -0.1 && eyRem <= 0.1;
  };

  const isAnimationStopped = () => {
    return (
      !isanimatingone &&
      !isanimatingtwo &&
      !isanimatingthree &&
      !isanimatingfour
    );
  };

  useEffect(() => {
    const onePosition = window.getComputedStyle(
      oneRef.current
    ).backgroundPosition;
    const twoPosition = window.getComputedStyle(
      twoRef.current
    ).backgroundPosition;
    const threePosition = window.getComputedStyle(
      threeRef.current
    ).backgroundPosition;
    const fourPosition = window.getComputedStyle(
      fourRef.current
    ).backgroundPosition;
    if (
      isInRange(onePosition) &&
      isInRange(twoPosition) &&
      isInRange(threePosition) &&
      isInRange(fourPosition) &&
      isAnimationStopped()
    ) {
      setText("Success!");
      setTimeout(() => {
        onComplete(8);
      }, 2000);
    }
  }, [oneRef, twoRef, threeRef, fourRef, onComplete]);

  const stopAnimation = (side) => {
    let currentPos;
    if (side === "one") {
      currentPos = window.getComputedStyle(oneRef.current).backgroundPosition;
      setisanimatingone(false);
    } else if (side === "two") {
      currentPos = window.getComputedStyle(twoRef.current).backgroundPosition;
      setisanimatingtwo(false);
    } else if (side === "three") {
      currentPos = window.getComputedStyle(threeRef.current).backgroundPosition;
      setisanimatingthree(false);
    } else if (side === "four") {
      currentPos = window.getComputedStyle(fourRef.current).backgroundPosition;
      setisanimatingfour(false);
    }

    if (side === "one") {
      oneRef.current.style.backgroundPosition = currentPos;
    } else if (side === "two") {
      twoRef.current.style.backgroundPosition = currentPos;
    } else if (side === "three") {
      threeRef.current.style.backgroundPosition = currentPos;
    } else if (side === "four") {
      fourRef.current.style.backgroundPosition = currentPos;
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

    const stopOneMatch = inputValue.match(/^\/stop 1$/);
    const stopTwoMatch = inputValue.match(/^\/stop 2$/);
    const stopThreeMatch = inputValue.match(/^\/stop 3$/);
    const stopFourMatch = inputValue.match(/^\/stop 4$/);

    if (stopOneMatch) {
      stopAnimation("one");
      setInputValue("");
    } else if (stopTwoMatch) {
      stopAnimation("two");
      setInputValue("");
    } else if (stopThreeMatch) {
      stopAnimation("three");
      setInputValue("");
    } else if (stopFourMatch) {
      stopAnimation("four");
      setInputValue("");
    }

    const startOneMatch = inputValue.match(/^\/start 1$/);
    const startTwoMatch = inputValue.match(/^\/start 2$/);
    const startThreeMatch = inputValue.match(/^\/start 3$/);
    const startFourMatch = inputValue.match(/^\/start 4$/);

    if (startOneMatch) {
      setisanimatingone(true);
      setInputValue("");
    } else if (startTwoMatch) {
      setisanimatingtwo(true);
      setInputValue("");
    } else if (startThreeMatch) {
      setisanimatingthree(true);
      setInputValue("");
    } else if (startFourMatch) {
      setisanimatingfour(true);
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
        Level 16
      </h1>
      <div className="mx-10 mt-8 text-sm font-semibold md:text-base ">
        <ul>
          <li>
            I started <span className="text-purple-400">few</span> companies, my
            products are everywhere
          </li>
          <li>
            In my famous speech at Stanford, I told
             <span className="text-blue-600 ">few</span> lessons
          </li>
          <li>
            I lived a <span className="text-pink-500 ">short life</span> but the
            world knows what I am worth
          </li>
        </ul>
        {text}
      </div>
      <div className="relative flex justify-between h-[17rem] px-4 py-4 mt-4 text-xl border w-80">
        <div
          ref={oneRef}
          className={`flex flex-col w-16 h-60 text-center border border-purple-400  bg-[url(/col1.png)] bg-cover bg-repeat-y ${
            isanimatingone ? "spin-leftN" : ""
          }`}>
          {/* <ul>
            <li className="h-12 py-2 border-b "> 7 </li>
            <li className="h-12 py-2 border-b "> 4 </li>
            <li className="h-12 py-2 border-b "> 3 </li>
            <li className="h-12 py-2 border-b "> 2 </li>
            <li className="h-12 py-2 border-b "> 9 </li>
          </ul> */}
        </div>
        <div
          ref={twoRef}
          className={`flex flex-col w-16 h-60 text-center border border-blue-600 bg-[url(/col2.png)]   bg-cover bg-repeat-y ${
            isanimatingtwo ? "spin-rightN" : ""
          }`}>
          {/* <ul>
            <li className="h-12 py-2 border-b "> 1 </li>
            <li className="h-12 py-2 border-b "> 6 </li>
            <li className="h-12 py-2 border-b "> 3 </li>
            <li className="h-12 py-2 border-b "> 2 </li>
            <li className="h-12 py-2 border-b "> 9 </li>
          </ul> */}
        </div>
        <div
          ref={threeRef}
          className={`flex flex-col w-16 h-60 text-center border border-pink-500 bg-[url(/col3.png)]   bg-cover bg-repeat-y ${
            isanimatingthree ? "spin-leftN" : ""
          }`}>
          {/* <ul>
            <li className="h-12 py-2 border-b "> 8 </li>
            <li className="h-12 py-2 border-b "> 2 </li>
            <li className="h-12 py-2 border-b "> 5 </li>
            <li className="h-12 py-2 border-b "> 7 </li>
            <li className="h-12 py-2 border-b "> 9 </li>
          </ul> */}
        </div>
        <div
          ref={fourRef}
          className={`flex flex-col w-16 h-60 text-center border border-pink-500 bg-[url(/col4.png)]   bg-cover bg-repeat-y ${
            isanimatingfour ? "spin-rightN" : ""
          }`}>
          {/* <ul>
            <li className="h-12 py-2 border-b "> 7 </li>
            <li className="h-12 py-2 border-b "> 8 </li>
            <li className="h-12 py-2 border-b "> 6 </li>
            <li className="h-12 py-2 border-b "> 1 </li>
            <li className="h-12 py-2 border-b "> 9 </li>
          </ul> */}
        </div>
        <div className="absolute h-24 bg-black bg-opacity-50 w-72 "></div>
        <div className="absolute h-24 bg-black bg-opacity-50 bottom-4 w-72 "></div>
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

export default Level16;
