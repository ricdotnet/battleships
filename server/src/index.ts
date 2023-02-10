import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { initWebsocketServer } from './services/websocket';
import { createGame } from './services/games';

const app = express();
initWebsocketServer();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(4000, () => {
  console.log('server on and listening on:', 4000);

  // create a test game
  // createGame();
});
