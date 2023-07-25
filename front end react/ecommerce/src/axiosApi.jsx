
import axios from 'axios'
export const baseUrl = "http://127.0.0.1:8000/"







export const axiosIntance = axios.create({
    baseURL: baseUrl,
    timeout:5000,
    headers:{
        'Authorization': 'JWT ' + localStorage.getItem("access_token"),
        'Content-Type':'application/json',
        'accept': 'application/json'
    }
})


export const axiosGET = async(url)=>{
    const res = await axiosIntance.get(baseUrl + url)
    console.log("URL:  ", url, "whole url :  ", baseUrl+url, "resss:  ", res, "in get");
    return res

}


export const axiosPOST = async (url, payload)=>{
    const res = await axiosIntance.post(baseUrl +url, payload)
    console.log("URL:  ", url, "whole url :  ", baseUrl+url, "resss:  ", res, "Payload: ", payload, "in post");
    return res

}



export const axiosDELETE = async (url) =>{
    const res = await axiosIntance.delete(baseUrl + url)
    console.log("URL:  ", url, "whole url :  ", baseUrl+url, "resss:  ", res,  "in delete");
    return res
}




export const axiosPUT = async (url, payload)=>{
    const res = await axiosIntance.put(baseUrl +url, payload)
    console.log("URL:  ", url, "whole url :  ", baseUrl+url, "resss:  ", res, "Payload: ", payload, "in post");
    return res

}




