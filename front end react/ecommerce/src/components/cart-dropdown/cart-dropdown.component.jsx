
import React from 'react'

import './cart-dropdown.styles.css'

import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'



const CartDropdown = () => {

    const cartItems = useSelector(state => state.cart.cartItems)

    const navigate = useNavigate()

    const goToCheckOut =()=>{
        navigate("/checkout")

    }



    return (
        <div className='card-dropdown-container'>
            {
                cartItems ? cartItems.map(cartItem => (
                    <div className='cart-items'>
                        <img src={cartItem.image} alt='cartItem' />
                        <div>
                            <h4>{cartItem.name}</h4>
                            <span>${cartItem.price}</span>
                            <span>#{cartItem.quantity}</span>
                            <span>{cartItem.color}</span>
                            <span>{cartItem.size}</span>
                        </div>
                      
                    </div>
                )) :
                    "No cart item found!!"
            }
              <button onClick={goToCheckOut}>Go to checkout</button>


        </div>
    )
}

export default CartDropdown


