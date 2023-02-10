import { websocket } from './websocket';
import { prepareBoard, renderBoard } from './prepare-board';
import { constants } from './constants';
import { clickEvent } from './events';
import { Context2D, HTMLCanvas } from './types';
import { SmallBoat, MediumBoat, LargeBoat } from "./boat";
import './assets/style.css';
import { request } from './request';

export function game() {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="boards">
      <div class="labels-h">
        <span class="item">A</span>
        <span class="item">B</span>
        <span class="item">C</span>
        <span class="item">D</span>
        <span class="item">E</span>
        <span class="item">F</span>
        <span class="item">G</span>
        <span class="item">H</span>
        <span class="item">I</span>
        <span class="item">J</span>
      </div>
      <div class="labels-v">
        <span class="item">1</span>
        <span class="item">2</span>
        <span class="item">3</span>
        <span class="item">4</span>
        <span class="item">5</span>
        <span class="item">6</span>
        <span class="item">7</span>
        <span class="item">8</span>
        <span class="item">9</span>
        <span class="item">10</span>
      </div>
      <canvas id="player" class="canvas"></canvas>
      <canvas id="opponent" class="canvas"></canvas>
    </div>
    <button type="button" id="play">Play</button>
  `;

  const playerCanvas: HTMLCanvas = document.querySelector('#player');
  const opponentCanvas: HTMLCanvas = document.querySelector('#opponent');
  const playButton: HTMLButtonElement | null = document.querySelector('#play');

  if (!playerCanvas || !opponentCanvas) {
    throw new Error('some canvas was not generated');
  }

  const playerCtx: Context2D = playerCanvas.getContext('2d');
  const opponentCtx: Context2D = opponentCanvas.getContext('2d');

  if (!playerCtx || !opponentCtx) {
    throw new Error('some context is not available');
  }

  playerCanvas.width = constants.CANVAS_SIZE;
  playerCanvas.height = constants.CANVAS_SIZE;

  opponentCanvas.width = constants.CANVAS_SIZE;
  opponentCanvas.height = constants.CANVAS_SIZE;

  const { cells } = prepareBoard();

  clickEvent(opponentCanvas, opponentCtx, cells);

  renderBoard(playerCtx, cells);
  renderBoard(opponentCtx, cells);

  const boats: any[] = [];
  boats.push(new LargeBoat(0, 0, 'hor', playerCtx));
  boats.push(new LargeBoat(0, 0, 'ver', playerCtx));
  boats.push(new MediumBoat(0, 0, 'hor', playerCtx));
  boats.push(new MediumBoat(0, 0, 'ver', playerCtx));
  boats.push(new SmallBoat(0, 0, 'hor', playerCtx));
  boats.push(new SmallBoat(0, 0, 'hor', playerCtx));

  function render() {
    playerCtx!.clearRect(0, 0, constants.BOARD_SIZE, constants.CANVAS_SIZE);
    opponentCtx!.clearRect(0, 0, constants.BOARD_SIZE, constants.CANVAS_SIZE);
    renderBoard(playerCtx!, cells);
    renderBoard(opponentCtx!, cells);
    for (let boat of boats) {
      boat.render();
    }
  }

  render();

  // TODO: Extract this
  let canPlace = true;
  let boat: any = undefined;
  playerCanvas.addEventListener('mousedown', (e: MouseEvent) => {
    if (!canPlace) return;
    boat = findBoat(e.offsetX, e.offsetY);
  });

  playerCanvas.addEventListener('mouseup', () => {
    if (boat) {
      boat = undefined;
    }
  });

  playerCanvas.addEventListener('mousemove', (e: MouseEvent) => {
    if (boat) {
      boat.x = Math.floor(e.offsetX / constants.CELL_SIZE) * constants.CELL_SIZE;
      boat.y = Math.floor(e.offsetY / constants.CELL_SIZE) * constants.CELL_SIZE;
      render();
    }
  });

  function findBoat(offsetX: number, offsetY: number) {
    let boat: any = undefined;
    for (let i = boats.length - 1; i >= 0; i--) {
      if (boats[i].x < offsetX && offsetX < boats[i].x + (boats[i].ori === 'hor' ? boats[i].resolveSize() : constants.CELL_SIZE)
        && boats[i].y < offsetY && offsetY < boats[i].y + (boats[i].ori === 'ver' ? boats[i].resolveSize() : constants.CELL_SIZE)
        && !boat) {
        boat = boats[i];
        break;
      }
    }

    return boat;
  }

  playButton!.addEventListener('click', async () => {
    const params = new URLSearchParams(location.search);

    const payload = {
      gameId: params.get('id'),
      player: params.get('username'),
      boats: boats,
    }

    canPlace = false;

    await request('/play', payload, 'POST');

    websocket(playerCtx);
  });
}
