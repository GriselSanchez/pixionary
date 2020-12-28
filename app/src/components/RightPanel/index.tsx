import React, { useContext } from "react";

import { Chat } from "src/components";
import { SocketContext, GameContext } from "src/contexts";

import { ChatContainer, Container } from "./components";

const RightPanel: React.FC = () => {
  const { isTurn, currentPlayer, scores } = useContext(GameContext);
  const socket = useContext(SocketContext);

  const onNextTurn = () => {
    socket.emit("next-turn");
  };

  return (
    <Container>
      <ChatContainer>
        <Chat disabled={isTurn} />

        <button
          type="button"
          className="nes-btn is-success"
          onClick={onNextTurn}
        >
          {currentPlayer ? "Next Turn" : "Start"}
        </button>
      </ChatContainer>

      <div>
        {scores.map((score) => (
          <p key={score.name}>
            {score.name}:{score.score}
          </p>
        ))}
      </div>
    </Container>
  );
};

export { RightPanel };
