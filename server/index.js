// require('dotenv').config();
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { createServer } from "http";

dotenv.config({
  path: './.env'
});

const server = createServer(app);

connectDB()
  .then(() => {
    server.on("error", (error) => {
      console.log("Error: ", error);
    })
    server.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    })
  })
  .catch((error) => {
    console.log("MongoDB connection failed!! (from index.js): ", error)
  })
