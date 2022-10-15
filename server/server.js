const express = require('express')
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express()

const port = process.env.port || 8080;
const mongo = process.env.mongo_url;
const userRouter = require("./features/users/users.router");

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors());

app.get('/', (req, res) => res.send('hello'))

app.use("/users",userRouter);

app.listen(port, async () => {
    await mongoose.connect(mongo);
    console.log('server started 100%');
})