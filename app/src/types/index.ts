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
