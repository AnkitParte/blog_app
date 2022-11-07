const express = require('express')
const cors = require("cors");
const http = require("http")
const {Server} = require("socket.io");

const connect = require("../config/config")
const dotenv = require("dotenv");
dotenv.config();

const app = express()

const port = process.env.port || 8080;
const mongo = process.env.mongo_url;
const userRouter = require("../features/users/users.router");
const postRouter = require("../features/blogs/blogs.router");
const commentRouter = require("../features/comments/comments.router");
const commentModel = require("../features/comments/comments.model");
const blogModel = require("../features/blogs/blogs.model");

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["POST","GET","PATCH","PUT","DELETE"]
    }
})

// let history = [
//     {_id:1,username:"one",comment:"one comment"},
//     {_id:2,username:"Two",comment:"Two comment"},
//     {_id:3,username:"Three",comment:"Three comment"},
//     {_id:4,username:"four",comment:"four comment"},
// ]

io.on("connection",(socket)=>{
    console.log("connection added");
    
    
    // socket.on("get_history",async(data)=>{
    //     let id = data.id;
    //     let blog = await commentModel.findOne({BlogId:id});
    //     if(!blog){
    //         io.emit("history",[]);
    //         //console.log("null")
    //     }else{
    //         console.log("emit history");
    //         io.emit("history",blog);
    //     }
    //     //console.log(id);
    // });
    socket.on("add_comment",async(data)=>{
        let {id} = data;
        let blogComm = await commentModel.findOne({BlogId:id});
        if(!blogComm){
            let blog = await commentModel.create({BlogId:id,comments:[data]});
            const maybe = await blogModel.findOneAndUpdate({_id:id},{$inc:{NumComments:+1}});
            //let newComm = blog.comments;
            //console.log("null")
            io.emit("add_comment",{id:id,data:data});
        }else{
            let newComm = [...blogComm.comments,data];
            let updateComm = await commentModel.findOneAndUpdate({BlogId:id},{comments:newComm});
            const maybe = await blogModel.findOneAndUpdate({_id:id},{$inc:{NumComments:+1}});
            //console.log("proved")
            io.emit("add_comment",{id:id,data:data});
        }
    })
})

app.get('/', (req, res) => res.send('hello'))

app.use("/users",userRouter);
app.use("/posts",postRouter);
app.use("/comments",commentRouter);



server.listen(port, async () => {
    await connect(mongo);
    console.log('server started 100%');
})