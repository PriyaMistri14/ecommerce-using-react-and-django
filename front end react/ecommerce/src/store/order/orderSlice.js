import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPATCH, axiosPOST } from "../../axiosApi";



export const orderItem = createAsyncThunk('/orderProduct', async(payload)=>{
  
    const res = await axiosPOST('mysite/order/', payload.payload)
    
    var data = payload.otherDetails

    data['orderStatus'] = res.data.status
    data['date'] = res.data.created_at
    data['orderId'] = res.data.id
  
    return data
    
})


export const changeOrderStatus = createAsyncThunk('/changeOrderStatus', async (payload)=>{

    const res = await axiosPATCH(`mysite/order/${payload.orderId}/`, {status : payload.orderStatus})
   
    // Success => payment done => 
    // Cancelled => without payment

    return payload


})






export const orderSlice= createSlice({
    name:'order',
    initialState:{
        orderedItems : [],
        isLoading:false,
        error: null,
      
    },
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(orderItem.pending, (state, action)=>{
            state.isLoading = true
        })
        .addCase(orderItem.fulfilled, (state, action) =>{
            console.log("Action payload : ", action.payload);
            state.isLoading = false
            state.orderedItems.push(action.payload)
           
            
        
        })
        .addCase(orderItem.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.error.code
        })

        .addCase(changeOrderStatus.fulfilled, (state, action)=>{

            console.log("payload  : ", action.payload);

            const {orderId, orderStatus} = action.payload

            state.orderedItems.map((item) => item.orderId == orderId ? item.orderStatus = orderStatus : item.orderStatus = item.orderStatus)


        })

  
    }


})




export default orderSlice.reducer
