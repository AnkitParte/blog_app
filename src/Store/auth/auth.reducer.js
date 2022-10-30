import { ERROR, LERNULL, LOADING, LOGIN, LOGOUT } from "./auth.actions";


const initial = {
    user:{},
    token:"",
    refresh:"",
    isAuth:false,
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
            return {...state,user:payload,isAuth:false,token:"",refresh:"",loading:false,error:false}
        }
        case LOGIN:{
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

