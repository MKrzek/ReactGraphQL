/*global require*/
const cookieParser = require ('cookie-parser')
require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");
const server = createServer();
//TODO use express middleware to handle cookies
server.express.use(cookieParser())
//TODO usee express middleware to populate current user


server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is now running on ${deets.port}`);
  }
);
