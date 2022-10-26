import { Box} from "@chakra-ui/react";
import styles from "./right.module.css";

export default function Que({ question, comment }) {
    return (<>
        <Box className={styles.question}>
            <Box>{question}</Box>
            <Box>{comment}{" "}comment</Box>
        </Box>
    </>)
}