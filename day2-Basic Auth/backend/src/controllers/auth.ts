import { Request, Response } from "express";
import { IUser } from "../models/user/index";
const ApiError = require("../classes/ApiError");
const db = require("../models");

export interface IRequest extends Request {
	user?: {
		firstName: string;
		lastName: string;
		email: string;
		password: string;
		role: number;
	};
}
exports.signup = async (req: Request, res: Response, next: Function) => {
	try {
		const { email } = req.body;
		const foundUser = await db.User.findOne({ email });
		if (foundUser) throw new ApiError(400, "Email already exist!");
		const newUser: IUser = db.User({ ...req.body });
		await newUser.save();

		res.status(200).send(newUser);
	} catch (error) {
		console.log("Signup error: ", error);
		next(error);
	}
};

exports.login = async (req: IRequest, res: Response, next: Function) => {
	try {
		res.send(req.user);
	} catch (error) {
		console.log("Login error: ", error);
		next(error);
	}
};
