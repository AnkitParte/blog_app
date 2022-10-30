import { Box, Text, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LERNULL, signupUser } from "../../Store/auth/auth.actions";
import { useDispatch,useSelector } from "react-redux";
import styles from "./signup.module.css";

let init = {email:"",username:"",password:""}
//Login page and Signup page part is similar so all components are copy of that
export default function Signup() {
    const [form,setForm] = useState(init);
    const userInfo = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const handleChange=(e)=>{
        const {name,value} = e.target;
        setForm({...form,[name]:value});
    };

    const handleSubmit=()=>{
        if(form.username.length<=3 || form.email.length<=5 || form.password.length <=5 ){
            alert("something went wrong");
            return;
        }
        dispatch(signupUser(form));
        Array.from(document.getElementsByTagName("input")).forEach(el=>el.value=null);
        //console.log(form);
    };
    if(userInfo.isAuth){
        alert(userInfo.message);
        setTimeout(()=>{nav("/")},200)
    }
    if(userInfo.error){
        alert(userInfo.message);
        dispatch({type:LERNULL});
    }
    return (<>
        <Box className={styles.bg}>
            <Box className={styles.login}>
                <Box className={styles.h2tag}>Welcome to DEV Community👨‍💻👩‍💻</Box>
                <Box className={styles.divtag}>DEV Community👨‍💻👩‍💻 is a community of <span>{33678}</span> amazing developers</Box>
                <br />
                <Button w={"100%"} mt={1} colorScheme={"green"}color={"white"} background="black" _hover={{background:"blackAlpha.900"}} size={"lg"}>Continue with Github</Button>
                <br />
                <Button w={"100%"} mt={1} colorScheme={"blue"} size={"lg"}>Continue with twitter</Button>
                <br />
                <Text className={styles.text}>Already have an account? <span className={styles.navspan} onClick={()=>nav("/login")}>Log in</span></Text>
                
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input name="username" onChange={handleChange} placeholder="Enter you username" />
                </FormControl>
                <FormControl mt={1.5}>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" onChange={handleChange} placeholder="Enter your email" />
                </FormControl>
                <FormControl mt={1.5}>
                    <FormLabel>Password</FormLabel>
                    <Input name="password" onChange={handleChange} placeholder="Enter your Password" />
                </FormControl>
                <br />
                <Button onClick={handleSubmit} mt={2} color={"white"} background="#3B49DF" w="100%" size={"lg"}>Continue</Button>
                <br />
                <br />
            </Box>
            <Text>This part is totally belongs to the footer</Text>
        </Box>

    </>)
}