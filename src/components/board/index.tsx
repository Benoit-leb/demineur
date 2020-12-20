import React, { ReactElement, useContext} from "react";
import Cell from "../cell";
import { Context } from "../../reducers/reducer";

const Board = () => {
  const { store, dispatch } = useContext(Context);

  const setRows = (row: number) => {
    let cellsList: ReactElement[] = [];
    for (let index = 1; index <= store.size; index++) {
      const item = store.matrix.find((el) => el.idx === index + (store.size * row));      
      if (item) {
        cellsList.push(
          <Cell
            key={`td-${item.idx}`}
            item={item} />
        );
      }
    }
    return (<tr key={`tr-${row}`}>{cellsList}</tr>);
  };

  const setField = () => {
    const rows: ReactElement[] = [];
    for (let index = 0; index < store.size; index++) {
      rows.push(setRows(index));
    }
    return rows;
  };

  const showResult = () => {
    store.matrix.map((el) => el.show = !el.show)
    dispatch({type:"SHOW_RESULT", data: store.matrix});
  };

  if (store.matrix.length){
    let classResult = store.gameStatus < 0 ? "lost" : "";
    classResult = store.gameStatus > 0 ? "win" : classResult;
    return (
      <div className={`board ${store.showResult ? "show" : ""}`}>
        <div>Nombre de bombe(s) restante(s) : {store.bombs - store.countBomb}</div>
        <div className={classResult}>{store.gameStatus < 0 ? "PERDU" : ""}{store.gameStatus > 0 ? "VICTOIRE" : ""}</div>
        <div className="row center-xs">
          <table className={classResult}>
            <tbody>
              {setField()}
            </tbody>
          </table>
        </div>
        <button onClick={() => showResult()}>Voir les bombes</button>
      </div>
    );
  }
  return <div></div>;
};

export default Board;