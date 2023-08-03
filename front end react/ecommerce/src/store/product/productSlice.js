
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosGET, axiosPOST } from "../../axiosApi";


export const fetchProduct = createAsyncThunk('/product', async(payload)=>{
    const res = await axiosGET(`mysite/product/?ordering=${payload.ordering}&page=${payload.page}&page_size=${payload.page_size}`)
    console.log("TTTT: ", res, ";;;", res.data);
    const data = {
        results : res.data.results,
        totalPages : Math.ceil(res.data.count / payload.page_size)
    }
    return data
})


export const fetchProductDetail = createAsyncThunk('/productDetail', async (productId)=>{
   
    const res = await axiosGET(`mysite/productAll/${productId}/`)
    const allData = res.data
    console.log("product detail product id : response:  ", productId, allData);   
    
   
    return allData
   
})



export const searchProduct = createAsyncThunk('/searchProduct', async (search)=>{
    const res = await axiosPOST("mysite/searchProduct/", {search:search,categoryId:null})
    const filteredProduct = res.data.data
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ",  filteredProduct);
    return filteredProduct
})


export const searchProductDetail = createAsyncThunk('searchProductDetail', async(payload)=>{

    const res = await axiosPOST("mysite/searchProductDetail/", payload)
    const filteredProduct = res.data.data
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ",  filteredProduct);
    return filteredProduct

})





const productSlice = createSlice({
    name:'product',
    initialState:{
        products: null,
        isLoading: false,
        error : null,
        productDetail : null,
        totalPages:1
    },
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(fetchProduct.pending, (state, action)=>{
            state.isLoading = true
        })

        .addCase(fetchProduct.fulfilled, (state, action)=>{
            state.isLoading = false
            state.products = action.payload.results
            state.totalPages = action.payload.totalPages
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

        .addCase(searchProduct.pending, (state, action)=>{
            state.isLoading = true
        })

        .addCase(searchProduct.fulfilled, (state, action)=>{
            state.isLoading = false
            state.products = action.payload
        })

        .addCase(searchProduct.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.error.code

        })

        .addCase(searchProductDetail.pending, (state, action)=>{
            state.isLoading = true
        })

        .addCase(searchProductDetail.fulfilled, (state, action)=>{
            state.isLoading = false
            state.productDetail = action.payload
        })

        .addCase(searchProductDetail.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.error.code

        })



    }
})




export default productSlice.reducer


