export type Routes = '/' | '/game';

type Route = {
  [key in Routes]: string;
};

const routes: Route = {
  '/': 'home',
  '/game': 'game',
};

export { routes };