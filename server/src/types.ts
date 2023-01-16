import { WebSocket } from 'ws';

export type Boat = {
  frontX: number;
  frontY: number;
  backX: number;
  backY: number;
}

export type PlayerState = {
  connection: WebSocket;
  boats: Boat[];
}

export interface IGame {
  id: string;
  players: Map<string, PlayerState>;
}

export interface IMessage {
  type: 'connection' | 'play';
  gameId: string;
  player: string;
}
