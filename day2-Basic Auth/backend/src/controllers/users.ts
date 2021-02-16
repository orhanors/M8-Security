import { Request, Response } from "express";
import { IUser } from "../models/user/index";
import { IRequest } from "./auth";
const ApiError = require("../classes/ApiError");
const db = require("../models");

exports.getAllUsers = async (req: IRequest, res: Response, next: Function) => {
	try {
		const users = await db.User.find();
		res.status(200).send(users);
	} catch (error) {
		console.log("Get all users error: ", error);
		next(error);
	}
};
