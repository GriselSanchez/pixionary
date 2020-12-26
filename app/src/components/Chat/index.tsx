import React, { useEffect, useState, useContext } from "react";

import { SocketContext, UserContext } from "src/contexts";
import { ChatResponse } from "src/types";

import { MessagesContainer, InputContainer } from "./components";

interface Props {
  disabled?: boolean;
}

const Chat: React.FC<Props> = ({ disabled = false }) => {
  const socket = useContext(SocketContext);
  const user = useContext(UserContext);

  const [chats, setChats] = useState<ChatResponse[]>([]);
  const [currentInput, setCurrentInput] = useState("");

  const sendMessage = (message: string) => {
    socket.emit("chat", {
      text: message.toLowerCase(),
      name: user.name,
    });
    setCurrentInput("");
  };

  const onInputChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") sendMessage(event.currentTarget.value);
  };

  useEffect(() => {
    socket.on("chat", (chat: ChatResponse) => {
      setChats((prev) => [...prev, chat]);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <MessagesContainer>
        {chats.map((chat, index) => (
          <p
            key={index}
            style={{
              color: chat.name === user.id ? "red" : "black",
            }}
          >{`${chat.name}: ${chat.text}`}</p>
        ))}
      </MessagesContainer>

      <InputContainer>
        <input
          type="text"
          className="nes-input"
          placeholder="Chat"
          onKeyDown={onInputChange}
          onChange={(event) => setCurrentInput(event.currentTarget.value)}
          value={currentInput}
          disabled={disabled}
        />
        <button
          className="nes-btn is-warning"
          onClick={() => sendMessage(currentInput)}
        >
          Send
        </button>
      </InputContainer>
    </div>
  );
};

export { Chat };
