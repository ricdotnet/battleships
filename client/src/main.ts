import { prepareBoards } from './prepare-boards';
import { constants } from './constants';
import './assets/style.css';
import { clickEvent, opponentAttackEvent } from './events';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas id="player" class="canvas"></canvas>
    <canvas id="opponent" class="canvas"></canvas>
  </div>
`;

const playerCanvas: HTMLCanvasElement | null = document.querySelector('#player');
const opponentCanvas: HTMLCanvasElement | null = document.querySelector('#opponent');

if ( !playerCanvas || !opponentCanvas ) {
  throw new Error('some canvas was not generated');
}

const playerCtx: CanvasRenderingContext2D | null = playerCanvas.getContext('2d');
const opponentCtx: CanvasRenderingContext2D | null = opponentCanvas.getContext('2d');

if ( !playerCtx || !opponentCtx ) {
  throw new Error('some context is not available');
}

playerCanvas.width = constants.CANVAS_SIZE;
playerCanvas.height = constants.CANVAS_SIZE;

opponentCanvas.width = constants.CANVAS_SIZE;
opponentCanvas.height = constants.CANVAS_SIZE;

prepareBoards(playerCtx);
const opponentBoard = prepareBoards(opponentCtx);

clickEvent(opponentCanvas, opponentCtx, opponentBoard.cells);
// opponentAttackEvent(playerCtx)({ x: 0, y: 0, sq: 'hi' });
