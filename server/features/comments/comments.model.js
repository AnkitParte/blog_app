const mongoose = require("mongoose");

//[{username:String,comment:String,status:Boolean,reply:{username:String,reply:String}}]
const commentSchema = new mongoose.Schema({
    BlogId: { type: mongoose.Schema.Types.ObjectId, ref:"blog", required:true},
    comments : [{username:String,
        comment:String,
        delete:{type:Boolean,default:false},
        reply : {type:{username:String,reply:String},default:null}
    }]
})

const commentModel = new mongoose.model("comment",commentSchema);

module.exports = commentModel;