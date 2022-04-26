import { makeObservable, observable as o } from "mobx";
import Game, { GameProps } from ".";

export interface StreakGameProps extends GameProps {
  winAt: number;
}

export default abstract class StreakGame extends Game {
  @o winAt: number;

  constructor(props: StreakGameProps) {
    super(props);

    this.winAt = props.winAt;

    makeObservable(this);
  }

  private calcPartialStreak(
    x: number,
    y: number,
    dx: number,
    dy: number
  ): number {
    const color = this.board[y][x];
    let count = 0;
    let x1 = x + dx;
    let y1 = y + dy;
    while (
      x1 >= 0 &&
      x1 < this.width &&
      y1 >= 0 &&
      y1 < this.height &&
      this.board[y1][x1] === color
    ) {
      count++;
      x1 += dx;
      y1 += dy;
    }
    return count;
  }

  protected score(x: number, y: number): number {
    const dx = [-1, 0, 1, 1];
    const dy = [-1, -1, -1, 0];

    let max = 0;

    for (let i = 0; i < 4; i++) {
      max = Math.max(
        1 +
          this.calcPartialStreak(x, y, dx[i], dy[i]) +
          this.calcPartialStreak(x, y, -dx[i], -dy[i])
      );
    }

    return max;
  }
}
