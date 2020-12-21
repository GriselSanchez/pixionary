export interface Player {
  id: string;
  isDrawing: boolean;
}

export interface NextTurnResponse {
  playerDrawing: Player;
}

export interface ChatResponse {
  text: string;
  name: string;
}
