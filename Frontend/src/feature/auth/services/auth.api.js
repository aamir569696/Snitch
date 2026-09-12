import axios from "axios";

const API= axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})


export const registerUser= async({email,fullname,password,contact,isSeller})=>{
    const response= await API.post("/register",{email,fullname,password,contact,isSeller})
    return response.data
}
