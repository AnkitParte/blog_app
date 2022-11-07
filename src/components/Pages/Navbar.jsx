import { Box, Center, Button, Image, Input, InputRightElement, InputGroup ,Tooltip} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons";
import styles from "./navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {x} from "../Renders/Article"
import { useState } from "react";
import Logout from "./Logout";

let logo = "https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png";


export default function Navbar() {
    const nav = useNavigate();
    const userInfo = useSelector(store => store.auth);
    const [logout,setLogout] = useState(false);
    return (<>
        {logout && <Logout isOpen={logout} onClose={()=>setLogout(false)}/>}
        <Box as="div" className={styles.navbar}>
            <Box className={styles.one}>
                <Center>
                    <Image onClick={()=>nav("/")} className={styles.imgOne} src={logo} alt="dev image" />
                </Center>
                <Center w="85%">
                    <InputGroup size='md'>
                        <Input
                            placeholder='search...'
                        />
                        <InputRightElement width='4.5rem'>
                        <Tooltip label='this feature is under progress'>
                            <Button size='sm' ml='1.5rem'>
                                {<SearchIcon />}
                            </Button>
                        </Tooltip>
                        </InputRightElement>
                    </InputGroup>
                </Center>
            </Box>
            <Box className={styles.two}>
                {!userInfo.isAuth ?
                    (<><Center>
                        <Button fontWeight={400} className={styles.navspan} onClick={() => nav("/login")}>Log In</Button>
                    </Center>
                        <Center>
                            <Button ml={2} onClick={() => nav("/signup")} size={"md"} variant="outline" color="blue" borderColor={"blue"}>Create account</Button>
                        </Center></>)
                    :
                    (<>
                        <Center>
                            <Button onClick={() => nav("/createblog")} size={"md"} variant="outline" color="blue" borderColor={"blue"}>Create Post</Button>
                        </Center>
                        <Center mr={10}>
                            <Image  onClick={() => setLogout(true)} className={styles.imgOne} src={x} alt="dev image" />
                        </Center>
                    </>)}
            </Box>
        </Box>

    </>)
}