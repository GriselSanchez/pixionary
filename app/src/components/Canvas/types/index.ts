import { Point } from "src/types";

export interface Path {
  start: Point;
  end: Point;
}

export interface Style {
  color: string;
  width: number;
}

export enum TypeEnum {
  Width = "width",
  Color = "color",
}

export interface SocketResponse {
  path: Path;
  style: Style;
}
