import { Box, Input, Button, Textarea, Tooltip, useToast, List, ListItem, ListIcon } from "@chakra-ui/react";
import {WarningIcon} from "@chakra-ui/icons"
import { useState } from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { postBlog } from "../../../Store/blog/blog.actions";
import styles from "./create.module.css";

export default function CreateBlog() {
    //const [alertOne, setAlert] = useState(false);
    const nav = useNavigate();
    const userInfo = useSelector(store=>store.auth);
    const toast = useToast();

    let temp = {id:userInfo?.user?._id,username:userInfo?.user?.username,title:"",data:""}
    const [post,setPost] = useState(temp);
    const handleChange = (e)=>{
        const {name,value} = e.target;
        //let val = (name=="data")?JSON.stringify(value):value;
        setPost({...post,[name]:value});
    }
    const handleSubmit = async()=>{
        //console.log(post);
        if(post.title.length<=3){
            toast({
                title:"Missing Title",
                description:"please provide a Title to your Blog",
                isClosable:true,
                status:"warning",
                position:"top",
                duration:15000
            })
            //alert("please provide a Title to your post")
            return;
        }
        if(post.data.length<=5){
            toast({
                title:"Blog content is missing",
                description:"please provide some data in text field",
                isClosable:true,
                status:"warning",
                position:"top",
                duration:15000
            })
            //alert("please provide some data in text field");
            return;
        }
        await postBlog(post);
        toast({
            title:"Blog publish Successful",
            description:"Go to Daily feed to check",
            isClosable:true,
            status:"success",
            position:"top",
            duration:10000
        })
        Array.from(document.getElementsByTagName("input")).forEach((el)=>el.value=null);
        Array.from(document.getElementsByTagName("textarea")).forEach(el=>el.value=null)

    }
    const handleAlert = () => {
        toast({
            title:"Under Progress",
            description:"Feature is in progress",
            isClosable:true,
            status:"info",
            position:"top",
            duration:10000
        })
    }

    if(!userInfo.isAuth){
        nav("/");
    }
    return (<>
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
                <br />
                <br />
                <br />
                <List fontSize={16} fontWeight={600}>
                    <ListItem>
                        <ListIcon as={WarningIcon} color="blackAlpha.500"/>
                        please only write plain text in your blog other features are under progress 
                    </ListItem>
                </List>
            </Box>
        </Box>
    </>)
}