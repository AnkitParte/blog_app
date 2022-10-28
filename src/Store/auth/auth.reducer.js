import { ERROR, LOADING, LOGIN, LOGOUT } from "./auth.actions";


const initial = {
    user:{},
    token:"",
    refresh:"",
    isAuth:false,
    loading:true,
    error:true
}

export default function authReducer(state=initial,{type,payload}){
    switch(type){
        case LOADING:{
            return {...state,loading:true}
        }
        case ERROR: {
            return {...state,error:true}
        }
        case LOGOUT:{
            return {...state,user:payload,isAuth:false,token:"",refresh:"",loading:true,error:true}
        }
        case LOGIN:{
            return {...state,user:payload.user,token:payload.token,refresh:payload.refresh,isAuth:true,loading:false,error:false}
        }
        default:{
            return state;
        }
    }
}

