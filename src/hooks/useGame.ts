import { GameType } from "~/stores/GameStore";
import useConfig from "./useConfig";
import useStores from "./useStores";

export default function useGame(type?: GameType) {
  const { game } = useStores();
  const config = useConfig();

  if (!type) {
    type = config.gameType;
  }

  return game[type];
}
