import React from "react";
import {Igame} from "../models/gameModel";
import {Iaction} from "../models/actionModel";
import {IContextProps} from "../models/contextModel";

export const initialState: Igame = {
  size: 15,
  bombs: 33,
  gameStatus: 0,
  gameReady:false,
  matrix: [],
  countBomb: 0,
  showResult: 0,
  show:false
};

export const gameReducer = (
  state: Igame,
  action: Iaction
): Igame => {
  switch (action.type) {
    case "SET_SIZE":
      return {
        ...state,
        size: action.data >= 0 && action.data <= 50 ? action.data : state.size,
        bombs: action.data >= 0 && action.data <= 50 ? Math.ceil(Math.pow(action.data, 2)/7) : state.bombs,
        matrix: [],
        gameReady: false,
        gameStatus: 0
      };
    case "SET_BOMBS":
      return {
        ...state,
        bombs: action.data >= 0 && action.data <= Math.pow(state.size, 2) ? action.data : state.bombs,
        matrix: [],
        gameReady: false,
        gameStatus: 0
      };
    case "SET_MATRIX":
      return {
        ...state,
        matrix: action.data,
        gameReady: true
      };
    case "UPDATE_ITEM":
      return {
        ...state,
        matrix: state.matrix.map((el, i) => i === action.data.idx - 1 ? action.data : el)
      };
    case "LOSE_GAME":
      return {
        ...state,
        gameReady: false,
        gameStatus: -1
      };
    case "WIN_GAME":
      return {
        ...state,
        gameReady: false,
        gameStatus: 1
      };
    case "INCREASE_BOMB":
      return {
        ...state,
        countBomb: state.countBomb + 1
      };
    case "DECREASE_BOMB":
      return {
        ...state,
        countBomb: state.countBomb - 1
      };
    case "DISPLAY_BOMB":
      return {
        ...state,
        show:!state.show
      };
    case "INIT_GAME":
      return {
        ...state,
        matrix:[],
        countBomb: 0,
        gameReady: false,
        gameStatus: 0
      };
    case "RESET_GAME":
      return initialState;
    default:
      return state;
  }
};

export const Context = React.createContext({} as IContextProps);
