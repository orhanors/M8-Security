import { Router } from "express";
const router: Router = require("express").Router();
const { signup, login } = require("../../controllers/auth");
const {
	basicAuthMiddleware,
	adminOnlyMiddleware,
} = require("../../middlewares/auth");

const { getAllUsers } = require("../../middlewares/users");

router.post("/auth/signup", signup);
router.post("/auth/login", basicAuthMiddleware, login);

router.get("/", basicAuthMiddleware, adminOnlyMiddleware, getAllUsers);

module.exports = router;
