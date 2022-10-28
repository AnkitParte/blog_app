import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getBlogs } from "../../../Store/blog/blog.actions";
import styles from "./mid.module.css";
import Posts from "./Posts";

const posts = [
    {id:1,user:"Lucas rom",title:"Improve Code in Your Ruby Application with RubyCritic",comment:34},
    {id:2,user:"Jack Hid",title:"Vue vs. Angular: Which is better for front-end development? (2022)",comment:3},
    {id:3,user:"Chris wayne",title:"Remove Letter To Equalize Frequency",comment:45},
    {id:4,user:"Kim blank",title:"Scraping Linkedin Data with Proxycurl, Python Program, and Nodejs",comment:8},
    {id:5,user:"Sken claw",title:"25 Projects For Beginner to Advanced Developers With Free Tutorials",comment:16},
]


export default function Mid() {
    const {data} = useSelector(store=>store.blogs);
    const dispatch = useDispatch();
    //console.log(data);
    useEffect(()=>{
        dispatch(getBlogs());
    },[])
    return (<>
        <Box className={styles.mid}>
            {data?.map((el)=>{
                return <Posts key={el.id} {...el}/>
            })}
        </Box>
    </>)
}