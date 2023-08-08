import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosGET, axiosPATCH, axiosPOST } from "../../axiosApi";



export const orderItem = createAsyncThunk('/orderProduct', async (payload) => {

    const res = await axiosPOST('mysite/order/', payload.payload)

    var data = payload.otherDetails

    data['orderStatus'] = res.data.status
    data['date'] = res.data.created_at
    data['orderId'] = res.data.id
    data['totalAmount'] = res.data.total_amount
    data['coupon'] = res.data.coupon

    if(res.data.discount)
    {
        data['discount'] = res.data.discount
    }

    return data

})


export const changeOrderStatus = createAsyncThunk('/changeOrderStatus', async (payload) => {

    const res = await axiosPATCH(`mysite/order/${payload.orderId}/`, { status: payload.orderStatus })

    // Success => payment done => 
    // Cancelled => without payment

    return payload


})


export const applyCoupon = createAsyncThunk('/applyCoupon', async (payload) => {
    const res = await axiosGET('mysite/coupon/')
    const allCoupons = res.data

    const filteredCoupons = allCoupons.filter(data => data.coupon_code == payload.couponCode)

    if (filteredCoupons.length !== 0) {
        console.log("Coupon found! ", filteredCoupons[0]);

        const res = await axiosGET('mysite/order/')
        const allOrders = res.data
        const allOrdersOfUser = allOrders.filter(data => data.user == payload.userId)
        const filteredOrders = allOrdersOfUser.filter(data => data.coupon == filteredCoupons[0].id)



        if (filteredCoupons[0].is_expired) {
            alert("Coupon is expired!!")
            return
        }

        else if (filteredOrders.length != 0) {
            alert("Coupon already applied!")
            return
        }
        else if (filteredCoupons[0].minimum_amount >= payload.total) {

            alert(`Coupon is not applicable , you required minimum  ${filteredCoupons[0].minimum_amount} to apply this coupon !!`)
            return
        }
        else {
            alert("Coupon applied!!")
            const newTotal = payload.total - filteredCoupons[0].discount_price
            const res = await axiosPATCH(`mysite/order/${payload.orderId}/`, { coupon: filteredCoupons[0].id, total_amount: newTotal })
            return {
                newTotal: newTotal,
                orderId: payload.orderId,
                couponCode: payload.couponCode
            }
        }


    }
    else {
        alert("Invalid Coupon!!!!")
        console.log("no count found!");
        return
    }



})



export const removeCoupon = createAsyncThunk('/removeCoupon', async (payload) => {
  

    const res = await axiosGET('mysite/coupon/')
    const allCoupons = res.data

    const filteredCoupons = allCoupons.filter(data => data.coupon_code == payload.couponCode)

    if (filteredCoupons.length !== 0) {
        const newTotal = payload.total + filteredCoupons[0].discount_price

        const res = await axiosPATCH(`mysite/order/${payload.orderId}/`, { coupon: null, total_amount: newTotal })
        alert("Successfully Removed!!")
        return {
            newTotal: newTotal,
            orderId: payload.orderId,

        }

    }




})
















export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderedItems: [],
        isLoading: false,
        error: null,

    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(orderItem.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(orderItem.fulfilled, (state, action) => {
                console.log("Action payload : ", action.payload);
                state.isLoading = false
                state.orderedItems.push(action.payload)

            })


            .addCase(orderItem.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.code
            })
            

            .addCase(changeOrderStatus.fulfilled, (state, action) => {

                console.log("payload  : ", action.payload);

                const { orderId, orderStatus } = action.payload

                state.orderedItems.map((item) => item.orderId == orderId ? item.orderStatus = orderStatus : item.orderStatus = item.orderStatus)


            })

            .addCase(applyCoupon.fulfilled, (state, action) => {
                console.log("Called", action.payload);
                if (action.payload != undefined) {
                    const { newTotal, orderId, couponCode } = action.payload
                    state.orderedItems.map((item) => {
                        if (item.orderId == orderId) {

                            item.totalAmount = newTotal
                            item.coupon = couponCode

                        }
                    })
                }
            })

            .addCase(removeCoupon.fulfilled, (state, action) => {
                console.log("Called", action.payload);
                if (action.payload != undefined) {
                    const { newTotal, orderId } = action.payload
                    state.orderedItems.map((item) => {
                        if (item.orderId == orderId) {

                            item.totalAmount = newTotal
                            item.coupon = null

                        }
                    })
                }
            })


    }


})




export default orderSlice.reducer
