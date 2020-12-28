import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Container,
  ButtonsContainer,
  RoomCode,
  StyledTitle,
} from "./components";

interface Props {
  onPlay: (userName: string) => void;
}

const Home: React.FC<Props> = ({ onPlay }) => {
  const { push } = useHistory();
  const [userName, setUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const playHandler = () => {
    setIsModalOpen(false);
    push("/game");
    onPlay(userName);
  };

  return (
    <div>
      <StyledTitle>Pixionary</StyledTitle>
      <Container className="nes-container is-rounded">
        <input
          className="nes-input"
          placeholder="Enter your name"
          onChange={(event) => setUserName(event.target.value)}
          value={userName}
          spellCheck="false"
        />
        <ButtonsContainer>
          <button className="nes-btn is-warning">Host Game</button>
          <button
            className="nes-btn is-warning"
            onClick={() => setIsModalOpen(true)}
          >
            Join Game
          </button>
        </ButtonsContainer>
      </Container>
      <RoomCode
        isOpen={isModalOpen}
        onOk={playHandler}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export { Home };
