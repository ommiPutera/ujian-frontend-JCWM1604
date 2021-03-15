import { combineReducers } from "redux";
import AuthReducers from "./authReducers";
// state global
export default combineReducers({
  Auth: AuthReducers,
});