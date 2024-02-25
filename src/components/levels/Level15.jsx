"use client";

import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { useTheme } from "next-themes";
import Image from "next/image";
import { toast, useToast } from "@/components/ui/use-toast";

const Level15 = ({ onComplete }) => {
  const [towers, setTowers] = useState({
    1: [3, 2, 1],
    2: [],
    3: [],
  });

  const [text, setText] = useState("Shift the discs from Tower 1 to Tower 3.");
  const [inputValue, setInputValue] = useState("");
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  const { setTheme } = useTheme();

  const moveDisc = (source, destination) => {
    const sourceTower = towers[source];
    const destinationTower = towers[destination];

    if (sourceTower.length === 0) {
      toast({
        description: "Source tower is empty. Try again.",
      });
    } else if (
      destinationTower.length === 0 ||
      sourceTower[sourceTower.length - 1] <
        destinationTower[destinationTower.length - 1]
    ) {
      destinationTower.push(sourceTower.pop());
      console.log(towers);
    } else {
      toast({
        description:
          "Invalid move. Larger disc cannot be placed on a smaller one. Try again.",
      });
    }
  };

  useEffect(() => {
    // Check for completion condition and call onComplete if needed
    const isCompleted =
      towers[3].length === 3 &&
      towers[3][0] === 3 &&
      towers[3][1] === 2 &&
      towers[3][2] === 1;

    if (isCompleted) {
      setText("Success!");
      setTimeout(() => {
        onComplete(16);
      }, 2000);
    }
  }, [towers, onComplete, moveDisc]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCommandSubmit = () => {
    const match = inputValue.match(/^\/shifttop (\d) to (\d)$/);

    if (match) {
      const [, source, destination] = match.map(Number);
      moveDisc(source, destination);
      setInputValue("");
    } else if (inputValue === "/help") {
      setHelpModalOpen(true);
    } else if (inputValue.startsWith("/theme ")) {
      const theme = inputValue.split(" ")[1];
      setTheme(theme);
      setInputValue("");
    } else {
      toast({
        description:
          "Invalid command. Use /help to see available commands. Try again.",
      });
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
    <div className="flex flex-col items-center mt-4">
      <h1 className="px-4 py-2 text-2xl text-purple-600 bg-yellow-300 rounded-full">
        Level 15
      </h1>
      <p className="mx-10 my-8 text-xl font-semibold ">{text}</p>

      <div className="flex justify-between mt-4 w-80 md:w-96">
        {Object.keys(towers).map((tower) => (
          <div
            key={tower}
            className="flex flex-col items-center">
            <div className="flex flex-col-reverse items-center justify-start h-20">
              {towers[tower].map((disc) => (
                <div
                  key={disc}
                  className={`bg-blue-500 h-4 ${
                    disc === 1 ? "w-8" : disc === 2 ? "w-12" : "w-16"
                  }
                   rounded-md m-1  text-center`}></div>
              ))}
            </div>
            <p>Tower {tower}</p>
          </div>
        ))}
      </div>
      <span
        className="mx-10 mt-8 mb-8 cursor-pointer "
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
              <li>/shifttop [source] to [destination]</li>
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

export default Level15;
