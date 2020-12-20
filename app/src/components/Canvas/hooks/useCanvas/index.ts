import { useEffect, useRef } from "react";
import io from "socket.io-client";

import { Point, Style, SocketResponse } from "../../types";
import { CanvasUtils } from "../../utils";

const socket = io("http://192.168.1.43:8000");

const { styleContext, getNewPosition, drawPath } = CanvasUtils;

export const useCanvas = (style: Style, drawingMode: boolean) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

      drawPath(styledContext, path);
      socket.emit("draw", { path, style });

      return newPos;
    };

    console.log("1" + drawingMode);

    canvas.addEventListener("mousedown", (event) => {
      console.log("2" + drawingMode);

      if (!drawingMode) return;
      lastPos = getNewPosition(canvas, event);
    });

    canvas.addEventListener("mousemove", (event) => {
      if (event.buttons !== 1 || !drawingMode) return;
      lastPos = draw(event);
    });

    socket.on("draw", ({ path, style }: SocketResponse) => {
      const styledContext = styleContext(context, style);
      drawPath(styledContext, path);
    });
  }, [style, drawingMode]);

  return canvasRef;
};
