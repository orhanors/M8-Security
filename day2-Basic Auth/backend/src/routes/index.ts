import { Router } from "express";
const router: Router = require("express").Router();
const userRoute = require("./user");

router.use("/users", userRoute);
module.exports = router;
