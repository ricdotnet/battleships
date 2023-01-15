import { ICell } from './types';

export function request(cell: ICell, player: string) {
  return fetch('http://localhost:4000/play', {
    method: 'post',
    body: JSON.stringify({
      gameId: 'game1',
      player: player,
      cell: cell,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });
}
