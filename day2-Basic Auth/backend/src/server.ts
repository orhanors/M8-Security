const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { port, mongodbUri } = require("./config/keys");
const routes = require("./routes");
require("dotenv").config();
const {
	badRequestHandler,
	genericHandler,
	notFoundHandler,
	forbiddenHandler,
	unAuthorizedHandler,
} = require("./helpers/errorHandling");

// INTIAL SETUP
const server = express();
server.use(express.json());
server.use(cors());

server.use("/api", routes);
//Error Handling Mıddlewares
server.use(notFoundHandler);
server.use(badRequestHandler);
server.use(forbiddenHandler);
server.use(unAuthorizedHandler);
server.use(genericHandler);

mongoose
	.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Connected to DB..."))
	.catch((e: object) => console.log("DB connection error: ", e));
server.listen(port, () => {
	console.log("Server is running on PORT:", port);
});
