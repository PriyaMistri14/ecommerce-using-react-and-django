
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosDELETE, axiosGET, axiosPATCH, axiosPOST, axiosPUT } from "../../axiosApi";


import { fetchProductDetail } from "../product/productSlice";




export const updateCartItem = createAsyncThunk('/updateCartItem', async (payload,{dispatch}) => {
    try {
        const result = await axiosGET('mysite/cartItem/')
        const allData = result.data
        const newData = allData.filter(data => data.product_detail == payload.payload.product_detail)

        console.log("NNNNNNNNNNN :         ", newData, "productDetail : ", payload.item.productDetail, "whole product : ", payload.item.wholeProduct);


        const quantity = newData.length != 0 ? newData[0].quantity + 1 : 1

        console.log("QUANTITYYYYY :  PPPPPPPPPPPPPPPPPPPPPP:  ", quantity);


        if (newData.length != 0) {

            const res = await axiosPUT(`mysite/cartItem/${newData[0].id}/`, { user: payload.payload.user, product_detail: payload.payload.product_detail, quantity: quantity })
            // var data = payload.item
            // data["quntity"] = payload.payload.quantity
            // return data

        }
        else {
            const res = await axiosPOST(`mysite/cartItem/`, { user: payload.payload.user, product_detail: payload.payload.product_detail, quantity: 1 })

        }
       

        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>QUANTITYYY : ", payload.item.productDetail.available_quantity);

        const res = await axiosPATCH(`mysite/productDetail/${payload.item.productDetail.id}/`, { available_quantity: payload.item.productDetail.available_quantity - 1 })

        console.log("AFTER updateting available quantity :  ", res);

        await dispatch(fetchProductDetail(payload.item.wholeProduct.id))

        const data = {
            productId: payload.item.wholeProduct.id,
            productDetailId: payload.item.productDetail.id,
            quantity: quantity,
            price: payload.item.wholeProduct.price,
            image: payload.item.wholeProduct.imageUrl,
            name: payload.item.wholeProduct.name,
            color: payload.item.productDetail.available_color,
            size: payload.item.productDetail.available_size,
            available_quantity: payload.item.productDetail.available_quantity

        }



        return data
        // return payload.item
    } catch (error) {
        console.log("Error while adding item to cart ::::; ", error);
    }
})


export const removeCartItem = createAsyncThunk('/removeCartItem', async (payload) => {
    const result = await axiosGET('mysite/cartItem/')
    const allData = result.data
    const newData = allData.filter(data => data.product_detail == payload.productDetailId)

    const quantity = newData.length != 0 && newData[0].quantity - 1

    if (newData.length != 0 && quantity > 0) {
        const res = await axiosPATCH(`mysite/cartItem/${newData[0].id}/`, { quantity: quantity })
    }
    else {
        const res = await axiosDELETE(`mysite/cartItem/${newData[0].id}/`)
    }

    const productDetail = await axiosGET(`mysite/productDetail/${payload.productDetailId}/`)
    const resProductDetail = productDetail.data
    const available_quantity = resProductDetail.available_quantity + 1
    console.log("avalable quantiry", available_quantity);

    const res = await axiosPATCH(`mysite/productDetail/${payload.productDetailId}/`, { available_quantity: available_quantity })

    console.log("AFTER updateting available quantity :  ", res);


    const data = {
        productDetailId: payload.productDetailId,
        price: payload.price,
        quantity: quantity
    }

    console.log("::::::::::::::::::::", data);

    return data


})





export const clearCartItem = createAsyncThunk('/clearCartItem', async (payload) => {

    const result = await axiosGET('mysite/cartItem/')
    const allData = result.data
    const newData = allData.filter(data => data.product_detail == payload.productDetailId)

    const quantity = payload.quantity


    if (newData.length != 0) {
        const res = await axiosDELETE(`mysite/cartItem/${newData[0].id}/`)
    }


    const productDetail = await axiosGET(`mysite/productDetail/${payload.productDetailId}/`)
    const resProductDetail = productDetail.data
    const available_quantity = resProductDetail.available_quantity + quantity
    console.log("avalable quantiry", available_quantity);

    const res = await axiosPATCH(`mysite/productDetail/${payload.productDetailId}/`, { available_quantity: available_quantity })

    console.log("AFTER updateting available quantity :  ", res);


    const data = {
        productDetailId: payload.productDetailId,
        price: payload.price,
        quantity: quantity
    }

    console.log("::::::::::::::::::::", data);

    return data

})






export const clearCartItemAfterOrder = createAsyncThunk('/clearCartItemAfterOrder', async (payload) => {
    const result = await axiosGET('mysite/cartItem/')
    const allData = result.data
    const newData = allData.filter(data => data.product_detail == payload.productDetailId)

    const quantity = payload.quantity


    if (newData.length != 0) {
        const res = await axiosDELETE(`mysite/cartItem/${newData[0].id}/`)
    }

    const data = {
        productDetailId: payload.productDetailId,
        price: payload.price,
        quantity: quantity
    }

    return data




})













const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        isCartOpen: false,
        cartTotal: 0,
        cartCount: 0,
        cartItems: [],

    },
    reducers: {
        setIsCartOpen: (state, action) => {
            state.isCartOpen = !state.isCartOpen
        },

    },

    extraReducers(builder) {
        builder
            .addCase(updateCartItem.fulfilled, (state, action) => {
                const { productDetailId, quantity, price, available_quantity } = action.payload
                const isAlreadyExist = state.cartItems.filter((item) => item.productDetailId == productDetailId)

                if (isAlreadyExist.length != 0) {
                    console.log("Already exist !!");
                    state.cartItems.map((item) =>
                    {
                        if(item.productDetailId == productDetailId)
                        {
                            item.quantity = quantity
                            item.available_quantity = available_quantity - 1
                        }
                    })
                    
                    // item.productDetailId == productDetailId ? item.quantity = quantity : item.quantity = item.quantity)

                }
                else {
                    state.cartItems.push(action.payload)
                }

                state.cartCount = state.cartCount + 1
                state.cartTotal = state.cartTotal + price



            })



            .addCase(removeCartItem.fulfilled, (state, action) => {
                const { quantity, productDetailId, price } = action.payload

                if (quantity > 0) {

                    state.cartItems.map((item) => item.productDetailId == productDetailId ? item.quantity = quantity : item.quantity = item.quantity)

                }
                else {

                    const newItems = state.cartItems.filter((item) => item.productDetailId != productDetailId)

                    state.cartItems = newItems

                }

                state.cartCount = state.cartCount - 1
                state.cartTotal = state.cartTotal - price

            })



            .addCase(clearCartItem.fulfilled, (state, action) => {
                const { quantity, productDetailId, price } = action.payload
                console.log("...................................................", quantity, productDetailId, price);
                const newItems = state.cartItems.filter((item) => item.productDetailId != productDetailId)

                state.cartItems = newItems

                state.cartCount = state.cartCount - quantity
                state.cartTotal = state.cartTotal - (quantity * price)


            })

            .addCase(clearCartItemAfterOrder.fulfilled, (state, action) => {
                const { quantity, productDetailId, price } = action.payload
                console.log("...................................................", quantity, productDetailId, price);
                const newItems = state.cartItems.filter((item) => item.productDetailId != productDetailId)

                state.cartItems = newItems

                state.cartCount = state.cartCount - quantity
                state.cartTotal = state.cartTotal - (quantity * price)


            })



    }
})


export const { setIsCartOpen } = cartSlice.actions

export default cartSlice.reducer

