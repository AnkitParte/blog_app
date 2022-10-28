import { ERRBLOGS, GETBLOGS, GETSOLO, LOADBLOG } from "./blog.actions";


const init = {
    data : [],
    loading:false,
    error:false,
    solo:{}
}
export default function getAllBlogs(state=init,{type,payload}){
    switch(type){
        case ERRBLOGS:{
            return {...state,error:true}
        }
        case LOADBLOG:{
            return {...state,loading:true}
        }
        case GETBLOGS:{
            return {...state,data:payload,error:false,loading:false}
        }
        case GETSOLO:{
            return {...state,solo:payload,error:false,loading:false}
        }
        default:{
            return state
        }
    }
}