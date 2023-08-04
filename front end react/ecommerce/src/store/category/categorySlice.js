
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosGET, axiosPOST } from "../../axiosApi";



export const fetchCategory = createAsyncThunk('/category', async()=>{   
    const res = await axiosGET('mysite/category/')  
    return res.data
})




export const fetchProductBasedOnCategory = createAsyncThunk('/productCategory', async(payload)=>{

    const res = await axiosGET('mysite/productAll/')
    const allProducts = res.data
   
    const filteredProducts = allProducts.filter(product => product.category == payload.categoryId)
    console.log("Category wise product : ", filteredProducts, "category Id  : ", payload.categoryId);

   const r = await axiosGET(`mysite/pagination/?categoryId=${payload.categoryId}&page_size=${payload.page_size}&page=${payload.page}/`)
   console.log("Paginated data :  ", r.data.data);

   const data = {
    products: r.data.data.slice(0,-1),
    totalPages: r.data.data.slice(-1)
   }

   console.log("DADADDDDADDADADA : ", data);

   
    return r.data

})



export const searchProductBasedOnCategory = createAsyncThunk("/searchProductCategory", async(payload)=>{
    console.log("search and category id : ", payload.search , payload.categoryId);

    const res = await axiosPOST("mysite/searchProduct/", {search:payload.search, categoryId:payload.categoryId})
    const filteredProduct = res.data.data
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ",  filteredProduct);
    return filteredProduct


})






export const categorySlice = createSlice({
    name:"category",
    initialState:{
        categories : null,
        isLoading : false,
        error : null,
        products : null,
        totalPages: 1
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
        
        .addCase(fetchProductBasedOnCategory.pending, (state, action)=>{
            state.isLoading = true
        })

        .addCase(fetchProductBasedOnCategory.fulfilled, (state, action)=>{
           
            state.isLoading = false
            state.products = action.payload.data.slice(0,-1)
            state.totalPages = action.payload.data.slice(-1)[0] // returns [totalPages] => [totalPages][0]=> 2

        })

        .addCase(fetchProductBasedOnCategory.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.error.code
        })

        .addCase(searchProductBasedOnCategory.pending, (state, action)=>{
            state.isLoading = true
        })

        .addCase(searchProductBasedOnCategory.fulfilled, (state, action)=>{
            state.isLoading = false
            state.products = action.payload
        })
        
        .addCase(searchProductBasedOnCategory.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.error.code
        })

    }
})





export default categorySlice.reducer



