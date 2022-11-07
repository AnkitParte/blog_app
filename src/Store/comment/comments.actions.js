import axios from "axios";

export const COMLOAD = "/comm/load";
export const COMERR = "/comm/err";
export const GETCOM = "/comm/get";

let url = "https://blogappbackend-production-0245.up.railway.app/comments/";

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