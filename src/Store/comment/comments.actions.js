import axios from "axios";

export const COMLOAD = "/comm/load";
export const COMERR = "/comm/err";
export const GETCOM = "/comm/get";

let url = "http://localhost:8080/comments/";

export const getComm = (id)=>async(dispatch)=>{
    dispatch({type:COMLOAD});
    try{
        const res = await axios.get(url+id);
        dispatch({type:GETCOM,payload:res.data.data});
    }
    catch(e){
        dispatch({type:COMERR})
    }
}