import axios from "axios";

export const LOADBLOG = "/blog/loading";
export const ERRBLOGS = "/blog/error";
export const GETBLOGS = "/blog/success";
export const GETSOLO = "/blog/solo";

let url = 'https://blogappbackend-production-0245.up.railway.app/posts/'
let deployed = "https://blogappbackend-production-0245.up.railway.app/"
export const getBlogs = ()=>async(dispatch)=>{
    dispatch({type:LOADBLOG});

    try{
        const res = await axios.get(url)
        //console.log(res);
        dispatch({type:GETBLOGS,payload:res.data.data});
    }
    catch(e){
        dispatch({type:ERRBLOGS});
    }
}

export const getArticle = (id)=>async(dispatch)=>{
    dispatch({type:LOADBLOG});

    try{
        const res = await axios.get(url+id)
        //console.log(res);
        dispatch({type:GETSOLO,payload:res.data.data});
    }
    catch(e){
        dispatch({type:ERRBLOGS});
    }
}

export const postBlog = (data)=>{
    return axios.post(url,data);
}
