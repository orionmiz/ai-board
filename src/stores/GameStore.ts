import Gomoku from "~/lib/game/Gomoku";
import TTT from "~/lib/game/TTT";

export type GameType = keyof GameStore;

export default class GameStore {
  ttt: TTT;
  gomoku: Gomoku;

  constructor() {
    this.ttt = new TTT();
    this.gomoku = new Gomoku();
  }
}
