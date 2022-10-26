import { Box, Button, Input, Text, FormControl, FormLabel, Checkbox } from "@chakra-ui/react";
import styles from "./login.module.css";

export default function Login() {
    return (<>
        <Box className={styles.bg}>
            <Box className={styles.login}>
                <Box className={styles.h2tag}>Welcome to DEV Community👨‍💻👩‍💻</Box>
                <Box className={styles.divtag}>DEV Community👨‍💻👩‍💻 is a community of <span>{33678}</span> amazing developers</Box>
                <br />
                <Button w={"100%"} mt={1} colorScheme={"green"} size={"lg"}>Continue with Github</Button>
                <br />
                <Button w={"100%"} mt={1} colorScheme={"blue"} size={"lg"}>Continue with Google</Button>
                <br />
                <Text className={styles.text}>Have a password? Continue with your Email</Text>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder="Enter you email address" />
                </FormControl>
                <FormControl mt={1.5}>
                    <FormLabel>Password</FormLabel>
                    <Input placeholder="Enter your Password" />
                </FormControl>
                <Checkbox w={"100%"} mt={2} mb={2} colorScheme='blue' defaultChecked>
                    Remember me
                </Checkbox>
                <Button mt={2} color={"white"} background="#3B49DF" w="100%" size={"lg"}>Continue</Button>
                <br />
                <br />
                <Box color={"#3B49DF"} fontSize="14px">I forgot my password</Box>
                
            </Box>
            <Text>This part is totally belongs to the footer</Text>
        </Box>

    </>)
}