const express = require('express')
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer")
//const {customRandom} = require("nanoid");

const UserModel = require("./users.model");
const otpModel = require("./otp.model");
const authMiddleware = require('../middlewares/github.mid');

const app = express.Router();
const secret_key = process.env.secret_key;
const refresh_key = process.env.refresh_key;
const nanoid = ()=>{return Math.floor((Math.random()*1000000)+1);}

const transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'isai25@ethereal.email',
        pass: '5yXCrUKRfhVSr1GaXD'
    }
})


app.post("/signup", async (req, res) => {
    const { username, email, password, age,role } = req.body;

    const check = await UserModel.findOne({ email });
    //console.log(check);
    if (check) {
        res.status(401).send({ message: "user already exist!!!" })
    } else {
        const newUser = await UserModel.create({ email, password, age, username,role });

        transport.sendMail({
            to: newUser.email,
            from: "ryusaki@gmail.com",
            subject: "Signup Success",
            text: `Hello ${newUser.email}, your account has been created successfully`
        })

        res.status(200).send({ message: "user created successfully" });
    }
})

app.post("/signup/github", authMiddleware, async (req, res) => {
    const { email, username,role } = req.body;

    const user = await UserModel.findOne({ email, username });

    if (!user) {

        const check = await UserModel.create({ email, username ,role});
        const token = jwt.sign(
            { id: check._id, email: check.email, age: check.age },
            secret_key,
            { expiresIn: "1 hour" }
        )
        const refresh = jwt.sign({ id: check._id, email: check.email }, refresh_key, { expiresIn: "7 days" })

        return res.status(200).send({ message: "Account Created successfully", token: token, refresh: refresh });
    } else {

        const token = jwt.sign(
            { id: user._id, email: user.email, age: user.age },
            secret_key,
            { expiresIn: "1 hour" }
        )
        const refresh = jwt.sign({ id: user._id, email: user.email }, refresh_key, { expiresIn: "7 days" })
        return res.status(200).send({ message: "login successful", token: token, refresh: refresh });
    }

})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const check = await UserModel.findOne({ email, password });
    //console.log(check);
    if (check) {
        const token = jwt.sign(
            { id: check._id, email: check.email, age: check.age },
            secret_key,
            { expiresIn: "1 hour" }
        )

        const refresh = jwt.sign({ id: check._id, email: check.email }, refresh_key, { expiresIn: "7 days" })
        return res.status(200).send({ message: "login successfull", token: token, refresh: refresh });
    } else {
        return res.status(401).send({ message: "Wrong Credentials, Try again!!!" });
    }
})


app.get("/refresh", async (req, res) => {
    const refresh_token = req.headers.authorization;

    try {
        const verifi = jwt.verify(refresh_token, refresh_key);
        //console.log(verifi);
        const token = jwt.sign({ id: verifi.id, email: verifi.email }, secret_key, { expiresIn: "1 hour" });
        res.status(200).send({ message: "token renewed", token: token });
    }
    catch (e) {
        res.status(401).send({ error: e, message: "re-login please" });
    }
})

app.post("/forget",async(req,res)=>{
    const {email} = req.body;
    const otp = nanoid();

    transport.sendMail({
        to: email,
        from: "ryusaki@gmail.com",
        subject: "OTP",
        text: `Hello ${email}, your otp is ${otp}`
    })
    .then(async()=>{
        const otpCreation = await otpModel.create({email,otp});
        res.status(200).send("Request has been completed")
    })
})

app.post("/reset",async(req,res)=>{
    const {email, newPass, otp} = req.body;

    const optVerify = await otpModel.findOne({email, otp});
    if(!optVerify){
        res.status(401).send({message : "Something went wrong"});
    }else{
        const update = await UserModel.findOneAndUpdate({email},{password:newPass});
        res.status(200).send({message : "New Password Created Successfully"})
    }
})

app.get('/', (req, res) => res.send('welcome to users route'))

module.exports = app;