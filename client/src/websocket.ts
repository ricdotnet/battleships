import { opponentAttackEvent } from './events';
import { ICell } from './types';

export let connection: WebSocket;

export function websocket(ctx: CanvasRenderingContext2D) {
  connection = new WebSocket('ws://localhost:4001');

  connection.onopen = onOpen;
  connection.onmessage = (event: MessageEvent) => onMessage(event, ctx);
}

// TODO: refactor this garbage
function onOpen() {
  console.log('websocket connection opened');
  const params = new URLSearchParams(window.location.search);
  connection.send(JSON.stringify({
    type: 'connection',
    gameId: 'game1',
    player: params.get('player'),
  }));
}

function onMessage(event: MessageEvent, ctx: CanvasRenderingContext2D) {
  const play: ICell = JSON.parse(event.data);
  opponentAttackEvent(ctx)(play);
}
