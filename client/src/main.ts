import { prepareBoards } from "./prepare-boards";
import { ICell } from "./types";
import { constants } from "./constants";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <canvas id="player" class="canvas"></canvas>
    <canvas id="opponent" class="canvas"></canvas>
  </div>
`;

const playerCanvas: HTMLCanvasElement | null =
  document.querySelector("#player");
const opponentCanvas: HTMLCanvasElement | null =
  document.querySelector("#opponent");

if (!playerCanvas || !opponentCanvas)
  throw new Error("some canvas was not generated");

playerCanvas.width = constants.CANVAS_SIZE;
playerCanvas.height = constants.CANVAS_SIZE;

opponentCanvas.width = constants.CANVAS_SIZE;
opponentCanvas.height = constants.CANVAS_SIZE;

prepareBoards(playerCanvas.getContext("2d")!);
const { cells } = prepareBoards(opponentCanvas.getContext("2d")!);

opponentCanvas.addEventListener("click", (e: MouseEvent) => {
  const cell: ICell | undefined = cells.find((cell: any) => {
    return (
      e.offsetX > cell.x + constants.GAP &&
      e.offsetX < cell.x + constants.CELL_SIZE + constants.GAP &&
      e.offsetY > cell.y + constants.GAP &&
      e.offsetY < cell.y + constants.CELL_SIZE + constants.GAP
    );
  });
  if (cell) {
    const ctx = opponentCanvas.getContext("2d")!;
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(cell.x, cell.y, constants.CELL_SIZE, constants.CELL_SIZE);
    //request(cell);
  }
});
