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
 * Creating an instance of express
 * @type {Object}
 */
const app = express();

/**
 * Use CORS middleware to allow cross-origin requests
 */
app.use(cors());

/**
 * Setting the port for the server
 * @type {Number}
 */
const port = 3000;

/**
 * Route handler for GET requests to '/projects'
 * Sends the data as a response
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get("/projects", (req, res) => {
  res.send(data);
});

/**
 * Starts the server and listens on the specified port
 * Logs a message to the console when the server starts
 */
app.listen(port, () => {
  console.log(`Project data now available on http://localhost:3000/projects`);
});
