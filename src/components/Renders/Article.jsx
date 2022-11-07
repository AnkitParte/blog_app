import { Box, Button, Icon, Image, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ChatIcon } from "@chakra-ui/icons"
import { AiOutlineLike } from "react-icons/ai"
import { BsBookmark } from "react-icons/bs";
import styles from "./article.module.css";
import Reviews from "./Reviews";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getArticle } from "../../Store/blog/blog.actions";
//import { getComm } from "../../Store/comment/comments.actions";
import io from "socket.io-client";

export let x = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==";
//let temp = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIV6C5WdgS27fZOAJQQs1GHHmfB_XZVjrXPQ&usqp=CAU"

//let text = "I am using Astro and Preact (which has the same API as React) for a project. I ran into a issue recently where I wanted to pass a Markdown component to the Preact side of the project, and it wasn't working the way I expected.I am using Astro and Preact (which has the same API as React) for a project. I ran into a issue recently where I wanted to pass a Markdown component to the Preact side of the project, and it wasn't working the way I expected.First of all, I tried importing it into my Preact file at the top: I am using Astro and Preact (which has the same API as React) for a project. I ran into a issue recently where I wanted to pass a Markdown component to the Preact side of the project, and it wasn't working the way I expected. I am using Astro and Preact (which has the same API as React) for a project. I ran into a issue recently where I wanted to pass a Markdown component to the Preact side of the project, and it wasn't working the way I expected. I am using Astro and Preact (which has the same API as React) for a project. I ran into a issue recently where I wanted to pass a Markdown component to the Preact side of the project, and it wasn't working the way I expected. I am using Astro and Preact (which has the same API as React) for a project. I ran into a issue recently where I wanted to pass a Markdown component to the Preact side of the project, and it wasn't working the way I expected."

const socket = io.connect("https://blogappbackend-production-0245.up.railway.app/")
export default function Article() {
    const { id } = useParams();
    const { solo} = useSelector(store => store.blogs);
    const auth = useSelector(store => store.auth);
    console.log(auth.username);
    const [comm, setComm] = useState([]);
    const dispatch = useDispatch();

    const [discus, setDiscus] = useState("");
    const ref = useRef();
    const directMe = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const getData = (id) => {
        fetch(`https://blogappbackend-production-0245.up.railway.app/comments/${id}`)
            .then(res => res.json())
            .then(res => {
                //console.log(res.data[0].comments);
                setComm(res.data[0].comments);
            })
    }
    const postComment = () => {
        //console.log("comment btn")
        if (discus == "") {
            alert("type something before commenting");
            return;
        }
        let obj = {
            username: auth?.user?.username,
            comment: discus,
            delete: false,
            reply: null,
            id: id
        }
        socket.emit("add_comment", obj);
        setDiscus("");
    }

    //console.log("hello")
    useEffect(() => {
        dispatch(getArticle(id))
        getData(id);


    }, [id]);
    useEffect(() => {
        socket.on("add_comment", (data) => {
            //console.log(data)
            if (id == data.data.id) {
                console.log("article")
                //console.log([...comm,data]);
                setComm([...comm, data.data]);
            }
        });
    }, [postComment])
    // useEffect(()=>{
    //     socket.on("history",(data)=>{
    //         if(id == data.BlogId){
    //             setComm(data.comments)
    //         }
    //     })
    // },[postComment]);


    return (<>
        <Box className={styles.main}>
            <Box className={styles.sidebar}>
                <Box>
                    <Box><Icon as={AiOutlineLike} /></Box>
                    <Box>Likes</Box>
                </Box>
                <Box>
                    <Box onClick={directMe}><ChatIcon /></Box>
                    <Box>comment</Box>
                </Box>
                <Box>
                    <Box><Icon as={BsBookmark} /></Box>
                    <Box>save</Box>
                </Box>
                <Box fontSize={"22px"} fontWeight={600}>...</Box>
            </Box>
            <Box className={styles.art}>
                <Box>
                    <Image src={x} alt={solo?.Author?.username} />
                    <Box>{solo?.Author?.username}</Box>
                </Box>
                <Box>{solo?.Title}</Box>
                <Box>{solo && solo.description}</Box>
                <br />
                <hr />
                <br />
                <Box ref={ref} className={styles.comments}>
                    <Box>Top Comments {"("}{solo?.NumComments}{")"}</Box>
                    <Box>
                        <Image src={x} />
                        <Box>
                            <Textarea value={discus} onChange={(e) => setDiscus(e.target.value)} placeholder="Add to the discussion" />
                            <Button disabled={!auth.isAuth} colorScheme={"blue"} onClick={postComment}>Submit</Button><Button disabled={!auth.isAuth} ml={4}>Preview</Button>
                        </Box>
                    </Box>
                    {comm?.map((el) => {
                        return <Reviews key={el?._id} {...el} />
                    })}

                </Box>
            </Box>
            <Box className={styles.three}>
                <Box className={styles.author}>
                    <Box></Box>
                    <Box>
                        <Image src={x} />
                        <Box>{solo?.Author?.username}</Box>
                    </Box>
                    <Button colorScheme={"purple"}>Follow</Button>
                    <Box>
                        <Box>
                            <Box>User status</Box>
                        </Box>
                        <Box>
                            <Box>LOCATION</Box>
                            <Box>location</Box>
                        </Box>
                        <Box>
                            <Box>EDUCATION</Box>
                            <Box>education</Box>
                        </Box>
                        <Box>
                            <Box>WORK</Box>
                            <Box>work</Box>
                        </Box>
                        <Box>
                            <Box>JOINED</Box>
                            <Box>joined date</Box>
                        </Box>
                    </Box>
                </Box>
            </Box>



        </Box>
    </>)
}