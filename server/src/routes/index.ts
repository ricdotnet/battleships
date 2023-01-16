import { Request, Response, Router } from 'express';
import { getGame } from '../services/games';
import { IGame, PlayerState } from '../types';

export const routes = Router();

routes.post('/play', (req: Request, res: Response) => {
  const { gameId, player, cell } = req.body;
  const game: IGame | undefined = getGame(gameId);

  if ( !game ) return res.status(404).send({ code: 404, message: 'game not found' });

  game.players.forEach((value: PlayerState, key: string) => {
    if ( key !== player ) {
      value.connection.send(JSON.stringify(cell));
    }
  });
});
