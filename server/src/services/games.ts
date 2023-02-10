import { WebSocket } from 'ws';
import { IGame, PlayerState, Username, Boat } from '../types';

const games: IGame[] = [];

export function createGame(gameId: string, player: Username): Promise<string> {
  const game: IGame | undefined = games.find(g => +g.id === +gameId);

  if (game) {
    game.players.set(player, {
      connection: null,
      boats: [],
    });
    console.log(game);
    return Promise.resolve('game joined');
  }

  const players: Map<Username, PlayerState> = new Map();
  players.set(player, {
    connection: null,
    boats: [],
  });

  games.push({ id: gameId, players: players });

  return Promise.resolve('game created');
}

export function getGame(id: number): IGame | undefined {
  return games.find(g => +g.id === id);
}

// we assume there is a game so no checks for that atm
const sizes = {
  'small': 1,
  'medium': 3,
  'large': 5,
}

export function hit(id: number, username: Username, cell: any): void {
  const game = getGame(id);

  let oppo: any;
  game!.players.forEach((p: PlayerState, key: Username) => {
    if (key !== username) oppo = p;
  });
  let hit = false;
  oppo!.boats.forEach((boat: Boat) => {
    if (boat.xPos === cell.x * sizes[boat.type] && boat.yPos === cell.y * sizes[boat.type]) {
      hit = true;
    }
  });
  oppo!.connection!.send(JSON.stringify({ type: 'hit', hit: hit, cell: cell }));
}

export function addPlayer(id: string, username: Username, connection: WebSocket) {
  const game: IGame | undefined = getGame(+id);

  if ( !game ) throw new Error('game does not exist');

  const player: PlayerState | undefined = game.players.get(username);
  player!.connection = connection;
}
