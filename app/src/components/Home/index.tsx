import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Container, ButtonsContainer, Modal } from "./components";

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
    <>
      <Container>
        <input
          className="nes-input"
          placeholder="Enter your name"
          onChange={(event) => setUserName(event.target.value)}
          value={userName}
        />
        <ButtonsContainer>
          <button className="nes-btn is-primary">Host Game</button>
          <button
            className="nes-btn is-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Join Game
          </button>
        </ButtonsContainer>
      </Container>
      <Modal
        isOpen={isModalOpen}
        onOk={playHandler}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};

export { Home };
