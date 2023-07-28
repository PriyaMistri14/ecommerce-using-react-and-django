
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosGET, axiosPATCH, axiosPOST, axiosPUT } from "../../axiosApi";


export const updateCartItem = createAsyncThunk('/updateCartItem', async (payload) => {
    try {
        // const res = await axiosPOST('mysite/cartItem/', payload)
        const result = await axiosGET('mysite/cartItem/')
        const allData = result.data
        const newData = allData.filter(data => data.product_detail == payload.payload.product_detail)

        console.log("NNNNNNNNNNN :         ", newData, "productDetail : ", payload.item.productDetail, "whole product : ", payload.item.wholeProduct);


        const quantity =newData.length != 0 ? newData[0].quantity + 1 : 1

        console.log("QUANTITYYYYY :  PPPPPPPPPPPPPPPPPPPPPP:  ",quantity );


        if (newData.length != 0) {
            
            const res = await axiosPUT(`mysite/cartItem/${newData[0].id}/`,{user : payload.payload.user, product_detail: payload.payload.product_detail, quantity:quantity})
            // var data = payload.item
            // data["quntity"] = payload.payload.quantity
            // return data

        }
        else {
            const res = await axiosPOST(`mysite/cartItem/`, {user : payload.payload.user, product_detail: payload.payload.product_detail, quantity: 1})

        }



        const res = await axiosPATCH(`mysite/productDetail/${payload.item.productDetail.id}/`, {available_quantity: payload.item.productDetail.available_quantity - 1 })

        console.log("AFTER updateting available quantity :  ", res);

        const data = {
            productId: payload.item.wholeProduct.id,
            productDetailId: payload.item.productDetail.id,
            quantity: quantity ,
            price: payload.item.wholeProduct.price,
            image: payload.item.wholeProduct.imageUrl,
            name: payload.item.wholeProduct.name,
            color: payload.item.productDetail.available_color,
            size: payload.item.productDetail.available_size

        }



        return data
        // return payload.item
    } catch (error) {
        console.log("Error while adding item to cart ::::; ", error);
    }
})



const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        isCartOpen: false,
        cartTotal: 0,
        cartCount: 0,
        cartItems: []
    },
    reducers: {
        setIsCartOpen: (state, action) => {
            state.isCartOpen = !state.isCartOpen
        }
    },

    extraReducers(builder) {
        builder
            .addCase(updateCartItem.fulfilled, (state, action) => {
                const { productDetailId , quantity, price} = action.payload
                const isAlreadyExist = state.cartItems.filter((item) => item.productDetailId == productDetailId)
                
                if (isAlreadyExist.length != 0) {
                    console.log("Already exist !!");               
                   state.cartItems.map((item)=> item.productDetailId == productDetailId ? item.quantity = quantity : item.quantity = item.quantity )
                
                }
                else {
                    state.cartItems.push(action.payload)
                }
                
                state.cartCount = state.cartCount + 1
                state.cartTotal = state.cartTotal + price
            


            })


    }
})


export const  {setIsCartOpen} = cartSlice.actions

export default cartSlice.reducer

