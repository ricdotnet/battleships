import { IncomingMessage } from 'http';
import { RawData, WebSocket, WebSocketServer } from 'ws';
import { addPlayer } from './games';

export function initWebsocketServer() {
  const websocketServer = new WebSocketServer({ port: 4001 });

  websocketServer.on('connection', onConnect);
}

function onConnect(connection: WebSocket, request: IncomingMessage) {
  connection.on('message', (rawData: RawData) => onMessage(connection, rawData, request));
}

function onMessage(connection: WebSocket, rawData: RawData, request: IncomingMessage) {
  const data: IMessage = JSON.parse(rawData.toString());

  if ( data.type === 'connection' ) {
    addPlayer(data.gameId, data.player, connection);
    connection.send(JSON.stringify({ message: 'connected to the game' }));
  }
}

interface IMessage {
  type: 'connection' | 'play';
  gameId: string;
  player: string;
}
