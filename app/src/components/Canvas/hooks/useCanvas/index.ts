import { Point, Style } from "../../types";
import { CanvasUtils } from "../../utils";
import io from "socket.io-client";
import { useEffect } from "react";
const socket = io("http://192.168.1.43:8000");

const { styleContext, getCoordinates, drawPath } = CanvasUtils;

export const useCanvas = (style: Style) => {
  const path: Point[] = [];

  const draw = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const { currentTarget: canvas, buttons } = event;

    if (buttons !== 1) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const styledContext = styleContext(context, style);
    addNewPosition(event);

    drawPath(styledContext, path);

    socket.emit("mouse", { path });
  };

  const addNewPosition = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const newPos = getCoordinates(event.currentTarget, event);
    path.push(newPos);
  };

  useEffect(() => {
    socket.on("mouse", (data: any) => console.log(data));
  }, [path]);

  return { draw, addNewPosition };
};
