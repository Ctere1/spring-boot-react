import { combineReducers } from "redux";
import tutorials from "./tutorials.js";
import message from "./message";
import auth from "./auth";

export default combineReducers({
    tutorials,
    auth,
    message
});