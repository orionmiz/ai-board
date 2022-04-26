import useConfig from "~/hooks/useConfig";
import useGame from "../hooks/useGame";
import { PlayerColor } from "~/lib/game";
import { GameType } from "~/stores/GameStore";
import useStores from "~/hooks/useStores";
import { observer } from "mobx-react-lite";

function Config() {
  const config = useConfig();
  const game = useGame();
  const { game: games } = useStores();

  return (
    <>
      <div className="config">
        <select
          value={config.gameType}
          onChange={(e) => config.changeGame(e.target.value as GameType)}
        >
          {Object.keys(games).map((type) => (
            <option key={type} value={type}>
              {games[type as GameType].name}
            </option>
          ))}
        </select>
        <div className="color-select">
          <span>{'Player uses: '}</span>
          <label>
            <input
              type="radio"
              name="color"
              value="black"
              checked={game.playerColor === PlayerColor.Black}
              onChange={() => game.toggleColor(PlayerColor.Black)}
              disabled={game.state !== "idle"}
            />
            Black
          </label>
          <label>
            <input
              type="radio"
              name="color"
              value="white"
              checked={game.playerColor === PlayerColor.White}
              onChange={() => game.toggleColor(PlayerColor.White)}
              disabled={game.state !== "idle"}
            />
            White
          </label>
        </div>
        <div className="buttons">
          <button onClick={() => game.stepBack()} disabled={game.lastPlayerMove === null}>
            Back
          </button>
          <button onClick={() => game.clear()}>
            Clear
          </button>
        </div>
      </div>
      <style jsx>{`
        .config {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
        }
        label {
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .color-select {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .buttons {
          display: flex;
          gap: 8px;
        }
      `}</style>
    </>
  );
}

export default observer(Config);
