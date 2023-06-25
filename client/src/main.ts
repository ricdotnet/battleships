import { Routes, routes } from './routes';
import { home } from './home';
import { game } from './game';

const route = routes[location.pathname as Routes];

switch (route) {
  case 'home':
    home();
    break;
  case 'game':
    game();
    break;
}
