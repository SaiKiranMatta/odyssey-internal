"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { useTheme } from "next-themes";

const Level14 = ({ onComplete }) => {
  const { theme, setTheme } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  const coordinates = [
    "41.9371470  -87.8324850",
    "27.7517330  -15.5971740",
    "41.9636310  -87.6627340",
    "31.1833410  121.4371940",
    "41.4718020  -87.3575310"
  ];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCommandSubmit = () => {
    const match = inputValue.match(/^\/(text|help)\s*(.*)$/i);
  
    if (match) {
      const [, command, text] = match;
  
      switch (command.toLowerCase()) {
        case 'text':
          if (text.toLowerCase() === 'homer') {
            setSuccessMessage('Success!');
            setTimeout(() => {
              onComplete();
            }, 2000);
          }
          break;
        case 'help':
          setHelpModalOpen(true);
          break;
        default:
          break;
      }
    } else if (inputValue.toLowerCase() === 'homer' || inputValue.toUpperCase() === 'HOMER') {
      setSuccessMessage('Success!');
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      // Clear success message and input value
      setSuccessMessage('');
      setInputValue('');
    }
  };
  

  const closeHelpModal = () => {
    setHelpModalOpen(false);
  };

  useEffect(() => {
    // Clear the success message after showing it
    if (successMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage('');
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className="text-center text-xl text-purple-600 bg-yellow-300 rounded-full px-4 py-2 mb-8">
        An Ode to the Author
      </h1>

      <div className="text-center italic mb-4">
        "The <span className="text-purple-600">odyssey</span> is so much more than a <span className="text-purple-600">story</span>, it's a journey through time."
      </div>
      <div className="text-center ">- Nobody</div>

      <br />

      <div className="mb-4">
        {coordinates.map((coord, index) => (
          <p key={index} className="text-gray-600 font-semibold">{coord}</p>
        ))}
      </div>

      <div className="flex gap-1">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter command..."
          className="border rounded px-2 py-1"
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
          <div className="p-4 bg-white dark:bg-[#080917] rounded-md">
            <h2 className="text-xl font-bold mb-2">Available Commands:</h2>
            <ul>
              <li>/text [displayed text]</li>
              <li>/help</li>
            </ul>
            <button
              onClick={closeHelpModal}
              className="mt-4 p-2 bg-blue-500 text-white rounded-md">
              Close
            </button>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="mt-8">
          <p className="text-green-600 font-semibold">{successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Level14;
