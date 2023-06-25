export type BoardType = 'player' | 'opponent';
export type HTMLCanvas = HTMLCanvasElement | null;
export type Context2D = CanvasRenderingContext2D | null;
export type CurrentTurn = 'player' | 'opponent';

export interface GameState {
  currentTurn: CurrentTurn;
}

export interface ICell {
  x: number;
  y: number;
  sq: string;
}
