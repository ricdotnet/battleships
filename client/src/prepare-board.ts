import { ICell } from './types';
import { constants } from './constants';

interface PrepareBoardsReturn {
  cells: ICell[];
}

export function prepareBoard(): PrepareBoardsReturn {
  const cells: ICell[] = [];

  for (let i = 0; i < constants.BOARD_SIZE; i++) {
    for (let j = 0; j < constants.BOARD_SIZE; j++) {
      const x = constants.CELL_SIZE * j;
      const y = constants.CELL_SIZE * i;
      cells.push({ x: x, y: y, sq: `${i} - ${j}` });
    }
  }

  return { cells };
}

export function renderBoard(ctx: CanvasRenderingContext2D, cells: ICell[]) {
  for (let cell of cells) {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.strokeStyle = '#434348';
    ctx.strokeRect(cell.x, cell.y, constants.CELL_SIZE, constants.CELL_SIZE);
    ctx.fillRect(cell.x, cell.y, constants.CELL_SIZE, constants.CELL_SIZE);
  }
}
