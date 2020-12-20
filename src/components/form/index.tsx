import React, { useContext, SyntheticEvent, useEffect, useCallback } from "react";
import { Context } from "../../reducers/reducer";
import { CreateMatrix } from "../../utils/matrix";

const Form = () => {
  const { store, dispatch } = useContext(Context);

  const setMatrix = useCallback(async() => {
    const matrix = await CreateMatrix(store.size, store.bombs);
    dispatch({ type: "SET_MATRIX", data: matrix });
  }, [dispatch, store.bombs, store.size]);

  const launchGame = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    dispatch({ type: "INIT_GAME" });
    setMatrix();
  }, [setMatrix, dispatch]);


  useEffect(() => {
    setMatrix();
  }, []);

  return(
    <form onSubmit={(e) => launchGame(e)} className="form row center-xs">
      <div>
        <div className="input-container row between-xs">
          <label>
            Nombre de colonnes :
          </label>
          <input onChange={(e) => dispatch({ type: "SET_SIZE", data: parseInt(e.target.value) })} min={10} max={50} value={store.size} type="number" />
        </div>
        <div className="input-container row between-xs">
          <label>
            Nombre de bombes :
          </label>
          <input onChange={(e) => dispatch({ type: "SET_BOMBS", data: parseInt(e.target.value) })} min={1} max={Math.pow(store.size, 2)} value={store.bombs} type="number" />
        </div>
        <button type="submit" >{store.gameReady ? "Reset" : "Recommencer"}</button>
      </div>
    </form>
  );
};

export default Form;
