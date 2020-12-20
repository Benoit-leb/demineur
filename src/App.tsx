import React, {useReducer} from 'react';
import { gameReducer, initialState, Context} from "./reducers/reducer";
import Board from "./components/board";
import Form from "./components/form";

const App = () => {
  const [store, dispatch] = useReducer(gameReducer, initialState);
  const value = { store, dispatch }; 

  return (
    <Context.Provider value={value}>
      <div className="App">
        <Form/>
        <div className="row center-xs">
          <Board key={1}/>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
