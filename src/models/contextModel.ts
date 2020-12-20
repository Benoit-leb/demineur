import {Igame} from "./gameModel";

export type IContextProps = {
  store: Igame;
  dispatch: ({ type, data }: { type: string; data?: any }) => void;
};

