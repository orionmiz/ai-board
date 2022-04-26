import { makeAutoObservable } from "mobx";
import { GameType } from "./GameStore";

export default class ConfigStore {
  gameType: GameType = 'gomoku';

  constructor() {
    makeAutoObservable(this);
  }

  changeGame(game: GameType) {
    this.gameType = game;
  }
}