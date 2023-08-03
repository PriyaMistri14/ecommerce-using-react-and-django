
import React from 'react'
import './order-detail-item.styles.css'


import { loadStripe } from '@stripe/stripe-js'

import { useDispatch } from 'react-redux'

import { changeOrderStatus, removeCoupon } from '../../store/order/orderSlice'

import { useState } from 'react'

import { applyCoupon } from '../../store/order/orderSlice'




let stripePromise

const getStripe = () => {
    if (!stripePromise) {

        stripePromise = loadStripe('pk_test_51NKZRUSCV5eAz6slZ3f39nFXJm4TX40nBdoXBI9B9NIc9Z8pqN4kP0orRQivCCaFFNMmtWoq4UzbaTh38Fk5zgOu00px1vHyph')

    }

    return stripePromise
}






const OrderDetailItem = (props) => {


    const [couponCode, setCouponCode] = useState("")


    const dispatch = useDispatch()


    const { item } = props


    const itemStripe = {
        price: 'price_1NabpVSCV5eAz6slF298GCV0',
        quantity: item.quantity
    }


    const checkoutOptions = {
        lineItems: [itemStripe],
        mode: 'payment',
        successUrl: `${window.location.origin}/success/${item.orderId}`,
        cancelUrl: `${window.location.origin}/orderDetails`
    }


    const redirectToCheckout = async () => {

        const stripe = await getStripe()

        const { error } = await stripe.redirectToCheckout(checkoutOptions)
        console.log("Error in stripe:  ", error);

    }



    const cancelOrder = () => {
        dispatch(changeOrderStatus({ orderId: item.orderId, orderStatus: "Cancelled" }))
    }



    const applyCouponToOrder = () => {
   
         const res = dispatch(applyCoupon({couponCode: couponCode, orderId: item.orderId, total: item.totalAmount}))

       console.log("Response of apply coupon");

    }




    const removeCouponFromOrder = () =>{
        const res = dispatch(removeCoupon({couponCode: item.coupon, orderId: item.orderId, total: item.totalAmount}))
    }





    return (
        <div className='order-item'>
            {/* <table border='1px' className='table-container'>
                <tr>
                    <td>{item.name}</td>
                    <td><img src={item.image} alt='orderedItem' /></td>
                    <td>${item.price}</td>
                    <td>#{item.quantity}</td>
                    <td>{item.color}</td>
                    <td>{item.size}</td>
                    <td>{item.orderStatus}</td>
                    <td>{item.date}</td>
                    <td>{item.price * item.quantity}</td>
                    {
                        item.orderStatus !== 'Cancelled' ? <td onClick={cancelOrder}>Cancel Order</td> : <td></td>
                    }

                    {
                        item.orderStatus === 'Pending' ? <td onClick={redirectToCheckout}>Pay Now</td> : <td></td>
                    }

                </tr>

            </table> */}
            <span>{item.name}</span>
            <img src={item.image} alt='orderedItem' />
            <span>${item.price}</span>
            <span>#{item.quantity}</span>
            <span>{item.color}</span>
            <span>{item.size}</span>
            <span>{item.orderStatus}</span>
            <span>{item.date}</span>
            <span>${item.totalAmount}</span>
            {
                item.coupon ? <span onClick={removeCouponFromOrder} className='apply-btn'>{item.coupon}</span> :
                    <div className='coupon-container'>
                        <input type='text' name='coupon' onChange={(e) => setCouponCode(e.target.value)} placeholder='Enter Coupon code to apply' />
                        <span onClick={applyCouponToOrder} className='apply-btn'>Apply</span>
                    </div>



            }



            {/* <div className='coupon-container'>
                <input type='text' name='coupon' onChange={(e) => setCouponCode(e.target.value)} />
                <span onClick={applyCoupon}>APPLY</span>
            </div> */}
            {
                item.orderStatus !== 'Cancelled' && <span onClick={cancelOrder} className='apply-btn'>Cancel Order</span>
            }

            {
                item.orderStatus === 'Pending' && <span onClick={redirectToCheckout} className='apply-btn'>Pay Now</span>
            }


        </div>
    )
}

export default OrderDetailItem