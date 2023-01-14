import { BoardType, ICell } from './types';
import { request } from './request';

const BOARD_SIZE = 20;
const GAP = 3;
const CELL_SIZE = 15;
const CANVAS_SIZE = (BOARD_SIZE * CELL_SIZE) + (BOARD_SIZE * GAP) - GAP;

export function prepareBoards(element: HTMLCanvasElement, board: BoardType) {
  if ( !element ) throw new Error('no canvas passed in');

  element.width = CANVAS_SIZE;
  element.height = CANVAS_SIZE;

  const c: CanvasRenderingContext2D | null = element.getContext('2d');

  if ( !c ) throw new Error('no canvas context found');

  const cells: ICell[] = [];

  for ( let i = 0; i < BOARD_SIZE; i++ ) {
    for ( let j = 0; j < BOARD_SIZE; j++ ) {
      const x = (CELL_SIZE * j) + (j * GAP);
      const y = (CELL_SIZE * i) + (i * GAP);
      c.beginPath();
      c.fillStyle = 'black';
      c.fillRect(x, y, CELL_SIZE, CELL_SIZE);
      cells.push({ x: x, y: y, sq: `${i} - ${j}` });
    }
  }

  if ( board === 'opponent' ) {
    element.addEventListener('click', (e: MouseEvent) => {
      const cell: ICell | undefined = cells.find((cell: any) => {
        return (e.offsetX > cell.x + GAP)
          && (e.offsetX < cell.x + CELL_SIZE + GAP)
          && (e.offsetY > cell.y + GAP)
          && (e.offsetY < cell.y + CELL_SIZE + GAP);
      });
      if ( cell ) {
        c.beginPath();
        c.fillStyle = 'red';
        c.fillRect(cell.x, cell.y, CELL_SIZE, CELL_SIZE);
        request(cell);
      }
    });
  }
}
