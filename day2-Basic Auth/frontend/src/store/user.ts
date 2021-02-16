import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types/api";

import { apiCall, ApiCallType } from "./api";
import { BASE_URL } from "../config";

export interface IState {
	data: IUser;
	errorMessage: string;
	loading: boolean;
}

const initialState: IState = {
	data: {},
	errorMessage: "",
	loading: false,
};

const slice = createSlice({
	name: "user",
	initialState,
	reducers: {
		requested: (state) => ({
			...state,
			loading: true,
		}),
		success: (state, action: PayloadAction<IUser>) => ({
			...state,
			loading: false,
			errorMessage: "",
			data: action.payload,
		}),
		failed: (state, action: PayloadAction<string>) => ({
			...state,
			loading: false,
			data: {},
			errorMessage: action.payload,
		}),
	},
});

export const { requested, success, failed } = slice.actions;

export default slice.reducer;

export const login = (body: object) =>
	apiCall({
		url: BASE_URL + "/users/auth/login",

		//headers: {},
		method: "post",
		data: body,
		onStart: requested.type,
		onSuccess: success.type,
		onError: failed.type,
	});
