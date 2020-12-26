import React, { useEffect, useState, useContext, ReactElement } from "react";

import { NextTurnResponse, CanvasTypeEnum, Style } from "src/types";
import { SocketContext, UserContext } from "src/contexts";
import { Canvas, Chat, PixelArtCanvas, StylingTools } from "src/components";

import {
  CanvasTypeSelect,
  PanelContainer,
  ChatContainer,
  TurnInfo,
  CanvasContainer,
  GameContainer,
} from "./components";

const Panel = () => {
  const socket = useContext(SocketContext);
  const user = useContext(UserContext);

  const [isTurn, setIsTurn] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [style, setStyle] = useState<Style>({ width: 5, color: "#000000" });
  const [canvasType, setCanvasType] = useState<CanvasTypeEnum>(
    CanvasTypeEnum.Normal
  );

  const canvasMap: Record<CanvasTypeEnum, ReactElement> = {
    [CanvasTypeEnum.Normal]: <Canvas style={style} />,
    [CanvasTypeEnum.PixelArt]: <PixelArtCanvas />,
  };

  const onNextTurn = () => {
    socket.emit("next-turn");
  };

  useEffect(() => {
    socket.on("next-turn", ({ playerDrawing, nextWord }: NextTurnResponse) => {
      setIsTurn(playerDrawing.id === user.id);
      setCurrentPlayer(playerDrawing.name);
      setCurrentWord(nextWord);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GameContainer>
      <PanelContainer className="nes-container is-rounded">
        <div>
          <TurnInfo
            isTurn={isTurn}
            currentPlayer={currentPlayer}
            currentWord={currentWord}
          />

          <CanvasTypeSelect onChange={setCanvasType} />
          <CanvasContainer>
            <StylingTools onStyleChange={setStyle} />
            {canvasMap[canvasType]}
          </CanvasContainer>
        </div>

        <ChatContainer>
          <Chat disabled={isTurn} />
          <button
            type="button"
            className="nes-btn is-primary"
            onClick={onNextTurn}
          >
            {currentPlayer ? "Next turn" : "Start"}
          </button>
        </ChatContainer>
      </PanelContainer>
    </GameContainer>
  );
};

export { Panel };
