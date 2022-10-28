import { Box, Button, Input, Text, FormControl, FormLabel, Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import styles from "./login.module.css";

export default function Login() {
    const [form,setForm] = useState({});
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setForm({...form,[name]:value});
    }
    const handleSubmit = ()=>{
        if(form.email === "" || form.password.length<=4){
            alert("some thing went wrong!!!")
            return;
        }
        Array.from(document.getElementsByTagName("input")).forEach((el)=>el.value=null);
        console.log(form);
    }
    return (<>
        <Box className={styles.bg}>
            <Box className={styles.login}>
                <Box className={styles.h2tag}>Welcome to DEV Community👨‍💻👩‍💻</Box>
                <Box className={styles.divtag}>DEV Community👨‍💻👩‍💻 is a community of <span>{33678}</span> amazing developers</Box>
                <br />
                <Button w={"100%"} mt={1} color={"white"} background="black" _hover={{background:"blackAlpha.900"}} size={"lg"}>Continue with Github</Button>
                <br />
                <Button w={"100%"} mt={1} colorScheme={"twitter"} size={"lg"}>Continue with Twitter</Button>
                <br />
                <Text className={styles.text}>Have a password? Continue with your Email</Text>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" onChange={handleChange} placeholder="Enter you email address" />
                </FormControl>
                <FormControl mt={1.5}>
                    <FormLabel>Password</FormLabel>
                    <Input name="password" onChange={handleChange} placeholder="Enter your Password" />
                </FormControl>
                <Checkbox w={"100%"} mt={2} mb={2} colorScheme='blue' defaultChecked>
                    Remember me
                </Checkbox>
                <Button onClick={handleSubmit} mt={2} color={"white"} background="#3B49DF" w="100%" size={"lg"}>Continue</Button>
                <br />
                <br />
                <Box color={"#3B49DF"} fontSize="14px">I forgot my password</Box>
                
            </Box>
            <Text>This part is totally belongs to the footer</Text>
        </Box>

    </>)
}