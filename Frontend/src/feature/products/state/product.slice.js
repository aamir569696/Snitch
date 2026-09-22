import { createSlice } from "@reduxjs/toolkit";
//import { getSellerProduct } from "../services/product.api";

const productSlice= createSlice({
    name:"product",
initialState:{
    sellerProducts:[],
   
},
reducers:{
    setSellerProduct:(state,action)=>{
        state.sellerProducts=action.payload
    },


}

})

export const { setSellerProduct} = productSlice.actions

export default productSlice.reducer