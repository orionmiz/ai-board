import { observer } from "mobx-react-lite";
import { BoardType } from "~/lib/game";
import StreakGame from "~/lib/game/StreakGame";
import useGame from "../hooks/useGame";
import Stone from "./Stone";

function Cell({ x, y, type }: { x: number; y: number; type: BoardType }) {
  const game = useGame();

  const stone = game?.board[y][x];

  const cross = type === "cross";

  const highlighted = game instanceof StreakGame && game.streaks[y][x];

  return (
    <>
      <div
        className="cell"
        onClick={() => {
          console.log("clicked: ", x, y, game.playerColor);
          if (game.state !== "end" && game.canStep(x, y)) {
            game.step(x, y, game.playerColor);
          }
        }}
      >
        {stone > 0 && <Stone color={stone} />}
      </div>

      <style jsx>{`
        .cell {
          width: 90%;
          height: 90%;
          grid-column: ${cross ? x * 2 + 1 : x + 1} / span ${cross ? 2 : 1};
          grid-row: ${cross ? y * 2 + 1 : y + 1} / span ${cross ? 2 : 1};
          border-radius: 50%;

          margin: auto;

          display: flex;
          justify-content: center;
          align-items: center;

          border: ${highlighted ? "3px" : "0"} solid green;
        }
        .cell:hover {
          background-color: ${game.canStep(x, y) ? "green" : "inherit"};
          opacity: ${game.canStep(x, y) ? "0.5" : "1"};
        }
      `}</style>
    </>
  );
}

export default observer(Cell);
