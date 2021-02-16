import { Router } from "express";
const router: Router = require("express").Router();
const { signup, login } = require("../../controllers/auth");
const {
	basicAuthMiddleware,
	adminOnlyMiddleware,
} = require("../../middlewares/auth");

const { getAllUsers } = require("../../controllers/users");
const {
	signupSchema,
	loginSchema,
	validateBody,
} = require("../../middlewares/validator");

router.post("/auth/signup", validateBody(signupSchema), signup);
router.post("/auth/login", validateBody(loginSchema), login);

router.get("/", basicAuthMiddleware, adminOnlyMiddleware, getAllUsers);

module.exports = router;
