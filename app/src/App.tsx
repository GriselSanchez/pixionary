import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Canvas, Chat } from "./components";
import { socket, SocketContext, UserContext } from "./contexts";

function App() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

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
            <Route
              exact
              path="/"
              render={({ history }) => (
                <div>
                  <input
                    placeholder="Enter your name"
                    onChange={(event) => setUserName(event.target.value)}
                    value={userName}
                  />
                  <button
                    onClick={() => {
                      socket.emit("join", userName);
                      history.push("/game");
                    }}
                  >
                    Play
                  </button>
                </div>
              )}
            ></Route>
            <Route path="/game">
              <Canvas />
              <Chat />
            </Route>
          </Switch>
        </Router>
      </SocketContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
