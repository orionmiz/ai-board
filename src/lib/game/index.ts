import { action, computed, makeObservable, observable as o } from "mobx";

export type BoardType = "box" | "cross";
type GameState = "idle" | "playing" | "end";

export enum PlayerColor {
  Black = 1,
  White,
}

export type GameProps = Pick<Game, "name" | "width" | "height" | "boardType">;

export interface BaseResult {
  end: boolean;
}

export default abstract class Game<
  Result extends BaseResult = {
    end: boolean;
  }
> {
  @o name: string;
  @o width: number;
  @o height: number;
  @o boardType: BoardType;

  @o state: GameState = "idle";
  @o playerColor: PlayerColor = PlayerColor.Black;
  @o board: number[][];
  @o steps: {
    x: number;
    y: number;
  }[] = [];
  @o turn = 1;
  @o winner: PlayerColor | undefined;

  constructor({ name, width, height, boardType }: GameProps) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.boardType = boardType;

    this.board = Game.makeBoard(width, height);

    makeObservable(this);
  }

  @action
  toggleColor(color: PlayerColor) {
    this.playerColor = color;
  }

  @action
  protected start() {
    this.state = "playing";
  }

  @action
  clear() {
    this.steps = [];
    this.board = Game.makeBoard(this.width, this.height);
    this.state = "idle";
  }

  @action
  step(x: number, y: number, player: PlayerColor) {
    this.steps.push({ x, y });
    this.board[y][x] = player;
    this.turn++;

    if (this.state === "idle") {
      this.state = "playing";
    }

    if (player === this.playerColor) {
      //this.stepAI();
    }

    const result = this.checkWin(x, y);

    if (result.end) {
      this.winner = player;
      this.state = "end";

      this.disposeGame(result);
    }
  }

  // check whether the game is over or not
  protected abstract checkWin(x: number, y: number): Result;

  // define the actions to take after the game is over
  protected abstract disposeGame(info: Result): void;

  @action
  stepBack() {
    const { x, y } = this.steps.pop() || { x: 0, y: 0 };
    this.board[y][x] = 0;
    this.turn--;

    if (this.state === "end") this.state = "playing";
  }

  @action
  stepAI() {
    const { x, y } = this.AIMove;
    this.step(x, y, this.AIColor);
  }

  @computed
  get AIMove() {
    const coord = { x: 0, y: 0 };

    return coord;
  }

  @computed
  get AIColor() {
    return this.playerColor === PlayerColor.Black
      ? PlayerColor.White
      : PlayerColor.Black;
  }

  @computed
  get lastPlayerMove() {
    if (this.steps.length) {
      return this.steps[
        this.steps.length - 1 - (this.playerColor === PlayerColor.Black ? 1 : 0)
      ];
    }
    return null;
  }

  // compute heuristic score
  protected abstract score(x: number, y: number): number;

  canStep(x: number, y: number) {
    return this.board[y][x] === 0;
  }

  getAvailableMoves(): { x: number; y: number }[] {
    const moves = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.canStep(x, y)) moves.push({ x, y });
      }
    }
    return moves;
  }

  static makeBoard(width: number, height: number) {
    return Array(height)
      .fill(0)
      .map(() => Array(width).fill(0));
  }
}
