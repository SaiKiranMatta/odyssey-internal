"use client";

import Level1 from "@/components/levels/Level1";
import Level10 from "@/components/levels/Level10";
import Level2 from "@/components/levels/Level2";
import Level3 from "@/components/levels/Level3";
import Level4 from "@/components/levels/Level4";
import Level5 from "@/components/levels/Level5";
import Level6 from "@/components/levels/Level6";
import Level7 from "@/components/levels/Level7";
import Level8 from "@/components/levels/Level8";
import Level9 from "@/components/levels/Level9";
import Level13 from "@/components/levels/Level13";
import React, { useEffect, useState } from "react";
import Level11 from "@/components/levels/Level11";
import Level12 from "@/components/levels/Level12";
import Level15 from "@/components/levels/Level15";
import Level16 from "@/components/levels/Level16";

const Game = () => {
  const [currentLevel, setCurrentLevel] = useState(1);

  const handleLevelComplete = (curLevel) => {
    console.log("function called");
    // Update state to switch to the next level
    setCurrentLevel(curLevel);
  };

  return (
    <div className="w-screen ">
      {currentLevel === 1 && <Level1 onComplete={handleLevelComplete} />}
      {currentLevel === 2 && <Level2 onComplete={handleLevelComplete} />}
      {currentLevel === 3 && <Level3 onComplete={handleLevelComplete} />}
      {currentLevel === 4 && <Level4 onComplete={handleLevelComplete} />}
      {currentLevel === 5 && <Level5 onComplete={handleLevelComplete} />}
      {currentLevel === 6 && <Level6 onComplete={handleLevelComplete} />}
      {currentLevel === 7 && <Level7 onComplete={handleLevelComplete} />}
      {currentLevel === 8 && <Level8 onComplete={handleLevelComplete} />}
      {currentLevel === 9 && <Level9 onComplete={handleLevelComplete} />}
      {currentLevel === 10 && <Level10 onComplete={handleLevelComplete} />}
      {currentLevel === 11 && <Level11 onComplete={handleLevelComplete} />}
      {currentLevel === 12 && <Level12 onComplete={handleLevelComplete} />}
      {currentLevel === 13 && <Level13 onComplete={handleLevelComplete} />}
      {currentLevel === 15 && <Level15 onComplete={handleLevelComplete} />}
      {currentLevel === 16 && <Level16 onComplete={handleLevelComplete} />}
    </div>
  );
};

export default Game;
