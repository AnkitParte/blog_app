import { ERROR, LERNULL, LOADING, LOGIN, LOGOUT } from "./auth.actions";

let prereq = JSON.parse(localStorage.getItem("user")) || {user:{},token:"",refresh:""};
let isAuth = (prereq.user._id)?true:false;

const initial = {
    user:prereq.user,
    token:prereq.token,
    refresh:prereq.refresh,
    isAuth:isAuth,
    loading:false,
    error:false,
    message:"null"
}

export default function authReducer(state=initial,{type,payload}){
    switch(type){
        case LOADING:{
            return {...state,loading:true}
        }
        case ERROR: {
            return {...state,
                error:true,
                message:payload.message
            }
        }
        case LOGOUT:{
            window.localStorage.removeItem("user");
            return {...state,user:payload,isAuth:false,token:"",refresh:"",loading:false,error:false}
        }
        case LOGIN:{
            window.localStorage.setItem("user",JSON.stringify({user:payload.user,
                token:payload.token, refresh:payload.refresh}));
            return {...state,
                user:payload.user,
                token:payload.token,
                refresh:payload.refresh,
                isAuth:true,
                loading:false,
                error:false, message:payload.message}
        }
        case LERNULL:{
            return {...state,error:false,loading:false}
        }
        default:{
            return state;
        }
    }
}

