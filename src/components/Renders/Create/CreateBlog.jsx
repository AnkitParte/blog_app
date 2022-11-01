import { Box, Input, Button, Textarea, Alert, AlertIcon, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { postBlog } from "../../../Store/blog/blog.actions";
import styles from "./create.module.css";

export default function CreateBlog() {
    const [alertOne, setAlert] = useState(false);
    const nav = useNavigate();
    const userInfo = useSelector(store=>store.auth);

    let temp = {id:userInfo?.user?._id,username:userInfo?.user?.username,title:"",data:""}
    const [post,setPost] = useState(temp);
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setPost({...post,[name]:value});
    }
    const handleSubmit = ()=>{
        //console.log(post);
        if(post.title.length<=3){
            alert("please provide a Title to your post")
            return;
        }
        if(post.data.length<=5){
            alert("please provide some data in text field");
            return;
        }
        postBlog(post);
        Array.from(document.getElementsByTagName("input")).forEach((el)=>el.value=null);
        Array.from(document.getElementsByTagName("textarea")).forEach(el=>el.value=null)

    }
    const handleAlert = () => {
        setAlert(true);
        setTimeout(() => {
            setAlert(false);
        }, 500)
    }

    if(!userInfo.isAuth){
        nav("/");
    }
    return (<>
        {alertOne &&
            <>
                <Alert status='info'>
                    <AlertIcon />
                    Feature is under progress
                </Alert>
            </>}
        <Box className={styles.parent}>
            <Box>
                <Tooltip label="This feature is under progress">
                    <Button onClick={handleAlert}>Add cover image</Button>
                </Tooltip>
                <Input name="title" placeholder="New Post Title here..." variant={"unstyled"} onChange={handleChange}/>
                <Textarea name="data" placeholder="write your post content here..." onChange={handleChange}/>
                <Box>
                    <Box><Button colorScheme={"blue"} onClick={handleSubmit}>Publish</Button></Box>
                    <Box><Button onClick={()=>nav("/")}>Cancel</Button></Box>
                </Box>
            </Box>
            <Box>
                
            </Box>
        </Box>
    </>)
}