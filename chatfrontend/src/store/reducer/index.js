import { combineReducers } from "redux";
import { ProcessReducer } from "./process";
import { WalletReducer } from "./wallet";

export default combineReducers({
  ProcessReducer: ProcessReducer,
  wallet: WalletReducer
});
