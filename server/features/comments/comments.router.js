const express = require("express");
const commentModel = require("./comments.model");
const blogModel = require("../blogs/blogs.model");

const app = express.Router();

app.get("/:id",async(req,res)=>{
    const {id} = req.params;
    const data = await commentModel.find({BlogId:id});
    res.status(200).send({message:"success",data:data});
});

app.post("/",async(req,res)=>{
    const id = req.headers.blogid;
    const {username,comment} = req.body;

    const data = await commentModel.create({BlogId:id,username,comment});
    await blogModel.findOneAndUpdate({_id:id},{$inc:{NumComments:+1}});
    res.status(200).send({message:"comment posted",id:id,data:data});
})

app.patch("/",async(req,res)=>{
    const id = req.headers.commentid;

    const data = await commentModel.findOneAndUpdate({_id:id},{delete:true},{new:true});
    res.status(200),send({message:"comment deleted",data:data});
})
app.patch("/reply",async(req,res)=>{
    const id = req.headers.commentid;
    const {username,reply} = req.body;
    
    const data = await commentModel.findOneAndUpdate({_id:id},{reply:{username,reply}},{new:true});
    res.status(200).send({message:"success",data:data});
})

module.exports = app;
