import { CurrentTurn, GameState } from "./types";

export class GameStore {
  private static _gameStore: GameStore | undefined = undefined;

  private _state: GameState;

  constructor(state: GameState) {
    if (!GameStore._gameStore) {
      GameStore._gameStore = new GameStore({ currentTurn: 'player' });
    }

    this._state = state;
  }

  static getStore() {
    return this._gameStore;
  }

  setCurrentTurn(turn: CurrentTurn) {
    this._state.currentTurn = turn;
  }

  getCurrentTurn(): CurrentTurn {
    return this._state.currentTurn;
  }
}
