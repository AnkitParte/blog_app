import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css";

//Login page and Signup page part is similar so all components are copy of that
export default function Signup() {
    const nav = useNavigate();
    return (<>
        <Box className={styles.bg}>
            <Box className={styles.login}>
                <Box className={styles.h2tag}>Welcome to DEV Community👨‍💻👩‍💻</Box>
                <Box className={styles.divtag}>DEV Community👨‍💻👩‍💻 is a community of <span>{33678}</span> amazing developers</Box>
                <br />
                <Button w={"100%"} mt={1} colorScheme={"green"}color={"white"} background="black" _hover={{background:"blackAlpha.900"}} size={"lg"}>Continue with Github</Button>
                <br />
                <Button w={"100%"} mt={1} colorScheme={"blue"} size={"lg"}>Continue with Google</Button>
                <br />
                <Text className={styles.text}>Already have an account? <span className={styles.navspan} onClick={()=>nav("/login")}>Log in</span></Text>
                

            </Box>
            <Text>This part is totally belongs to the footer</Text>
        </Box>

    </>)
}