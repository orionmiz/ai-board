import { makeObservable } from "mobx";
import StreakGame from "./StreakGame";

export default class Gomoku extends StreakGame {
  constructor() {
    super({
      name: "Gomoku",
      width: 15,
      height: 15,
      winAt: 5,
      boardType: "cross",
    });
    makeObservable(this);
  }
}
