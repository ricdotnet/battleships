import { ICell } from './types';
import { constants } from './constants';
import { request } from './request';

export function clickEvent(element: HTMLCanvasElement, ctx: CanvasRenderingContext2D, cells: ICell[]) {
  element.addEventListener('click', async (e: MouseEvent) => {
    const cell: ICell | undefined = findCell(e.offsetX, e.offsetY, cells);
    if ( cell ) {
      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.fillRect(cell.x, cell.y, constants.CELL_SIZE, constants.CELL_SIZE);

      // TODO: globalize the username
      const params = new URLSearchParams(window.location.search);
      const payload = {
        gameId: params.get('id'),
        player: params.get('username'),
        cell: cell,
      }
      await request('/hit', payload, 'POST');
    }
  });
}

export function opponentAttackEvent(ctx: CanvasRenderingContext2D) {
  return function (play: any) {
    ctx.beginPath();
    ctx.fillStyle = (play.hit) ? 'green' : 'red';
    ctx.fillRect(play.cell.x, play.cell.y, constants.CELL_SIZE, constants.CELL_SIZE);
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
