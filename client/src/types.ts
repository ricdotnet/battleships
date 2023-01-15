export type BoardType = 'player' | 'opponent';
export type HTMLCanvas = HTMLCanvasElement | null;
export type Context2D = CanvasRenderingContext2D | null;

export interface ICell {
  x: number;
  y: number;
  sq: string;
}

