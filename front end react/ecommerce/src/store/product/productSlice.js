
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosGET } from "../../axiosApi";


export const fetchProduct = createAsyncThunk('/product', async()=>{
    const res = await axiosGET("mysite/product/")
    return res.data
})


export const fetchProductDetail = createAsyncThunk('/productDetail', async (productId)=>{
    const res = await axiosGET("mysite/productDetail/")
    const allData = res.data
    const newData =  allData.filter((data) => data.product == productId)
    console.log("Data after filter :  ", allData, "new data", newData); 
    return newData

})




const productSlice = createSlice({
    name:'product',
    initialState:{
        products: null,
        isLoading: false,
        error : null,
        productDetail : null
    },
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(fetchProduct.pending, (state, action)=>{
            state.isLoading = true
        })

        .addCase(fetchProduct.fulfilled, (state, action)=>{
            state.isLoading = false
            state.products = action.payload
        })

        .addCase(fetchProduct.rejected, (state, action)=>{
            state.isLoading =  false
            state.error = action.error.code
        })

        .addCase(fetchProductDetail.pending, (state, action)=>{
            state.isLoading = true
        })

        .addCase(fetchProductDetail.fulfilled, (state, action)=>{
            state.isLoading = false
            state.productDetail = action.payload
        })

        .addCase(fetchProductDetail.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.error.code
        })
    }
})




export default productSlice.reducer


