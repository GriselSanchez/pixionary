import { Point, Style } from "src/types";

export interface Path {
  start: Point;
  end: Point;
}

export interface SocketResponse {
  path: Path;
  style: Style;
}
