import { action, makeObservable, observable as o, reaction } from "mobx";
import Game, { BaseResult, GameProps } from ".";

export interface StreakGameProps extends GameProps {
  winAt: number;
}

interface StreakResult extends BaseResult {
  streaks: number[][];
}

export default abstract class StreakGame extends Game<StreakResult> {
  @o winAt: number;
  @o streaks: number[][] = Game.makeBoard(this.width, this.height);

  constructor(props: StreakGameProps) {
    super(props);

    this.winAt = props.winAt;

    makeObservable(this);

    reaction(
      () => this.steps.slice(),
      (cur, prev) => {
        // back or clear -> flush streaks
        if (cur.length < prev.length) {
          this.flushStreaks();
        }
      }
    );
  }

  private calcPartialStreak(
    x: number,
    y: number,
    dx: number,
    dy: number,
    streaks?: number[][]
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
      if (streaks) {
        streaks[y1][x1] = 1;
      }
      x1 += dx;
      y1 += dy;
    }
    return count;
  }

  private calcStreak(x: number, y: number, streaks?: number[][]): number {
    const dx = [-1, 0, 1, 1];
    const dy = [-1, -1, -1, 0];

    let max = 0;
    let maxDirs: number[] = [];

    for (let i = 0; i < 4; i++) {
      const streak = this.board[y][x]
        ? 1 +
          this.calcPartialStreak(x, y, dx[i], dy[i]) +
          this.calcPartialStreak(x, y, -dx[i], -dy[i])
        : 0;

      if (streak > max) {
        max = streak;
        maxDirs = [i];
      } else if (streak === max) {
        maxDirs.push(i);
      }
    }

    if (streaks) {
      streaks[y][x] = 1;
      maxDirs.forEach((dir) => {
        this.calcPartialStreak(x, y, dx[dir], dy[dir], streaks);
        this.calcPartialStreak(x, y, -dx[dir], -dy[dir], streaks);
      });
    }

    return max;
  }

  protected score(x: number, y: number): number {
    // for temp
    return this.calcStreak(x, y);
  }

  protected checkWin(x: number, y: number): StreakResult {
    const streaks: number[][] = Game.makeBoard(this.width, this.height);

    const score = this.calcStreak(x, y, streaks);

    return {
      // Do not allow longer streaks
      end: score === this.winAt,
      streaks,
    };
  }

  @action
  protected disposeGame(info: StreakResult): void {
    this.streaks = info.streaks;
  }

  @action
  protected flushStreaks(): void {
    this.streaks = Game.makeBoard(this.width, this.height);
  }
}
