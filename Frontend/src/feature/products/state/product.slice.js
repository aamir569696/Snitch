import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//import { getSellerProduct } from "../services/product.api";

const productSlice= createSlice({
    name:"product",
initialState:{
    SellerProduct:[]
},
reducers:{
    setSellerProduct:(state,action)=>{
        state.SellerProduct=action.payload
    }
}

})

export default productSlice.reducer