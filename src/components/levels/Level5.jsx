"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast";

const Level5 = ({ onComplete }) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const { setTheme } = useTheme();
  const { toast } = useToast();
  const [text, setText] = useState(
    "What path holds the key, with points numbered, can you see? Follow the route, unveil the sign, and reveal the tech giant, so divine."
  );
  const [atext, setAtext] = useState("");

  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  useEffect(() => {
    if (atext === "google") {
      setText("Success!");
      setTimeout(() => {
        onComplete(6);
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
            setRotationAngle((prevAngle) => (prevAngle + parseInt(text)) % 360);
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
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleCommandSubmit();
    }
  };
  return (
    <div className="flex flex-col items-center mt-4 ">
      <h1 className="px-4 py-2 text-2xl text-purple-600 bg-yellow-300 rounded-full">
        Level 5
      </h1>
      <p className="mx-10 mt-8 text-xl font-semibold ">{text}</p>
      <div className=" w-[80%] ">
        <Image
          src="/Hiddenlogo.jpg"
          alt="69"
          width={500}
          height={500}
          style={{ transform: `rotate(${rotationAngle}deg)` }}
        />
      </div>
      <span
        className="mx-10 mt-8 mb-8 cursor-pointer text-center"
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
    <div className="p-4 bg-white dark:bg-[#080917] rounded-md overflow-y-scroll max-w-[60vw] max-h-[40vh] scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent">
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background-color: #9ca3af; /* default thumb color */
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background-color: #9834ec; /* hover thumb color */
        }

        @media (max-width: 640px) {
          ::-webkit-scrollbar {
            width: 6px;
          }
        }
      `}</style>
      <h2 className="text-xl font-bold mb-2">Available Commands:</h2>
      <ul className="divide-y divide-gray-300">
        <li className="py-2">
          <span className="text-purple-600 font-bold">/flipdigit</span> <span className="text-blue-500">[position]</span> - <em>Flip the digit at the specified position.</em>
        </li>
        <li className="py-2">
          <span className="text-purple-600 font-bold">/shiftleft</span> <span className="text-blue-500">[amount]</span> - <em>Shift the image to the left by the specified amount.</em>
        </li>
        <li className="py-2">
          <span className="text-purple-600 font-bold">/shiftright</span> <span className="text-blue-500">[amount]</span> - <em>Shift the image to the right by the specified amount.</em>
        </li>
        <li className="py-2">
          <span className="text-purple-600 font-bold">/invert</span> - <em>Invert the image.</em>
        </li>
        <li className="py-2">
          <span className="text-purple-600 font-bold">/theme</span> <span className="text-blue-500">[dark|light]</span> - <em>Change the theme to dark or light.</em>
        </li>
        <li className="py-2">
          <span className="text-purple-600 font-bold">/rotate</span> - <em>Rotate the image.</em>
        </li>
        <li className="py-2">
          <span className="text-purple-600 font-bold">/text</span> - <em>Input text to the function.</em>
        </li>
        <li className="py-2">
          <span className="text-purple-600 font-bold">/help</span> - <em>Show available commands and their descriptions.</em>
        </li>
      </ul>
      <h2 className="text-xl font-bold mb-2">Hint:</h2>
            <p className="text-purple-600 font-bold">Internet giant's address</p>
      <div className="text-center">
        <button
          onClick={closeHelpModal}
          className="mt-4 p-2 bg-blue-500 text-white rounded-md"
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

export default Level5;
