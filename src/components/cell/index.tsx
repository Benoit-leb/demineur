import React, { FC, useContext, useCallback, SyntheticEvent} from "react";
import {Icell} from "../../models/cellModel";
import { ImatrixItem} from "../../models/matrixItemModel";
import { Context } from "../../reducers/reducer";

const Cell: FC<Icell> =({item}) => {
  const { store, dispatch } = useContext(Context);

  const checkWin = useCallback(() => {
    const win = store.matrix.filter((el) => !el.visited);
    if (!win.length) {
      dispatch({ type: "WIN_GAME" })
      return;
    }
  }, [dispatch, store.matrix]);

  const checkneighbor = useCallback((item: ImatrixItem) => {
    let element;
    if (item.status > 0) {
      item.visited = true;
      dispatch({ type: "UPDATE_ITEM", data: item })
      return;
    }
    for (let indexX = item.x - 1; indexX <= item.x + 1; indexX++) {
      for (let indexY = item.y - 1; indexY <= item.y + 1; indexY++) {
        element = store.matrix.find((el) => el.x === indexX && el.y === indexY);
        if (element) {
          if (!element.visited ) {
            element.visited = true;
            checkneighbor(element);
            dispatch({ type: "UPDATE_ITEM", data: element })
          }
        }
      }
    }
  }, [dispatch, store.matrix]);

  const openCell = useCallback((item: ImatrixItem) => {
    // game not start or cell open
    if (!store.gameReady || item.visited) {
      return;
    }
    item.visited = true;
    dispatch({ type: "UPDATE_ITEM", data: item})
    // it's a bomb
    if (item.status === -1) {
      dispatch({ type: "LOSE_GAME"})
      return;
    }
    checkneighbor(item);
    checkWin();
    
  }, [checkneighbor, dispatch, store.gameReady, checkWin]);

  const markCell = useCallback((e: SyntheticEvent, item: ImatrixItem) => {
    // game not start or already open without mark
    if (!store.gameReady || (item.visited && !item.mark)) {
      return false ;
    }
    e.preventDefault();
    item.visited = !item.visited;
    item.mark = !item.mark;
    if (item.mark) {
      dispatch({ type: "INCREASE_BOMB"})
    } else {
      dispatch({ type: "DECREASE_BOMB"})
    }
    dispatch({ type: "UPDATE_ITEM", data: item})
    checkWin()
    return false;
  }, [dispatch, store.gameReady, store.matrix, checkWin,]);

  return(
    <td
      className={`cell ${item.visited ? "visited" : ""} ${item.mark ? "mark" : ""} cell-${item.status} ${item.show ? "show" : ""}`}
      onContextMenu={(e) => markCell(e, item)}
      onClick={() => openCell(item)}>
      {item.status}
    </td>
  );
};

export default Cell;