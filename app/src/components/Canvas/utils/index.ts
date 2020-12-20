import { Point, Style } from "../types";

export const CanvasUtils = {
  getCoordinates: (
    canvas: HTMLCanvasElement,
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ): Point => {
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

  drawPath: (context: CanvasRenderingContext2D, path: Point[]) => {
    // TODO: fix
    if (!path[path.length - 2]) return;

    const lastPos = path[path.length - 2];
    const newPos = path[path.length - 1];

    context.beginPath();
    context.moveTo(lastPos.x, lastPos.y);
    context.lineTo(newPos.x, newPos.y);
    context.stroke();

    if (lastPos === newPos) context.fillRect(10, 10, 1, 1);
  },
};
