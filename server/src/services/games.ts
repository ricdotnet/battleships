import { WebSocket } from 'ws';
import { IGame } from '../types';

const games: IGame[] = [];

export function createGame() {
  const game: IGame | undefined = games.find(g => g.id === 'game1');

  if ( !game ) {
    games.push({ id: 'game1', players: new Map() });
  }
}

export function getGame(id: string): IGame | undefined {
  return games.find(g => g.id === id);
}

export function addPlayer(id: string, player: string, connection: WebSocket) {
  const game: IGame | undefined = getGame(id);

  if ( !game ) throw new Error('game not found?');

  game.players.set(player, connection);
}
