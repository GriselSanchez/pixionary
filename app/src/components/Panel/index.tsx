import { useEffect, useState, useContext } from "react";
import { SocketContext, UserContext } from "../../contexts";

import { NextTurnResponse } from "../../types";
import { Chat } from "../Chat";

const Panel = () => {
  const socket = useContext(SocketContext);
  const user = useContext(UserContext);

  const [isTurn, setIsTurn] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [currentWord, setCurrentWord] = useState("");

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
    <div>
      {isTurn && <p>{`Word to draw: ${currentWord}`}</p>}
      {isTurn ? (
        <p>Your turn</p>
      ) : (
        <p>{currentPlayer && `Turn of ${currentPlayer}`}</p>
      )}
      <button onClick={setNextTurn}>
        {currentPlayer ? "Next turn" : "Start"}
      </button>
      <Chat disabled={isTurn} />
    </div>
  );
};

export { Panel };
