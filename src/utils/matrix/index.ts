
import {ImatrixItem} from "../../models/matrixItemModel";

const CreateMatrix= (size:number, bombs:number) => {
  const matrix: ImatrixItem[] = [];
  let possible: ImatrixItem[] = [];

  const setIndicator = (item: ImatrixItem) => {
    let element;
    for (let indexX = item.x - 1; indexX <= item.x + 1; indexX++) {
      for (let indexY = item.y - 1; indexY <= item.y + 1; indexY++) {
        element = matrix.find((el) => el.x === indexX && el.y === indexY);
        if (element && element.status !== -1) {
          element.status++;
        }
      }
    }
  };
  
  const randomMinesCoord = () => {
    const id = Math.floor(Math.random() * (possible.length) + 1);
    const item = possible[id - 1];
    possible.splice(id - 1, 1);
    
    if (item) {
      matrix[item.idx - 1].status = -1;
      setIndicator(matrix[item.idx - 1]);
    }
  };
  
  const setMinesIntoMatrix = () => {
    possible = matrix.slice();
    for (let index = 0; index < bombs; index++) {
      randomMinesCoord();
    }    
    return matrix;
  };

  const setMatrix = async() => {
    let x = 0;
    let y = 0;
    let mark = false;
    let visited = false;
    for (let index = 1; index <= Math.pow(size, 2); index++) {
      x = index % size;
      x = x === 0 ? size : x;
      y = Math.ceil(index / size);  
      matrix.push({
        idx: index,
        status: 0,
        x,
        y,
        mark,
        visited,
        show: false
      });
    }
    return await setMinesIntoMatrix();
  };
  return setMatrix();
};

export {CreateMatrix};
export default {CreateMatrix};