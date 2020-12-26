import { Point } from "src/types";

import { Style, Path } from "../types";

export const CanvasUtils = {
  getNewPosition: (canvas: HTMLCanvasElement, event: MouseEvent): Point => {
    const { top, left } = canvas.getBoundingClientRect();
    const x = event.pageX - left;
    const y = event.pageY - top;

    return { x, y };
  },

  styleContext: (context: CanvasRenderingContext2D, style: Style) => {
    context.lineCap = "round";

    context.lineWidth = style.width;
    context.strokeStyle = style.color;

    return context;
  },

  drawPath: (context: CanvasRenderingContext2D, { start, end }: Path) => {
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();

    if (start === end) context.fillRect(10, 10, 1, 1);
  },
};
