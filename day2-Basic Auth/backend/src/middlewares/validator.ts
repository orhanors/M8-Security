import Joi from "joi";
import { Request, Response, NextFunction } from "express";

exports.signupSchema = Joi.object({
	firstName: Joi.string().min(1).required(),
	lastName: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

exports.loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

// Generic validator function to check body
exports.validateBody = (schema: any) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req.body);

		if (error) {
			let originalErrorMessage = error.details[0].message;
			let modifiedErrorMessage =
				error.details[0].path +
				" " +
				originalErrorMessage.substring(
					originalErrorMessage.indexOf(" ") + 1
				);
			return res.status(400).json({ errors: modifiedErrorMessage });
		}

		next();
	};
};
