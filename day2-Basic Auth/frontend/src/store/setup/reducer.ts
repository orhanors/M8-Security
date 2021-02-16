import { combineReducers } from "@reduxjs/toolkit";
import undoReducer from "../undo";
import testReducer from "../user";

const rootReducer = combineReducers({
	user: testReducer,
	undo: undoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
