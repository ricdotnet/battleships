import { CurrentTurn, GameState } from "./types";

class GameStore {
  private _state: GameState;

  constructor(state: GameState) {
    this._state = state;
  }

  setCurrentTurn(turn: CurrentTurn) {
    this._state.currentTurn = turn;
  }

  getCurrentTurn(): CurrentTurn {
    return this._state.currentTurn;
  }
}

export const gameStore = new GameStore({ currentTurn: 'player' });
