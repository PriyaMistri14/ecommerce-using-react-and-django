import React from 'react'

import './checkout-item.styles.css'


import { useDispatch } from 'react-redux'

import { updateCartItem } from '../../store/cart/cartSlice'

import { removeCartItem } from '../../store/cart/cartSlice'

import { clearCartItem } from '../../store/cart/cartSlice'

import { useSelector } from 'react-redux'



const CheckoutItem = (props) => {
    const { product } = props

    const wholeProduct = useSelector(state => state.product.productDetail) 
    
    const currentUser = useSelector(state => state.user.currentUser)

    const userId = currentUser === null ? "" : currentUser.userId
    const productDetail =
    {
        id: product.productDetailId,
        available_quantity: product.available_quantity,
        available_color: product.color,
        available_size : product.size

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
    console.log("checkout item component : data" , data);

    const addProductToCartHandler = () => {
        const res = dispatch(updateCartItem(data))
        console.log("res in add to cart in checkout page : " , res);
    }


    const removeItemFromCartHandler = () => {
        const res = dispatch(removeCartItem(product))
        console.log("res in add to cart in checkout page : ", res);

    }

    const clearItemFromCartHandler = ()=>{
      dispatch(clearCartItem(product))
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



        </div>
    )
}

export default CheckoutItem
