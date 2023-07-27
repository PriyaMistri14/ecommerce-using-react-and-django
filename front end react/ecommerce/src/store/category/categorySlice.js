
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosGET } from "../../axiosApi";



export const fetchCategory = createAsyncThunk('/category', async()=>{   
    const res = await axiosGET('mysite/category/')  
    return res.data
})





export const categorySlice = createSlice({
    name:"category",
    initialState:{
        categories : null,
        isLoading : false,
        error : null
    },
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(fetchCategory.pending, (state, action)=>{
            state.isLoading = true
        })

        .addCase(fetchCategory.fulfilled, (state, action)=>{
            state.isLoading= false
            state.categories = action.payload

        })

        .addCase(fetchCategory.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.error.code
        })
    }
})





export default categorySlice.reducer



