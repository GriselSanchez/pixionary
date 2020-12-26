import { useContext, useEffect, useRef, useState } from "react";

import { Style, SocketResponse } from "../../types";
import { CanvasUtils } from "../../utils";
import { SocketContext, UserContext } from "../../../../contexts";
import { NextTurnResponse, Point } from "../../../../types";

const { styleContext, getNewPosition, drawPath } = CanvasUtils;

export const useCanvas = (style: Style) => {
  const user = useContext(UserContext);
  const socket = useContext(SocketContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isDrawingMode, setIsDrawingMode] = useState(false);

  useEffect(() => {
    let lastPos: Point = { x: 0, y: 0 };

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const draw = (event: MouseEvent) => {
      const styledContext = styleContext(context, style);
      const newPos = getNewPosition(canvas, event);
      const path = { start: lastPos, end: newPos };
      console.log(newPos);
      drawPath(styledContext, path);
      socket.emit("draw", { path, style });

      return newPos;
    };

    canvas.addEventListener("mousedown", (event) => {
      lastPos = getNewPosition(canvas, event);
    });

    canvas.addEventListener("mousemove", (event) => {
      if (event.buttons !== 1) return;
      lastPos = draw(event);
    });

    socket.on("draw", ({ path, style }: SocketResponse) => {
      const styledContext = styleContext(context, style);
      drawPath(styledContext, path);
    });

    socket.on("next-turn", ({ playerDrawing }: NextTurnResponse) => {
      setIsDrawingMode(playerDrawing.id === user.id);
      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  }, [style, socket, user]);

  return { canvasRef, isDrawingMode };
};
