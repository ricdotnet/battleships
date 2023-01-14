import './style.css';
import { prepareBoards } from './prepare-boards';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas id="player" class="canvas"></canvas>
    <canvas id="opponent" class="canvas"></canvas>
  </div>
`;

prepareBoards(document.querySelector('#player')!, 'player');
prepareBoards(document.querySelector('#opponent')!, 'opponent');
