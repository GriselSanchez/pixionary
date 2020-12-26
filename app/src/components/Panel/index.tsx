import React, { useEffect, useState, useContext, ReactElement } from "react";

import { NextTurnResponse, CanvasTypeEnum } from "src/types";
import { SocketContext, UserContext } from "src/contexts";
import { Canvas, Chat, PixelArtCanvas } from "src/components";

import { CanvasTypeSelect } from "./components";

const canvasMap: Record<CanvasTypeEnum, ReactElement> = {
  [CanvasTypeEnum.Normal]: <Canvas />,
  [CanvasTypeEnum.PixelArt]: <PixelArtCanvas />,
};

const Panel = () => {
  const socket = useContext(SocketContext);
  const user = useContext(UserContext);

  const [isTurn, setIsTurn] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [canvasType, setCanvasType] = useState<CanvasTypeEnum>(
    CanvasTypeEnum.Normal
  );

  const setNextTurn = () => {
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
    <div
      style={{
        display: "flex",
        placeContent: "center",
        marginTop: "100px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          placeContent: "flex-end",
          margin: "50px 20px",
        }}
      >
        <CanvasTypeSelect onChange={setCanvasType} />
        {canvasMap[canvasType]}

        {isTurn && <p>{`Word to draw: ${currentWord}`}</p>}
        {isTurn ? (
          <p>Your turn</p>
        ) : (
          <p>{currentPlayer && `Turn of ${currentPlayer}`}</p>
        )}

        <div>
          <Chat disabled={isTurn} />
          <button
            type="button"
            className="nes-btn is-primary"
            onClick={setNextTurn}
          >
            {currentPlayer ? "Next turn" : "Start"}
          </button>
        </div>
      </div>
    </div>
  );
};

export { Panel };
