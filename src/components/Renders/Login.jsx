import { Box, Button, Input, Text, FormControl, FormLabel, Checkbox, useToast, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser , LERNULL} from "../../Store/auth/auth.actions";
import styles from "./login.module.css";

let init = {email:"",password:""}
export default function Login() {
    const [form,setForm] = useState(init);
    const dispatch = useDispatch();
    const userInfo = useSelector(store=>store.auth);
    const nav = useNavigate();
    const toast = useToast();

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setForm({...form,[name]:value});
    }
    const handleSubmit = ()=>{
        if(form.email === "" || form.password.length<=4){
            toast({
                title: 'Something went wrong',
                description:"Please try again",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position:"top"
              })
            return;
        }
        dispatch(loginUser(form))
        Array.from(document.getElementsByTagName("input")).forEach((el)=>el.value=null);
        console.log(form);
    }

    if(userInfo.isAuth){
        toast({
            title: userInfo.message,
            description:"Happy Blogging",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position:"top"
          })
        //alert(userInfo.message);
        setTimeout(()=>{nav("/")},200)
    }
    if(userInfo.error){
        toast({
            title:"Something went wrong",
            description:userInfo.message,
            status:"error",
            duration:5000,
            isClosable:true,
            position:"top"
        })
        //alert(userInfo.message);
        dispatch({type:LERNULL});
    }
    return (<>
        <Box className={styles.bg}>
            <Box className={styles.login}>
                <Box className={styles.h2tag}>Welcome to DEV Community👨‍💻👩‍💻</Box>
                <Box className={styles.divtag}>DEV Community👨‍💻👩‍💻 is a community of <span>{33678}</span> amazing developers</Box>
                <br />
                <Tooltip label="this feature is under progress">
                    <Button w={"100%"} mt={1} color={"white"} background="black" _hover={{background:"blackAlpha.900"}} size={"lg"}>Continue with Github</Button>   
                </Tooltip>
                <br />
                <Tooltip label="this feature is under progress">
                    <Button w={"100%"} mt={1} colorScheme={"twitter"} size={"lg"}>Continue with Twitter</Button>
                </Tooltip>
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