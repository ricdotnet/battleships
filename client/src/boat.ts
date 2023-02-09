import { constants } from "./constants";

type Type = 'small' | 'medium' | 'large';
type Orientation = 'ver' | 'hor';

enum Size {
  small = 1,
  medium = 3,
  large = 5
}

interface IBoat {
  set x(x: number);
  set y(y: number);
  set ori(ori: Orientation);

  get x(): number;
  get y(): number;
  get ori(): Orientation;

  resolveSize(): number;
  render(): void;
}

class Boat implements IBoat {

  private xPos: number;
  private yPos: number;
  private type: Type;
  private orientation: Orientation;
  private context: CanvasRenderingContext2D

  constructor(x: number, y: number, type: Type, ori: Orientation, ctx: CanvasRenderingContext2D) {
    this.xPos = x;
    this.yPos = y;
    this.type = type;
    this.orientation = ori;
    this.context = ctx;
  }

  set x(x: number) {
    if (this.orientation === 'ver') {
      if (x < 0 || x > (constants.CELL_SIZE * constants.BOARD_SIZE) - constants.CELL_SIZE) return;
    } else {
      if (x < 0 || x > (constants.CELL_SIZE * constants.BOARD_SIZE) - constants.CELL_SIZE * Size[this.type]) return;
    }
    this.xPos = x;
  }

  get x(): number {
    return this.xPos;
  }

  set y(y: number) {
    if (this.orientation === 'ver') {
      if (y < 0 || y > (constants.CELL_SIZE * constants.BOARD_SIZE) - constants.CELL_SIZE * Size[this.type]) return;
    } else {
      if (y < 0 || y > (constants.CELL_SIZE * constants.BOARD_SIZE) - constants.CELL_SIZE) return;
    }
    this.yPos = y;
  }

  get y(): number {
    return this.yPos;
  }

  set ori(ori: Orientation) {
    this.orientation = ori;
  }

  get ori(): Orientation {
    return this.orientation;
  }

  resolveSize(): number {
    return constants.CELL_SIZE * Size[this.type];
  }

  render(): void {
    this.context.beginPath();
    this.context.fillStyle = 'lightblue';
    this.context.strokeStyle = 'deepspace';
    this.context.strokeRect(this.x, this.y,
      (this.orientation === 'hor') ? this.resolveSize() : constants.CELL_SIZE,
      (this.orientation === 'hor') ? constants.CELL_SIZE : this.resolveSize());
    this.context.fillRect(this.x, this.y,
      (this.orientation === 'hor') ? this.resolveSize() : constants.CELL_SIZE,
      (this.orientation === 'hor') ? constants.CELL_SIZE : this.resolveSize());
  }
}

export class SmallBoat extends Boat {

  constructor(x: number, y: number, ori: Orientation, ctx: CanvasRenderingContext2D) {
    super(x, y, 'small', ori, ctx);
  }

}

export class MediumBoat extends Boat {

  constructor(x: number, y: number, ori: Orientation, ctx: CanvasRenderingContext2D) {
    super(x, y, 'medium', ori, ctx);
  }

}

export class LargeBoat extends Boat {

  constructor(x: number, y: number, ori: Orientation, ctx: CanvasRenderingContext2D) {
    super(x, y, 'large', ori, ctx);
  }

}
