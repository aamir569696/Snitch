import axios from "axios";

const API= axios.create({
    baseURL: "api/auth",
    withCredentials: true
})


export const registerUser= async({email,fullname,password,contact,isSeller})=>{
    const response= await API.post("/register",{email,fullname,password,contact,isSeller})
    return response.data
}

export const loginUser= async({email,password})=>{
    const response= await API.post("/login",{email,password})
    return response.data
}

export async function getMe() {
    const response=await API.get("/me")
    return response.data
}