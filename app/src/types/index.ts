export interface Player {
  id: string;
  name: string;
  isDrawing: boolean;
  score: number;
}

export interface Score {
  name: string;
  score: string;
}

export interface NextTurnResponse {
  playerDrawing: Player;
  nextWord: string;
  globalScores: Score[];
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
