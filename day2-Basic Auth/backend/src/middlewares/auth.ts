const db = require("../models");
const atob = require("atob");
import { Request, Response } from "express";
const ApiError = require("../classes/ApiError");
import { IRequest } from "../controllers/auth";

exports.basicAuthMiddleware = async (
	req: IRequest,
	res: Response,
	next: Function
) => {
	if (!req.headers.authorization)
		return next(new ApiError(401, "Unauthorized"));

	const decoded = atob(req.headers.authorization.split(" ")[1]);
	const [email, password] = decoded.split(":");
	const user = await db.User.findByCredentials(email, password);
	if (!user) return next(new ApiError(401, "Invalid Credentials"));

	req.user = user;
	next();
};

exports.adminOnlyMiddleware = async (
	req: IRequest,
	res: Response,
	next: Function
) => {
	if (req.user?.role === 1) return next();
	next(new ApiError(403, "Only admins can access to this page"));
};
