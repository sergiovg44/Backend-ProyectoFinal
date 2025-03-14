const express = require("express")
require("dotenv").config()

const connectToDatabase = require("./db/db")


const app = express();


app.use(express.json())

connectToDatabase();





const server = app.listen(3000, () => {
  console.log("Server is running http://localhost:3000");
});