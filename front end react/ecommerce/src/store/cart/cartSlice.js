
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosGET, axiosPOST, axiosPUT } from "../../axiosApi";


export const updateCartItem = createAsyncThunk('/updateCartItem', async(payload)=>{
try{
    // const res = await axiosPOST('mysite/cartItem/', payload)
    const result = await axiosGET('mysite/cartItem/')
    const allData = result.data
    const newData = allData.filter(data => data.product_detail == payload.payload.product_detail)

    console.log("NNNNNNNNNNN :         ", newData, "productDetail : ", payload.item );

    if(newData.length != 0){
        const res = await axiosPUT(`mysite/cartItem/${newData[0].id}/`, payload.payload)
        // var data = payload.item
        // data["quntity"] = payload.payload.quantity
        // return data

    }
    else{
        const res = await axiosPOST(`mysite/cartItem/`, payload.payload)
       
    }

    var data = payload.item
    data["quntity"] = payload.payload.quantity
    return data
    // return payload.item
}catch(error){
    console.log("Error while adding item to cart ::::; ", error);
}
})



const cartSlice = createSlice({
    name:'cart',
    initialState:{
        isCartOpen: false,
        cartTotal : 0,
        cartCount : 0,
        cartItems: []
    },
    reducers:{
        addCartItem: (state, action)=>{
            state.cartItems = action.payload
        }
    },

    extraReducers(builder){
        builder
        .addCase(updateCartItem.fulfilled, (state, action)=>{
            const {productDetailId} = action.payload
            const isAlreadyExist = state.cartItems.filter((item)=> item.productDetailId == productDetailId )
           console.log("BBBBBBB ", productDetailId, isAlreadyExist);
            if(isAlreadyExist.length != 0){
                console.log("Already exist !!");
                // const quantity = action.payload.quantity
                // state.cartItems.map((item)=> item.productDetailId == productDetailId ? item.quantity = quantity : null)
            }
            else{
                state.cartItems.push(action.payload)
            }
            // state.cartItems.push(action.payload)
            state.cartCount = state.cartCount + 1
            state.cartTotal = state.cartTotal + 1


        })
        
        
    }
})




export default cartSlice.reducer

