import { constants } from "./constants";

class IBoat {
  protected size: number;

  constructor(size: number) {
    this.size = size;
  }

  resolveSize(): number {
    return constants.CELL_SIZE * this.size + this.size;
  }
}

export class Boat extends IBoat {
  private xPos: number;
  private yPos: number;
  private context: CanvasRenderingContext2D;

  constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
    super(2);
    this.xPos = x;
    this.yPos = y;
    this.context = ctx;
  }

  get x() {
    return this.xPos;
  }

  get y() {
    return this.yPos;
  }

  set x(x: number) {
    if (x < 0 || x > (constants.CELL_SIZE * constants.BOARD_SIZE) - constants.CELL_SIZE * this.size) return;
    this.xPos = x;
  }

  set y(y: number) {
    if (y < 0 || y > (constants.CELL_SIZE * constants.BOARD_SIZE) - constants.CELL_SIZE) return;
    this.yPos = y;
  }

  render() {
    this.context.beginPath();
    this.context.fillStyle = 'green';
    this.context.fillRect(this.x, this.y, this.resolveSize(), constants.CELL_SIZE);
  }
}
