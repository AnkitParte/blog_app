import { Box, Input, Button, Tooltip, useToast, List, ListItem, ListIcon } from "@chakra-ui/react";
import {WarningIcon} from "@chakra-ui/icons"
import { useState } from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { postBlog } from "../../../Store/blog/blog.actions";
import styles from "./create.module.css";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import "./ql.css"
import parse from "html-react-parser";

export default function CreateBlog() {
    //const [alertOne, setAlert] = useState(false);
    const nav = useNavigate();
    const userInfo = useSelector(store=>store.auth);
    const toast = useToast();

    let temp = {id:userInfo?.user?._id,username:userInfo?.user?.username,title:"",data:""}
    const [content,setContent] = useState("");
    const [post,setPost] = useState(temp);
    const [preview,setPreview] = useState(false);
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
        if(content.length<=2){
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
        const publish = {...post,data:content};
        await postBlog(publish);
        toast({
            title:"Blog publish Successful",
            description:"Go to Daily feed to check",
            isClosable:true,
            status:"success",
            position:"top",
            duration:10000
        })
        Array.from(document.getElementsByTagName("input")).forEach((el)=>el.value=null);
        //Array.from(document.getElementsByTagName("textarea")).forEach(el=>el.value=null)
        setContent("");

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
                <Tooltip label={!preview?"How your content is looking":"Go to Editor"}>
                    <Button ml="10px" onClick={()=>setPreview(!preview)}>{!preview?"Preview":"Editor"}</Button>
                </Tooltip>
                <Input name="title" placeholder="New Post Title here..." variant={"unstyled"} onChange={handleChange}/>
                {/* <Textarea name="data" placeholder="write your post content here..." onChange={handleChange}/> */}
                {!preview?
                    <ReactQuill value={content} onChange={setContent} theme="snow" placeholder="write you post content here"/>
                :
                    <Box className={styles.previewDiv}>{parse && parse(content?content:"No data was being provided.")}</Box>
                }
                <Box className={styles.btnDiv}>
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
                        Please try to utilize the editor features they can help you to express your thoughts better.
                    </ListItem>
                </List>
            </Box>
        </Box>
    </>)
}