import { Request, Response, Router } from 'express';
import { createGame, getGame, hit } from '../services/games';
import { IGame, PlayerState, Username } from '../types';

export const routes = Router();

routes.get('/:gameId', async (req: Request, res: Response) => {
  const { gameId } = req.params;
  const { username } = req.query;

  const game: IGame | undefined = getGame(+gameId);

  if (!game) return res.status(404).send('game does not exist');

  const player: PlayerState | undefined = game.players.get(username as Username);

  if (!player) return res.status(404).send('player is not on this game');

  return res.status(200).send({
    gameId: game.id,
    player: player
  });
});

routes.post('/start', async (req: Request, res: Response) => {
  const { gameId, player } = req.body;

  try {
    await createGame(gameId, player);
    return res.status(200).send('game created');
  } catch(e) {
    return res.status(400).send(e);
  }
});

routes.post('/play', (req: Request, res: Response) => {
  const { gameId, player, boats } = req.body;
  const game: IGame | undefined = getGame(+gameId);

  if ( !game ) return res.status(404).send('game does not exist');

  if (!game.players.has(player)) return res.status(400).send('player is not on this game');

  game.players.get(player)!.boats = boats;

  return res.status(200).send('game started');
});

routes.post('/hit', (req: Request, res: Response) => {
  const { gameId, player, cell } = req.body;

  const _hit = hit(+gameId, player, cell);

  res.send({ hit: _hit });
});
