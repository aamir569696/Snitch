import axios from "axios"

const productApi=axios.create({
    baseURL:"/api",
    withCredentials:true,
})

export const createProduct = async ({formData}) => {
   const response=await productApi.post("/product",{formData})
   return response.data
}

export async function getSellerProduct() {
    const response = await productApi.get("/seller")
    return response.data
}
