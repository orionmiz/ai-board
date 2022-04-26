import { makeObservable } from "mobx";
import StreakGame from "./StreakGame";

export default class TTT extends StreakGame {
  constructor() {
    super({
      name: "Tic Tac Toe",
      width: 3,
      height: 3,
      winAt: 3,
      boardType: "box"
    });
    makeObservable(this);
  }
}