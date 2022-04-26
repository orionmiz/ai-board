import ConfigStore from "./ConfigStore";
import GameStore from "./GameStore";

export default class RootStore {
  game: GameStore;
  config: ConfigStore;

  constructor() {
    this.game = new GameStore();
    this.config = new ConfigStore();
  }
}
