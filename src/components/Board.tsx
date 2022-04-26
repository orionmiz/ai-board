import { BoardType } from "~/lib/game";
import Cell from "./Cell";
import Mark from "./Mark";

export default function Board({
  width,
  height,
  type,
}: {
  width: number;
  height: number;
  type: BoardType;
}) {
  const cross = type === "cross";

  return (
    <>
      <div className="table">
        <div className="board">
          <div className="lines" />
          {(width === height && width >= 6) &&
            Array(9)
              .fill(0)
              .map((_, i) => {
                const x = width - (1 - (i % 3)) * Math.ceil(width * 0.5);
                const y =
                  height - (1 - ((i / 3) | 0)) * Math.ceil(height * 0.5);
                return <Mark x={x} y={y} key={i} />;
              })}
          {Array(height)
            .fill(0)
            .map((_, y) =>
              Array(width)
                .fill(0)
                .map((_, x) => (
                  <Cell x={x} y={y} type={type} key={`${x},${y}`} />
                ))
            )}
        </div>
      </div>
      <style jsx>{`
        .table {
          width: 720px;
          background-image: url(https://raw.githubusercontent.com/naush/goban/master/wood-pattern.png);
          background-color: #f1b06c;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          margin: 16px auto;
          aspect-ratio: 1;
        }
        @media (max-width: 720px) {
          .table {
            width: 100%;
          }
        }
        .board {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(${cross ? width * 2 : width}, 1fr);
          grid-template-rows: repeat(${cross ? height * 2 : height}, 1fr);
        }
        .lines {
          grid-column: ${cross ? '2 / -2' : '1 / -1'};
          grid-row: ${cross ? '2 / -2' : '1 / -1'};
          border-right: 1px solid grey;
          border-bottom: 1px solid grey;
          background-size: calc(100% / ${width - (cross ? 1 : 0)}) calc(100% / ${height - (cross ? 1 : 0)});
          background-image: linear-gradient(to right, grey 1px, transparent 1px),
            linear-gradient(to bottom, grey 1px, transparent 1px);
        }
      `}</style>
    </>
  );
}
