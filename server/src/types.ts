import { WebSocket } from 'ws';

type Type = 'small' | 'medium' | 'large';
type Orientation = 'ver' | 'hor';

export type Boat = {
  xPos: number;
  yPos: number;
  type: Type;
  orientation: Orientation;
}

export type PlayerState = {
  connection: WebSocket | null;
  boats: Boat[];
}

export type Username = string;

export interface IGame {
  id: string;
  players: Map<Username, PlayerState>;
}

export interface IMessage {
  type: 'connection' | 'play';
  gameId: string;
  player: string;
}
