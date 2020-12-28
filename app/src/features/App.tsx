import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { socket, SocketContext, UserContext } from "src/contexts";

import { Home } from "./Home";
import { Game } from "./Game";

const App = () => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const onPlay = (userName: string) => {
    setUserName(userName);
    socket.emit("join", userName);
  };

  useEffect(() => {
    socket.on("connect", () => {
      setUserId(socket.id);
    });
  }, []);

  return (
    <UserContext.Provider value={{ id: userId, name: userName }}>
      <SocketContext.Provider value={socket}>
        <Router>
          <Switch>
            <Route exact path="/" component={() => <Home onPlay={onPlay} />} />
            <Route path="/game" component={Game} />
          </Switch>
        </Router>
      </SocketContext.Provider>
    </UserContext.Provider>
  );
};

export { App };
