import React from 'react'

import './checkout.styles.css'

import { useSelector } from 'react-redux'

import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'



import CheckoutItem from '../checkout-item/checkout-item.component'



const Checkout = () => {

    const currentUser = useSelector(state => state.user.currentUser)
    const isAdmin = useSelector(state => state.user.isAdmin)

    const cartItems = useSelector(state => state.cart.cartItems)

    const cartTotal = useSelector(state => state.cart.cartTotal)

    const navigate = useNavigate()


    useEffect(()=>{
        if (currentUser !== null) {
            isAdmin && navigate('/category') 
    
        }
        else {
            navigate('/selectUserOrAdmin')
        }


    },[])



    



  return (
    <div className='checkout-container'>
        <span>Name</span>
        <span>Image</span>
        <span>Price</span>
        <span>Decrement</span>
        <span>Quantity</span>
        <span>Increment</span>
        <span>Color</span>
        <span>Size</span>
        <span>Clear Item</span>
        <span>Order Now</span>
        {
        
        cartItems.map((cartItem)=><CheckoutItem product={cartItem}/>)
        
        }
      <p>Total : ${cartTotal}</p>
    </div>
  )
}

export default Checkout
