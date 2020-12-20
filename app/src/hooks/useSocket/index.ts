import io from "socket.io-client";

const socket = io("http://192.168.1.43:8000");

export const useSocket = <T extends object>(
  event: string
): [(data: T) => void, (callback: (data: T) => void) => void] => {
  return [
    (data) => {
      socket.emit(event, data);
    },
    (callback) => {
      socket.on(event, callback);
    },
  ];
};
