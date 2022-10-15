const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email : String,
    otp : String
})

const otpModel = mongoose.model("otp",otpSchema);
module.exports = otpModel;