const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    Title : {type:String,require:true},
    PostTime : Number,
    nLikes : Number,
    NumComments : Number,
    Author: {
        UserId:{ type: mongoose.Schema.Types.ObjectId, ref:"user", required:true},
        username:{type:String},
    },
    description: String
})

const blogModel = new mongoose.model("blog", blogSchema);
//[{username:String,comment:String,status:Boolean,reply:{username:String,reply:String}}]
module.exports = blogModel;