import { Box } from "@chakra-ui/react";
import Left from "./HomeComp/Left";
import Mid from "./HomeComp/Mid";
import Right from "./HomeComp/Right";
import styles from "./homepage.module.css";

export default function Homepage() {

    return (<>
        <Box className={styles.bg}>
            <Box className={styles.sgrid}>
                <Box className={styles.topics}>
                    <Left/>
                </Box>
                <Box className={styles.content}>
                    <p className={styles.feed}>Daily feed</p>
                    <Mid/>
                </Box>
                <Box className={styles.interests}>
                    <Right/>
                </Box>
            </Box>
        </Box>

    </>)
}