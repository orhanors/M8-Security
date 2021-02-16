class ApiError extends Error {
	httpStatusCode: number;

	constructor(
		httpStatusCode: number = 500,
		message: string = "An error occured"
	) {
		super(message);
		this.httpStatusCode = httpStatusCode;
	}
}

export default ApiError;
