// import { websocket } from './websocket';
import { prepareBoard, renderBoard } from './prepare-board';
import { constants } from './constants';
import { clickEvent } from './events';
import { Context2D, HTMLCanvas } from './types';
import './assets/style.css';
import { Boat } from "./boat";

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
  <div>my boats here</div>
`;

const playerCanvas: HTMLCanvas = document.querySelector('#player');
const opponentCanvas: HTMLCanvas = document.querySelector('#opponent');

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

const boats: Boat[] = [];
boats.push(new Boat(0, 0, playerCtx));
boats.push(new Boat(0, 0, playerCtx));
boats.push(new Boat(0, 0, playerCtx));

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

let boat: Boat | undefined = undefined;
playerCanvas.addEventListener('mousedown', (e: MouseEvent) => {
  boats.forEach((b: Boat) => {
    if (b.x < e.offsetX && e.offsetX < b.x + b.resolveSize()
      && b.y < e.offsetY && e.offsetY < b.y + constants.CELL_SIZE && !boat) {
      boat = b;
    }
  });
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
