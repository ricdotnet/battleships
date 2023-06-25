import { WebSocket } from 'ws';
import { Boat, IGame, PlayerState, Username } from '../types';

const games: IGame[] = [];

export function createGame(gameId: string, player: Username): Promise<void> {
  const game: IGame | undefined = games.find(g => +g.id === +gameId);

  if (game) {
    game.players.set(player, {
      connection: null,
      boats: [],
    });
    return Promise.resolve();
  }

  const players: Map<Username, PlayerState> = new Map();
  players.set(player, {
    connection: null,
    boats: [],
  });

  games.push({ id: gameId, players: players });

  return Promise.resolve();
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

export function hit(id: number, username: Username, cell: any): boolean {
  const game = getGame(id);

  let hit = false;
  game!.players.forEach((player, key) => {
    if (key !== username) {
      player.boats.forEach((boat: Boat) => {
        if (boat.orientation === 'hor' && cell.x >= boat.xPos && cell.x < boat.xPos + (30 * sizes[boat.type])
          && boat.yPos === cell.y) {
          hit = true;
        }

        if (boat.orientation === 'ver' && boat.xPos === cell.x
          && (cell.y >= boat.yPos && cell.y < boat.yPos + (30 * sizes[boat.type]))) {
          hit = true;
        }
      });
      player.connection?.send(JSON.stringify({ type: 'hit', hit: hit, cell: cell }));
    }
  });
  return hit;
}

export function addPlayer(id: string, username: Username, connection: WebSocket) {
  const game: IGame | undefined = getGame(+id);

  if (!game) throw new Error('game does not exist');

  const player: PlayerState | undefined = game.players.get(username);
  player!.connection = connection;
}
