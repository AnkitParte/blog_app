const express = require("express")
const blogModel = require("./blogs.model");

const app = express.Router();


app.post("/",async(req,res)=>{
    const {title,id,username,data} = req.body;
    let num = Date.now();
    const blog = {
        Title : title,
        PostTime: num,
        nLikes: 0,
        NumComments:0,
        Author:{
            UserId : id,
            username: username
        },
        description : data
    }
    const newPost = await blogModel.create(blog);

    res.status(200).send({message:"Blog Uploaded successfully",post : newPost});
});

app.get("/",async(req,res)=>{

    const data = await blogModel.aggregate([{$sort:{PostTime:-1}}]).limit(10);
    if(data){
        res.status(200).send({message:"welcome user",data:data});
    }else{
        res.status(400).send({message:"something went wrong!!!"});
    }

});

app.get("/:id",async(req,res)=>{
    const {id} = req.params;
    const data = await blogModel.findById(id);
    if(!data){
        return res.status(400).send({message:"something went wrong!!!"})
    }
    res.status(200).send({message:"response",data:data});
});

app.patch("/likes/:id",async(req,res)=>{
    const {id} = req.params;
    const data = await blogModel.findOneAndUpdate({_id:id},{$inc:{nLikes:+1}});
    res.status(200).send({message:"liked",data:data});
})

app.patch("/comments/:id",async(req,res)=>{
    const {id} = req.params;
    const data = await blogModel.findOneAndUpdate({_id:id},{$inc:{NumComments:+1}});
    res.status(200).send({message:"commented",data:data});
})

module.exports = app;