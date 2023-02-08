import { ICell } from './types';
import { constants } from './constants';
import { request } from './request';

export function clickEvent(element: HTMLCanvasElement, ctx: CanvasRenderingContext2D, cells: ICell[]) {
  element.addEventListener('click', (e: MouseEvent) => {
    const cell: ICell | undefined = findCell(e.offsetX, e.offsetY, cells);
    if ( cell ) {
      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.fillRect(cell.x, cell.y, constants.CELL_SIZE, constants.CELL_SIZE);

      // TODO: globalize the username
      const params = new URLSearchParams(window.location.search);
      void request(cell, params.get('player')!);
    }
  });
}

export function opponentAttackEvent(ctx: CanvasRenderingContext2D) {
  return function (play: ICell) {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(play.x, play.y, constants.CELL_SIZE, constants.CELL_SIZE);
  };
}

function findCell(offsetX: number, offsetY: number, cells: ICell[]): ICell | undefined {
  return cells.find((cell: any) =>
    offsetX > cell.x + constants.GAP &&
    offsetX < cell.x + constants.CELL_SIZE + constants.GAP &&
    offsetY > cell.y + constants.GAP &&
    offsetY < cell.y + constants.CELL_SIZE + constants.GAP
  );
}
