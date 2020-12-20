import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://192.168.1.43:8000");

const Chat = () => {
  const [text, setText] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");

  const onInputChange = ({
    key,
    currentTarget,
  }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      socket.emit("chat", { text: currentTarget.value });
      setCurrentInput("");
    }
  };

  const setNextTurn = () => {
    socket.emit("next-turn");
  };

  useEffect(() => {
    socket.on("chat", (data: { text: string }) =>
      setText((prev) => [...prev, data.text])
    );
  }, []);

  return (
    <div>
      {text.map((t) => (
        <p>{t}</p>
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
