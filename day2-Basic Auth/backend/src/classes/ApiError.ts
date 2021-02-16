class ApiError {
	httpStatusCode: number;
	message: string;

	constructor(
		httpStatusCode: number = 500,
		message: string = "An error occured"
	) {
		this.message = message;
		this.httpStatusCode = httpStatusCode;
	}
}

module.exports = ApiError;
