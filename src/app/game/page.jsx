"use client";

import Level1 from "@/components/levels/Level1";
import Level2 from "@/components/levels/Level2";
import React, { useEffect, useState } from "react";

const Game = () => {
    const [currentLevel, setCurrentLevel] = useState(1);

    const handleLevelComplete = () => {
        console.log("function called");
        // Update state to switch to the next level
        setCurrentLevel((prevLevel) => prevLevel + 1);
    };

    return (
        <div className=" w-screen">
            {currentLevel === 1 && <Level1 onComplete={handleLevelComplete} />}
            {currentLevel === 2 && <Level2 onComplete={handleLevelComplete} />}
        </div>
    );
};

export default Game;
