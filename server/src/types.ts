import { WebSocket } from 'ws';

export interface IGame {
  id: string;
  players: Map<string, WebSocket>;
}
