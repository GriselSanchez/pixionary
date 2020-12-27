import React from "react";
import io from "socket.io-client";

const API_URL = process.env.REACT_APP_API_URL || "http://192.168.1.43:3001";

const socket = io(API_URL);

const SocketContext = React.createContext<SocketIOClient.Socket>(socket);

export { SocketContext, socket };
