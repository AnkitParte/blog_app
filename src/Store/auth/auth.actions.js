import axios from "axios";

export const LOADING = "/user/loading";
export const ERROR = "/user/error";
export const LOGIN = "/user/login";
export const LOGOUT = "/user/logout";
export const LERNULL = "/user/load/error/null"


let urlSign = "http://localhost:8080/users/signup";
let urlLog = "http://localhost:8080/users/login";
export const loginUser = (creds)=>async(dispatch)=>{
    dispatch({type:LOADING});
    try{
        let res = await axios.post(urlLog,creds)
        dispatch({type:LOGIN,payload:res.data});
    }
    catch(e){
        let message = e.response.data.message;
        let status = e.response.status
        dispatch({type:ERROR,payload:{message:message,status:status}})
    }
}
export const signupUser = (creds)=>async(dispatch)=>{
    dispatch({type:LOADING});
    try{
        let res = await axios.post(urlSign,creds);
        dispatch({type:LOGIN,payload:res.data});
        //console.log(res.data);
    }
    catch(e){
        //console.log(e)
        //console.log(e.response);
        let message = e.response.data.message;
        let status = e.response.status
        dispatch({type:ERROR,payload:{message:message,status:status}})
    }
}
export const logoutUser = ()=>({type:LOGOUT,payload:{}});