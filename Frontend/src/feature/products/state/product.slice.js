import { createSlice } from "@reduxjs/toolkit";
//import { getSellerProduct } from "../services/product.api";

const productSlice= createSlice({
    name:"product",
initialState:{
    SellerProduct:[],
    products: []
},
reducers:{
    setSellerProduct:(state,action)=>{
        state.SellerProduct=action.payload
    },
setProducts:(state,action)=>{
state.products=action.payload
}

}

})

export const { setSellerProduct,setProducts } = productSlice.actions

export default productSlice.reducer