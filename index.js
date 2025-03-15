const express = require("express")
require("dotenv").config()
const cors = require("cors")

const songsRouter = require ("./routes/songRouter")
const userRouter = require ("./routes/userRouter")
const loginRouter = require ("./routes/loginRouter")

const connectToDatabase = require("./db/db")


const app = express();

app.use(cors());
app.use(express.json())

connectToDatabase();


app.use("/song", songsRouter)
app.use("/user", userRouter)
app.use("/user", loginRouter)


const server = app.listen(3000, () => {
  console.log("Server is running http://localhost:3000");
});