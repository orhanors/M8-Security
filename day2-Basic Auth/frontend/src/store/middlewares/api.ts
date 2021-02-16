import axios from "axios";
import { MiddlewareAPI, Dispatch, Middleware, AnyAction } from "redux";
import * as actions from "../api";
const api: Middleware = ({ dispatch }: MiddlewareAPI) => (
	next: Dispatch<AnyAction>
) => async (action: AnyAction) => {
	if (action.type !== actions.apiCall.type) {
		//if action is not for api call,go to the next step
		return next(action);
	}

	const {
		url,
		headers,
		method,
		data,
		onSuccess,
		onStart,
		onError,
	} = action.payload;

	//"onStart" represents loading and makes it true,
	//"onSuccess" action makes it false
	if (onStart) dispatch({ type: onStart });
	//next(action); //we can also delete this. It's for seeing the 'api' action details
	try {
		const response = await axios({
			url,
			method,
			data,
			headers,
		});

		//General
		dispatch(actions.apiCallSuccess(response.data));
		//Spesific
		if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
	} catch (error) {
		console.log("axios error is: ", error);
		//General error action
		dispatch(actions.apiCallFailed(error.response?.data?.errors));

		//Spesific error action
		if (onError)
			dispatch({ type: onError, payload: error.response.data.errors });
	}
};

export default api;
