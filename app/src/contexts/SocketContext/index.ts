import React from "react";
import io from "socket.io-client";

// TODO: get from config
const socket = io("http://192.168.1.43:3001");

const SocketContext = React.createContext<SocketIOClient.Socket>(socket);

export { SocketContext, socket };
