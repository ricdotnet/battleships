import { websocket } from './websocket';
import { prepareBoards } from './prepare-boards';
import { constants } from './constants';
import { clickEvent } from './events';
import { Context2D, HTMLCanvas } from './types';
import './assets/style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas id="player" class="canvas"></canvas>
    <canvas id="opponent" class="canvas"></canvas>
  </div>
`;

const playerCanvas: HTMLCanvas = document.querySelector('#player');
const opponentCanvas: HTMLCanvas = document.querySelector('#opponent');

if ( !playerCanvas || !opponentCanvas ) {
  throw new Error('some canvas was not generated');
}

const playerCtx: Context2D = playerCanvas.getContext('2d');
const opponentCtx: Context2D = opponentCanvas.getContext('2d');

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

websocket(playerCtx);
