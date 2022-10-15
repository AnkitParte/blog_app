const {Schema,model} = require("mongoose");

const User = new Schema({
    email : String,
    password : String,
    username: String,
    age: Number,
    role : { type: String,
        enum : ["user","admin"],
        default:"user"
    }
})

const UserModel = new model("user",User);

module.exports = UserModel;