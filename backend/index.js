/**
 * This module sets up an Express server and exposes a single endpoint '/projects'.
 * The server uses CORS middleware to allow cross-origin requests.
 * The '/projects' endpoint responds with data imported from the 'data.js' file.
 * The server listens on port 3000.
 */

/**
 * Importing the data from data.js file
 * @type {Object}
 */
import { data } from "./data.js";

/**
 * Importing the sha256 function from js-sha256 library
 * @type {Function}
 */
import { sha256 } from "js-sha256";

/**
 * Importing the CORS middleware
 * @type {Function}
 */
import cors from "cors";

/**
 * Importing the express module
 * @type {Function}
 */
import express from "express";

/**
 * Importing the dotenv module for loading environment variables
 * @type {Function}
 */
import dotenv from "dotenv";
dotenv.config();

/**
 * Creating an instance of express
 * @type {Object}
 */
const app = express();

/**
 * CORS options object
 * This object is used to configure the CORS middleware.
 * It specifies that the server should only accept requests from 'http://localhost:5173'.
 * @type {Object}
 */
const corsOption = {
  origin: ["http://localhost:5173"],
};

/**
 * Use CORS middleware
 * This applies the CORS middleware to the Express application.
 * The middleware is configured with the options specified in the 'corsOption' object.
 * This means that the server will only accept cross-origin requests from 'http://localhost:5173'.
 */
app.use(cors(corsOption));

/**
 * Setting the port for the server
 * @type {Number}
 */
const port = 3000;

/**
 * Route handler for GET requests to '/projects'
 * Extracts the token from the Authorization header, hashes the ACCESS_TOKEN_SECRET environment variable,
 * and compares the hashed secret with the token. If they match, it responds with the data imported from 'data.js'.
 * If they don't match, it responds with a 401 status code and an 'Invalid token' message.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get("/projects", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1]; // Extract the token from the Authorization header
  const secret = sha256(process.env.ACCESS_TOKEN_SECRET);

  if (token === secret) {
    res.send(data);
  } else {
    res.status(401).json({ message: "Invalid token" });
  }
});

/**
 * Starts the server and listens on the specified port
 * Logs a message to the console when the server starts
 */
app.listen(port, () => {
  console.log(`Project data now available on http://localhost:3000/projects`);
});
