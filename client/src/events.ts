import { ICell } from './types';
import { constants } from './constants';
import { request } from './request';
import { gameStore } from "./game-store";

export function clickEvent(element: HTMLCanvasElement, ctx: CanvasRenderingContext2D, cells: ICell[]) {
  element.addEventListener('click', async (e: MouseEvent) => {
    const cell: ICell | undefined = findCell(e.offsetX, e.offsetY, cells);

    console.log('current turn:', gameStore.getCurrentTurn());

    if ( cell && gameStore?.getCurrentTurn() === 'player' ) {
      // TODO: globalize the username
      const params = new URLSearchParams(window.location.search);
      const payload = {
        gameId: params.get('id'),
        player: params.get('username'),
        cell: cell,
      }
      const response = await request('/hit', payload, 'POST');
      const { hit } = await response.json();

      ctx.beginPath();
      ctx.fillStyle = hit ? 'green' : 'red';
      ctx.fillRect(cell.x + 10, cell.y + 10, constants.CELL_SIZE - 20, constants.CELL_SIZE - 20);

      gameStore.setCurrentTurn('opponent');
      console.log('updated current turn:', gameStore.getCurrentTurn());
    }
  });
}

export function opponentAttackEvent(ctx: CanvasRenderingContext2D) {
  return function (play: any) {

    gameStore.setCurrentTurn('player');
    console.log('updated current turn:', gameStore.getCurrentTurn());

    ctx.beginPath();
    ctx.fillStyle = (play.hit) ? 'green' : 'red';
    ctx.fillRect(play.cell.x + 10, play.cell.y + 10, constants.CELL_SIZE - 20, constants.CELL_SIZE - 20);
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
