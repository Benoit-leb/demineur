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
    <React.Fragment>

    
    <form onSubmit={(e) => launchGame(e)} className="form row center-xs line">
        <div className="col-xs-12 col-sm-8">
          <div className="input-container">
            <div className="row between-xs">
              <label>
                Nombre de colonnes :
              </label>
              <input onChange={(e) => dispatch({ type: "SET_SIZE", data: parseInt(e.target.value) })} min={10} max={50} value={store.size} type="number" />
            </div>
          </div>
          <div className="input-container">
            <div className="row between-xs">
              <label>
                Nombre de bombes :
              </label>
              <input onChange={(e) => dispatch({ type: "SET_BOMBS", data: parseInt(e.target.value) })} min={1} max={Math.pow(store.size, 2)} value={store.bombs} type="number" />
            </div>
          </div>
        </div>

        <div className=" col-xs-12 col-sm-4">
          <button type="submit" >{store.gameReady ? "Recommencer" : "Commencer"}</button>
        </div>
    </form>
      <div className="row between-xs line">
        <button onClick={() => dispatch({type:"RESET_GAME"})}>Reset</button>
        <button onClick={() => dispatch({ type: "DISPLAY_BOMB"})}>Voir les bombes</button>
      </div>
    </React.Fragment>
  );
};

export default Form;
