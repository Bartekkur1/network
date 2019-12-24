import { createStore } from "redux";
import reducer from './reducer';
const createHistory = require("history").createBrowserHistory

export const history = createHistory();
export const store = createStore(reducer);