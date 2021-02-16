import { BASE_URL } from "../config";
export const signupApiCall = async (body: object) => {
	try {
		const response = await fetch(BASE_URL + "/users/auth/signup", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-type": "application/json",
			},
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log("Signup error: ", error);
		return error;
	}
};
