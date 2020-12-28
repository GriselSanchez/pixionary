import React, { useContext, useState } from "react";

import { CanvasTypeEnum, Style } from "src/types";
import { GameContext } from "src/contexts";

import { Canvas } from "../Canvas";
import { PixelArtCanvas } from "../PixelArtCanvas";
import { StylingTools } from "../StylingTools";

import { CanvasTypeSelect, TurnInfo, CanvasContainer } from "./components";

const LeftPanel: React.FC = () => {
  const { time } = useContext(GameContext);

  const [style, setStyle] = useState<Style>({ width: 5, color: "#000000" });
  const [canvasType, setCanvasType] = useState<CanvasTypeEnum>(
    CanvasTypeEnum.PixelArt
  );

  const progressBarColor = (timeLeft: number) => {
    // TODO: calculate percentage left with total time
    if (timeLeft >= 60) return "success";
    if (timeLeft < 60 && timeLeft >= 30) return "warning";
    return "error";
  };

  return (
    <div>
      <TurnInfo />

      <CanvasTypeSelect onChange={setCanvasType} />

      <CanvasContainer>
        <progress
          className={`nes-progress is-${progressBarColor(time)}`}
          value={time}
          max={100}
          style={{ width: "99%" }}
        />

        {canvasType === CanvasTypeEnum.Normal ? (
          <Canvas style={style} />
        ) : (
          <PixelArtCanvas />
        )}

        <StylingTools onStyleChange={setStyle} />
      </CanvasContainer>
    </div>
  );
};

export { LeftPanel };
