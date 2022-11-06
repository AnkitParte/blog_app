import { Box, Button, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./left.module.css"

export default function Left() {
    const userInfo = useSelector(store=>store.auth);
    //const [log,setLog] = useState(userInfo.isAuth);
    const nav = useNavigate();
    return (<>
        {!userInfo?.isAuth && <Box className={styles.topicsBox}>
            <Box>
                <span style={{ color: "#3B49DF" }}>DEV Community</span><span>👨‍💻👩‍💻</span>
                is a community of 33678 developers
            </Box>
            <Box>
                We're a place where coders share, stay up-to-date and grow their careers.
            </Box>
            <Button mt={2} w="100%" onClick={() => nav("/signup")} size={"md"} variant="outline" color="blue" borderColor={"blue"}>Create account</Button>
            <Text className={styles.navspan} onClick={() => nav("/login")}>Log In</Text>
        </Box>}
        <br />
        <Box className={styles.features}>
            <Box>🌍{" "}Home</Box>
            <Box>📜{" "}Listings</Box>
            <Box>🎬{" "}Podcasts</Box>
            <Box>🎥{" "}Videos</Box>
            <Box>🏷{" "}Tags</Box>
            <Box>🏴{" "}Forums</Box>
            <Box>💎{" "}Sponsors</Box>
            <Box>🚀{" "}Contact</Box>
            <Box>🏇{" "}Guides</Box>
        </Box>
        <Text pl={4} pt={3} pb={3} fontWeight={700} fontSize={17} textAlign="left">Others</Text>
        <Box className={styles.others}>
            <Box>⚙{" "}Code of conduct</Box>
            <Box>🎓{" "}Terms of use</Box>
            <Box>🛡{" "}Privacy policy</Box>
        </Box>

    </>)
}