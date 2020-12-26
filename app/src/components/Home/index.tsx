import React, { useState } from "react";
import { useHistory } from "react-router-dom";

interface Props {
  onPlay: (userName: string) => void;
}

const Home: React.FC<Props> = ({ onPlay }) => {
  const { push } = useHistory();
  const [userName, setUserName] = useState("");

  return (
    <div>
      <input
        type="text"
        className="nes-input"
        placeholder="Enter your name"
        onChange={(event) => setUserName(event.target.value)}
        value={userName}
      />
      <button
        type="button"
        className="nes-btn is-primary"
        onClick={() => {
          push("/game");
          onPlay(userName);
        }}
      >
        Play
      </button>
    </div>
  );
};

export { Home };
