import { request } from "./request";

export function home() {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    Enter your username:
    <input id="username">
    <br>
    <br>
    Enter the id for a game:
    <input id="game-id">
    <button id="join-game">Join game</button>
    <br>
    <br>
    or
    <br>
    <br>
    <button id="new-game">Start a new game</button>
  `;

  const username: HTMLInputElement | null = document.querySelector('#username');
  const joinGameButton: HTMLButtonElement | null = document.querySelector('#join-game');
  const newGameButton: HTMLButtonElement | null = document.querySelector('#new-game');

  joinGameButton!.addEventListener('click', async () => {
    if (!username!.value) return alert('Please enter a username');

    const gameId = document.querySelector<HTMLInputElement>('#game-id')!.value;
    if (!gameId) return alert('Please enter a game id to join');

    const payload: any = {
      gameId: gameId,
      player: username!.value,
    }

    await request('/start', payload, 'POST');

    location.href = `/game?id=${gameId}&username=${username!.value}`;
  });

  newGameButton!.addEventListener('click', async () => {
    if (!username!.value) return alert('Please enter a username');

    const gameId = Math.ceil(Math.random() * 999999);

    const payload: any = {
      gameId: gameId,
      player: username!.value,
    }

    await request('/start', payload, 'POST');

    location.href = `/game?id=${gameId}&username=${username!.value}`;
  });
}