import React from "react";
import { Game } from "src/types";

const GameContext = React.createContext<Game>({
  isTurn: false,
  currentPlayer: "",
  currentWord: "",
  scores: [],
  time: 100,
});

export { GameContext };
