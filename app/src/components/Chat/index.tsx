import React, { useEffect, useState, useContext } from "react";
import { SocketContext, UserContext } from "../../contexts";

import { ChatResponse, NextTurnResponse } from "../../types";

const Chat = () => {
  const socket = useContext(SocketContext);
  const user = useContext(UserContext);

  const [chats, setChats] = useState<ChatResponse[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isTurn, setIsTurn] = useState(false);

  const onInputChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, currentTarget } = event;
    if (key === "Enter") {
      socket.emit("chat", { text: currentTarget.value, name: user.name });
      setCurrentInput("");
    }
  };

  const setNextTurn = () => {
    socket.emit("next-turn");
  };

  useEffect(() => {
    socket.on("chat", (chat: ChatResponse) => {
      setChats((prev) => [...prev, chat]);
    });

    socket.on("next-turn", ({ playerDrawing }: NextTurnResponse) => {
      setIsTurn(playerDrawing.id === user.id);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isTurn && <p>Tu turno</p>}
      {chats.map((chat, index) => (
        <p
          key={index}
          style={{
            color: chat.name === user.id ? "red" : "black",
          }}
        >{`${chat.name}: ${chat.text}`}</p>
      ))}
      <input
        placeholder="Chat"
        onKeyDown={onInputChange}
        onChange={(event) => setCurrentInput(event.currentTarget.value)}
        value={currentInput}
      />
      <button onClick={setNextTurn}>Next turn</button>
    </div>
  );
};

export { Chat };
