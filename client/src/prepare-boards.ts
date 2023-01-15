import { ICell } from './types';
import { constants } from './constants';

export function prepareBoards(ctx: CanvasRenderingContext2D) {
  const cells: ICell[] = [];

  for ( let i = 0; i < constants.BOARD_SIZE; i++ ) {
    for ( let j = 0; j < constants.BOARD_SIZE; j++ ) {
      const x = constants.CELL_SIZE * j + j * constants.GAP;
      const y = constants.CELL_SIZE * i + i * constants.GAP;
      ctx.beginPath();
      ctx.fillStyle = 'black';
      ctx.fillRect(x, y, constants.CELL_SIZE, constants.CELL_SIZE);
      cells.push({ x: x, y: y, sq: `${i} - ${j}` });
    }
  }

  return { cells };
}
