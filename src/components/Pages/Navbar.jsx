import { Box, Center, Text, Button, Image, Input,InputRightElement,InputGroup } from "@chakra-ui/react"
import {SearchIcon} from "@chakra-ui/icons";
import styles from "./navbar.module.css";
import { useNavigate } from "react-router-dom";

let x = "https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png";


export default function Navbar() {
    const nav = useNavigate();
    return (<>
        <Box as="div" className={styles.navbar}>
            <Box className={styles.one}>
                <Center>
                    <Image onClick={()=>nav("/")} className={styles.imgOne} src={x} alt="dev image" />
                </Center>
                <Center w="85%">
                    <InputGroup size='md'>
                        <Input
                            placeholder='search...'
                        />
                        <InputRightElement width='4.5rem'>
                            <Button size='sm' ml='1.5rem'>
                                {<SearchIcon/>}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Center>
            </Box>
            <Box className={styles.two}>
                <Center>
                    <Text className={styles.navspan} onClick={()=>nav("/login")}>Log In</Text>
                </Center>
                <Center>
                    <Button onClick={()=>nav("/signup")} size={"md"} variant="outline" color="blue" borderColor={"blue"}>Create account</Button>
                </Center>
            </Box>
        </Box>

    </>)
}