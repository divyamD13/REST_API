const express = require("express");
// const users = require("./MOCK_DATA.json");
const fs = require('fs');
const { connectMongoDB } = require("./connection");
const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares");
const PORT = 8000;

const app = express();


//Mongoose Connnection
connectMongoDB('mongodb://127.0.0.1:27017/yt_app').then(() => {
    console.log("Connected to MongoDB");
});

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users", userRouter);

//Starting Server
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));