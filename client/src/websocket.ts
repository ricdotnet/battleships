import { opponentAttackEvent } from './events';

export let connection: WebSocket;

export function websocket(ctx: CanvasRenderingContext2D) {
  connection = new WebSocket('ws://localhost:4001');

  connection.onopen = onOpen;
  connection.onmessage = (event: MessageEvent) => onMessage(event, ctx);
  connection.onerror = (event: Event) => onError(event);
  connection.onclose = (event: CloseEvent) => onClose(event);
}

// TODO: refactor this garbage
function onOpen() {
  console.log('websocket connection opened');
  const params = new URLSearchParams(window.location.search);
  connection.send(JSON.stringify({
    type: 'connection',
    gameId: params.get('id'),
    player: params.get('username'),
  }));
}

function onMessage(event: MessageEvent, ctx: CanvasRenderingContext2D) {
  const play: any = JSON.parse(event.data);
  if (play.type === 'hit') {
    opponentAttackEvent(ctx)(play);
  }
}

// @ts-expect-error
function onClose(event: CloseEvent) {
  // reconnect maybe?
}

// @ts-expect-error
function onError(event: Event) {
  // reconnect?
}
