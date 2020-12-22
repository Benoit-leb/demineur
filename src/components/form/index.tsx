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

  const renderColomnValue = () => {
    let listOption = [];
    for (let index = 0; index <= 50; index++) {
      listOption.push(<option key={index} value={index}>{index}</option>)
    }
    return listOption;
  };

  const renderBombsValue = () => {
    let listOption = [];
    for (let index = 0; index < Math.pow(store.size, 2); index++) {
      listOption.push(<option key={index} value={index}>{index}</option>)
    }
    return listOption;
  };

  return(
    <React.Fragment>

    
    <form onSubmit={(e) => launchGame(e)} className="form row center-xs line">
        <div className="col-xs-12 col-sm-8">
          <div className="input-container">
            <div className="row between-xs">
              <label>
                Nombre de colonnes :
              </label>
              <select value={store.size} onChange={(e) => dispatch({ type: "SET_SIZE", data: parseInt(e.target.value) })}>
                {renderColomnValue()}
              </select>
            </div>
          </div>
          <div className="input-container">
            <div className="row between-xs">
              <label>
                Nombre de bombes :
              </label>
              <select value={store.bombs} onChange={(e) => dispatch({ type: "SET_BOMBS", data: parseInt(e.target.value) })}>
                {renderBombsValue()}
              </select>
            </div>
          </div>
        </div>

        <div className=" col-xs-12 col-sm-4">
          <button type="submit" >{store.gameReady ? "Recommencer" : "Commencer"}</button>
        </div>
    </form>
      <div className="row around-xs line">
        <button onClick={() => dispatch({type:"RESET_GAME"})}>Reset colonnes / bombs</button>
        <button onClick={() => dispatch({ type: "DISPLAY_BOMB"})}>Debugger</button>
      </div>
    </React.Fragment>
  );
};

export default Form;
