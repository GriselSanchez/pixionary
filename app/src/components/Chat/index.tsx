import React, { useEffect, useState, useContext } from "react";
import { SocketContext, UserContext } from "../../contexts";

import { ChatResponse } from "../../types";

const Chat: React.FC<{ disabled?: boolean }> = ({ disabled = false }) => {
  const socket = useContext(SocketContext);
  const user = useContext(UserContext);

  const [chats, setChats] = useState<ChatResponse[]>([]);
  const [currentInput, setCurrentInput] = useState("");

  const onInputChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, currentTarget } = event;
    if (key === "Enter") {
      socket.emit("chat", {
        text: currentTarget.value.toLowerCase(),
        name: user.name,
      });
      setCurrentInput("");
    }
  };

  useEffect(() => {
    socket.on("chat", (chat: ChatResponse) => {
      setChats((prev) => [...prev, chat]);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
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
        disabled={disabled}
      />
    </div>
  );
};

export { Chat };
