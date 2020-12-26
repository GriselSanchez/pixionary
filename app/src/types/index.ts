export interface Player {
  id: string;
  name: string;
  isDrawing: boolean;
}

export interface NextTurnResponse {
  playerDrawing: Player;
  nextWord: string;
}

export interface ChatResponse {
  text: string;
  name: string;
}

export interface Point {
  x: number;
  y: number;
}

export enum CanvasTypeEnum {
  Normal = "normal",
  PixelArt = "pixel-art",
}

export interface Style {
  color: string;
  width: number;
}
