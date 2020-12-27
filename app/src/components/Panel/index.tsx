import React, { useEffect, useState, useContext } from "react";

import { NextTurnResponse, CanvasTypeEnum, Style, Score } from "src/types";
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
  const [scores, setScores] = useState<Score[]>([]);
  const [timeLeft, setTimeLeft] = useState(100);
  const [style, setStyle] = useState<Style>({ width: 5, color: "#000000" });
  const [canvasType, setCanvasType] = useState<CanvasTypeEnum>(
    CanvasTypeEnum.Normal
  );

  const onNextTurn = () => {
    socket.emit("next-turn");
    setTimerInSeconds(10, 10);
  };

  const setTimerInSeconds = (timeLeft: number, timeTotal: number) => {
    if (timeLeft < 0) return;

    setTimeLeft(timeLeft * 10);
    setTimeout(() => {
      setTimerInSeconds(timeLeft - 1, timeTotal);
    }, 1000);
  };

  const progressBarColor = (timeLeft: number) => {
    // TODO: calculate percentage left with total time
    if (timeLeft >= 60) return "success";
    if (timeLeft < 60 && timeLeft >= 30) return "warning";
    return "error";
  };

  useEffect(() => {
    socket.on(
      "next-turn",
      ({ playerDrawing, nextWord, globalScores }: NextTurnResponse) => {
        setIsTurn(playerDrawing.id === user.id);
        setCurrentPlayer(playerDrawing.name);
        setCurrentWord(nextWord);
        setScores(globalScores);
      }
    );

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
          {scores.map((score) => (
            <p key={score.name}>
              {score.name}:{score.score}
            </p>
          ))}
          <CanvasContainer>
            <progress
              className={`nes-progress is-${progressBarColor(timeLeft)}`}
              value={timeLeft}
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

        <ChatContainer>
          <Chat disabled={isTurn} />

          <button
            type="button"
            className="nes-btn is-success"
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
