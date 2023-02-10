import { Routes, routes } from './routes';
import { home } from './home';
import { game } from './game';

const route = routes[location.pathname as Routes];

if (route === 'home') {
  home();
}

if (route === 'game') {
  game();
}