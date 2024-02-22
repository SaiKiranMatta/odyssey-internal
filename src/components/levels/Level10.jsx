"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast";

const Level10 = ({ onComplete }) => {
  const [inputValue, setInputValue] = useState("");
  const { setTheme } = useTheme();
  const { toast } = useToast();
  const [text, setText] = useState(
    "Transform given matrix into identity matrix using elementary row operations"
  );

  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  const [digit1, setDigit1] = useState(2);
  const [digit2, setDigit2] = useState(3);
  const [digit3, setDigit3] = useState(1);
  const [digit4, setDigit4] = useState(1);
  const [digit5, setDigit5] = useState(2);
  const [digit6, setDigit6] = useState(0);
  const [digit7, setDigit7] = useState(3);
  const [digit8, setDigit8] = useState(1);
  const [digit9, setDigit9] = useState(2);

  const isLevelComplete = () => {
    return (
      digit1 === 1 &&
      digit2 === 0 &&
      digit3 === 0 &&
      digit4 === 0 &&
      digit5 === 1 &&
      digit6 === 0 &&
      digit7 === 0 &&
      digit8 === 0 &&
      digit9 === 1
    );
  };

  useEffect(() => {
    if (isLevelComplete()) {
      setText("Success!");
      setTimeout(() => {
        onComplete(4);
      }, 2000);
    }
  }, [
    digit1,
    digit2,
    digit3,
    digit4,
    digit5,
    digit6,
    digit7,
    digit8,
    digit9,
    onComplete,
  ]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCommandSubmit = () => {
    const matchTheme = inputValue.match(/^\/theme (dark|light)$/);

    const match = inputValue.match(/^\/(invert|help|multiply|add)\s*(.*)$/);

    if (match) {
      const [, operation, parameters] = match;

      switch (operation) {
        case "help":
          setHelpModalOpen(true);
          break;
        case "multiply":
          const multiplyMatch = parameters.match(/^(row|col)([1-3])\s+(\d+)$/);
          if (multiplyMatch) {
            const [, type, number, factor] = multiplyMatch;
            const updatedMatrix = [
              digit1,
              digit2,
              digit3,
              digit4,
              digit5,
              digit6,
              digit7,
              digit8,
              digit9,
            ];
            if (type === "row") {
              const startIndex = (number - 1) * 3;
              const endIndex = startIndex + 3;
              for (let i = startIndex; i < endIndex; i++) {
                updatedMatrix[i] *= parseInt(factor);
              }
            } else if (type === "col") {
              const colNumber = parseInt(number);
              for (let i = colNumber - 1; i < 9; i += 3) {
                updatedMatrix[i] *= parseInt(factor);
              }
            }
            setDigit1(updatedMatrix[0]);
            setDigit2(updatedMatrix[1]);
            setDigit3(updatedMatrix[2]);
            setDigit4(updatedMatrix[3]);
            setDigit5(updatedMatrix[4]);
            setDigit6(updatedMatrix[5]);
            setDigit7(updatedMatrix[6]);
            setDigit8(updatedMatrix[7]);
            setDigit9(updatedMatrix[8]);
            setInputValue("");
          }
          break;
        case "add":
          const addMatch = parameters.match(
            /^(row|col)\s+(\d+)\*(\d+)\s+(\d+)\*(\d+)$/
          );
          if (addMatch) {
            const [, type, factor1, source1, factor2, source2] = addMatch;
            const updatedMatrix = [
              digit1,
              digit2,
              digit3,
              digit4,
              digit5,
              digit6,
              digit7,
              digit8,
              digit9,
            ];
            if (type === "row") {
              const source1Index = (source1 - 1) * 3;
              const source2Index = (source2 - 1) * 3;
              const temp = [0, 0, 0];
              for (let i = 0; i < 3; i++) {
                temp[i] += parseInt(factor1) * updatedMatrix[source1Index + i];
                temp[i] += parseInt(factor2) * updatedMatrix[source2Index + i];
              }
              for (let i = 0; i < 3; i++) {
                updatedMatrix[i + source2Index] = temp[i];
              }
            }
            if (type === "col") {
              const source1Index = source1 - 1;
              const source2Index = source2 - 1;
              const temp = [0, 0, 0, 0, 0, 0, 0, 0, 0];
              for (let i = 0; i < 9; i += 3) {
                temp[i] += parseInt(factor1) * updatedMatrix[i + source1Index];
                temp[i] += parseInt(factor2) * updatedMatrix[i + source2Index];
              }
              for (let i = 0; i < 9; i += 3) {
                updatedMatrix[i + source2Index] = temp[i];
              }
            }

            setDigit1(updatedMatrix[0]);
            setDigit2(updatedMatrix[1]);
            setDigit3(updatedMatrix[2]);
            setDigit4(updatedMatrix[3]);
            setDigit5(updatedMatrix[4]);
            setDigit6(updatedMatrix[5]);
            setDigit7(updatedMatrix[6]);
            setDigit8(updatedMatrix[7]);
            setDigit9(updatedMatrix[8]);
            setInputValue("");
          }
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
        Level 10
      </h1>
      <p className="mx-10 mt-8 font-semibold text ">{text}</p>
      <div className="flex flex-col items-center px-3 py-2 my-5 text-xl border-2 border-gray-900 rounded-sm">
        <div className="flex">
          <div className="w-12 px-1 text-center border border-gray-900 rounded-sm h-7">
            {digit1}
          </div>
          <div className="w-12 px-1 text-center border border-gray-900 rounded-sm h-7">
            {digit2}
          </div>
          <div className="w-12 px-1 text-center border border-gray-900 rounded-sm h-7">
            {digit3}
          </div>
        </div>
        <div className="flex">
          <div className="w-12 px-1 text-center border border-gray-900 rounded-sm h-7">
            {digit4}
          </div>
          <div className="w-12 px-1 text-center border border-gray-900 rounded-sm h-7">
            {digit5}
          </div>
          <div className="w-12 px-1 text-center border border-gray-900 rounded-sm h-7">
            {digit6}
          </div>
        </div>
        <div className="flex">
          <div className="w-12 px-1 text-center border border-gray-900 rounded-sm h-7">
            {digit7}
          </div>
          <div className="w-12 px-1 text-center border border-gray-900 rounded-sm h-7">
            {digit8}
          </div>
          <div className="w-12 px-1 text-center border border-gray-900 rounded-sm h-7">
            {digit9}
          </div>
        </div>
      </div>

      <span
        className="mx-10 mt-4 mb-8 cursor-pointer "
        onClick={() => setHelpModalOpen(true)}>
        Type /help to get the list of available commands
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

export default Level10;
