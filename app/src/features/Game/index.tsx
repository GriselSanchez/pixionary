import React, { useContext, useEffect, useState } from "react";

import { LeftPanel, RightPanel } from "src/components";
import { SocketContext, UserContext, GameContext } from "src/contexts";
import { NextTurnResponse, Score } from "src/types";

import { GameContainer, PanelContainer } from "./components";

const Game = () => {
  const socket = useContext(SocketContext);
  const user = useContext(UserContext);

  const [isTurn, setIsTurn] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<string>("");
  const [currentWord, setCurrentWord] = useState<string>("");
  const [scores, setScores] = useState<Score[]>([]);
  const [time, setTime] = useState<number>(100);
  let timeout: NodeJS.Timeout;

  const setTimerInSeconds = (timeLeft: number, timeTotal: number) => {
    if (timeLeft < 0) return;

    clearTimeout(timeout);
    setTime(timeLeft * 10);
    timeout = setTimeout(() => {
      setTimerInSeconds(timeLeft - 1, timeTotal);
    }, 1000);
  };

  useEffect(() => {
    socket.on(
      "next-turn",
      ({ playerDrawing, nextWord, globalScores }: NextTurnResponse) => {
        setIsTurn(playerDrawing.id === user.id);
        setCurrentPlayer(playerDrawing.name);
        setCurrentWord(nextWord);
        setScores(globalScores);
        setTimerInSeconds(10, 10);
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GameContext.Provider
      value={{ isTurn, currentPlayer, currentWord, scores, time }}
    >
      <GameContainer>
        <PanelContainer className="nes-container is-rounded">
          <LeftPanel />
          <RightPanel />
        </PanelContainer>
      </GameContainer>
    </GameContext.Provider>
  );
};

export { Game };
