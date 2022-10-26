import { Box, Text } from "@chakra-ui/react";
import Que from "./Que";
import styles from "./right.module.css";

const help = [
    {id:1,question:"Starting with CLOUD?",comment:4},
    {id:2,question:"Software Developer Interview",comment:7},
    {id:3,question:"Unique Major Project Ideas",comment:12},
]

const discuss = [
    {id:1,question:"How far off AI creating music?",comment:4},
    {id:2,question:"Meme Monday",comment:7},
    {id:3,question:"What do you think is the best time to post on DEV?",comment:12},
]

const explain = [
    {id:1,question:"Please explain me why I need software architect?",comment:4},
    {id:2,question:"What is JSX?",comment:7},
    {id:3,question:"Explain 'The Clound' like i am five.",comment:12},
]

export default function Right() {
    return (<>
        <Box className={styles.parent}>
            <Box className={styles.help}>
                <Text>#help</Text>
                {help?.map((el)=>{
                    return <Que key={el.id} question={el.question} comment={el.comment}/>
                })}
            </Box>
            <Box className={styles.discuss}>
                <Text>#discuss</Text>
                {discuss?.map((el)=>{
                    return <Que key={el.id} question={el.question} comment={el.comment}/>
                })}
            </Box>
            <Box className={styles.explikeimfive}>
                <Text>#explainlikeimfive</Text>
                {explain?.map((el)=>{
                    return <Que key={el.id} question={el.question} comment={el.comment}/>
                })}
            </Box>
        </Box>

    </>)
}