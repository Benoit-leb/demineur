import {ImatrixItem} from "./matrixItemModel";

export type Igame = {
  size: number,
  bombs: number,
  gameStatus: number,
  gameReady: boolean,
  matrix: ImatrixItem[],
  countBomb: number,
  showResult:number,
  show:boolean
}

