import { COMERR, COMLOAD, GETCOM } from "./comments.actions";

let init = {
    comments:[],
    commLoad:false,
    commErr:false
}
export default function getAllComm(state=init,{type,payload}){
    switch(type){
        case COMLOAD:{
            return {...state,commLoad:true};
        }
        case COMERR:{
            return {...state,commErr:true};
        }
        case GETCOM:{
            return {...state,comments:payload,commLoad:false,commErr:false};
        }
        default :{
            return state;
        }
    }
}