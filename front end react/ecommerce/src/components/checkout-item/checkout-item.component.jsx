import React from 'react'

import './checkout-item.styles.css'


import { useDispatch } from 'react-redux'

import { updateCartItem } from '../../store/cart/cartSlice'

import { removeCartItem } from '../../store/cart/cartSlice'

import { clearCartItem } from '../../store/cart/cartSlice'

import { useSelector } from 'react-redux'


import { orderItem } from '../../store/order/orderSlice'


import { clearCartItemAfterOrder } from '../../store/cart/cartSlice'





const CheckoutItem = (props) => {
    const { product } = props

    const wholeProduct = useSelector(state => state.product.productDetail)
    // ............................................


   console.log("OOOOOOOOOOOOO productDetailDemo:", product.available_quantity);


    // ..................................................

    const currentUser = useSelector(state => state.user.currentUser)

    const orderedProduct = useSelector(state => state.order)
    console.log("Ordered products : ", orderedProduct);


    const userId = currentUser === null ? "" : currentUser.userId
    const productDetail =
    {
        id: product.productDetailId,
        available_quantity: product.available_quantity,
        available_color: product.color,
        available_size: product.size

    }


    const dispatch = useDispatch()

    const payload = {
        user: userId,
        product_detail: product.productDetailId,

    }


    const item = {
        wholeProduct,
        productDetail
    }

    const data = {
        payload,
        item
    }
    console.log("checkout item component : data", data);

    const addProductToCartHandler = () => {
        if(product.available_quantity == 0)
        {
            alert("No more quantity available !!!")
        }
        else{

            const res = dispatch(updateCartItem(data))
            console.log("res in add to cart in checkout page : ", res);
        }
    }


    const removeItemFromCartHandler = () => {
        const res = dispatch(removeCartItem(product))
        console.log("res in add to cart in checkout page : ", res);

    }

    const clearItemFromCartHandler = () => {       
        dispatch(clearCartItem(product))
    }


    const orderProduct = () => {

        const payload = {
            product_detail: product.productDetailId,
            user: userId,
            quantity: product.quantity,
            total_amount :  product.price * product.quantity
        }

        const otherDetails ={
            productId:product.productId,
            productDetailId: product.productDetailId,
            quantity:product.quantity,
            price:product.price,
            image:product.image,
            name:product.name,
            color:product.color,
            size: product.size,
            available_quantity:product.available_quantity
    
        }


        const data ={
           payload: payload,
           otherDetails: otherDetails
        }
        console.log("payload to order : ", payload);

       const res = dispatch(orderItem(data))
       console.log("RRRRREEEE: ", res);
       dispatch(clearCartItemAfterOrder(product))
       alert("successfully ordered!!!")

       

    }








    return (
        <div className='checkout-item-container'>
            <span>{product.name}</span>
            <img className='checkout-image' src={product.image} alt='product' />
            <span>${product.price}</span>
            <div className='arrow' onClick={removeItemFromCartHandler}>
                &#10094;

            </div>

            <span>#{product.quantity}</span>

            <div className='arrow' onClick={addProductToCartHandler}>
                &#10095;

            </div>

            <span>{product.color}</span>
            <span>{product.size}</span>

            <div className='remove-button' onClick={clearItemFromCartHandler}>&#10005;</div>

            <span onClick={orderProduct}>Order Now</span>



        </div>
    )
}

export default CheckoutItem
