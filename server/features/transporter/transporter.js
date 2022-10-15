const nodemailer = require("nodemailer");

//const username = "isai25@ethereal.email"
//const password = "5yXCrUKRfhVSr1GaXD"

const transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'isai25@ethereal.email',
        pass: '5yXCrUKRfhVSr1GaXD'
    }
});

// transporter.sendMail({
//     to : "parte@gmail.com",
//     from:"checker@email.js",
//     subject:"Your Account Created succesfully",
//     text:"Work Done"
// })

module.exports = transport;