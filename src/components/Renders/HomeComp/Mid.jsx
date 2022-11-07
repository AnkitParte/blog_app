import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../../Store/blog/blog.actions";
import styles from "./mid.module.css";
import Posts from "./Posts";


export default function Mid() {
    const { data } = useSelector(store => store.blogs);
    const dispatch = useDispatch();
    //console.log(data);
    useEffect(() => {
        dispatch(getBlogs());
    }, [])
    return (<>
        
        <Box className={styles.mid}>
            {data?.map((el, i) => {
                return <Posts img={i} key={el.id} {...el} />
            })}
        </Box>
    </>)
}

/* {loading && <Box>
                <br />
                <br />
                <br />
                <Spinner
                    thickness='6px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </Box>} */