import { useTheme } from "next-themes";
import React, { useEffect, useState, useRef } from "react";
import { Input } from "../ui/input";
import Image from "next/image";

const Level9 = ({ onComplete }) => {
  const { theme, setTheme } = useTheme();
  const [rotationAngle, setRotationAngle] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [image, setImage] = useState("/Police.png");
  const [initialRender, setInitialRender] = useState(true);
  const parentDivRef = useRef(null);
  const [text, setText] = useState("Theif has been caught!");
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  const [transformX, setTransformX] = useState(0); // State for X translation
  // Set the theme to a specific color when the component mounts
  useEffect(() => {
    setTheme("dark");
    setInitialRender(false);
  }, []);

  useEffect(() => {
    if (parentDivRef.current) {
      const parentDivWidth = parentDivRef.current.clientWidth;
    }
  }, [parentDivRef]);

  useEffect(() => {
    // Check if the image of the thief reaches the position of the jail
    const thiefPosition = transformX;
    const jailPosition = parentDivRef.current.clientWidth - 112; // Adjust 40 based on the width of the thief image

    if (!initialRender && theme === "light" && thiefPosition >= jailPosition) {
      console.log("yes");
      setText("Theif has been caught!");
      setTimeout(() => {
        onComplete(10);
      }, 2000);
    }
  }, [theme, initialRender, transformX, onComplete]);

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
    const movex = inputValue.match(/^\/move (-?\d+)$/);
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
    } else if (movex) {
      // Handle movex command
      const newX = parseInt(movex[1], 10);
      if (!isNaN(newX)) {
        const newTransformX = transformX + newX;

        // Check if the new position exceeds the maximum allowed movement
        if (
          newTransformX > parentDivRef.current.clientWidth - 104 ||
          newTransformX < 0
        ) {
          // If it exceeds, reset the position to starting position (0)
          setTransformX(0);
          console.log(parentDivRef.current.clientWidth);
        } else {
          // Otherwise, update the position
          setTransformX(newTransformX);
        }

        setInputValue("");
      }
    }
    else if (inputValue === "/help") {
      setHelpModalOpen(true);
    }
  };
  const closeHelpModal = () => {
    setHelpModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className="px-4 py-2 text-2xl text-purple-600 bg-yellow-300 rounded-full">
        Level 9
      </h1>
      <p className=" mt-8 text-xl font-semibold mb-[-1rem]"></p>
      <div
        className="relative flex justify-start md:w-96 w-80"
        ref={parentDivRef}>
        <div
          className={`flex justify-start gap-6 move-this-entire-div`}
          style={{ transform: `translateX(${transformX}px)` }}>
          <Image
            className="my-5 "
            src={image}
            alt="police"
            width={40}
            height={60}
            style={{ transform: `rotate(${rotationAngle}deg)` }}
          />
          <Image
            className="my-5 "
            src="/thief.png"
            alt="thief"
            width={40}
            height={60}
            style={{ transform: `rotate(${rotationAngle}deg)` }}
          />
        </div>
        <Image
          className="absolute my-5 right-2 "
          src="/jail.png"
          alt="jail"
          width={40}
          height={60}
          style={{ transform: `rotate(${rotationAngle}deg)` }}
        />
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
              <li>/move [distance]</li>
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

export default Level9;
