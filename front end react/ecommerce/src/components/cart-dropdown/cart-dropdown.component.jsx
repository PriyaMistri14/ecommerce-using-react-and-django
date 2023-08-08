
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
                cartItems && cartItems.length != 0 ? cartItems.map(cartItem => (
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
                   <p>No cart item found!!</p> 
            }
         
            {
                cartItems && cartItems.length != 0 ? 
                <button onClick={goToCheckOut}>Go to checkout</button>
                : <button onClick={()=>navigate('/shop')} >Shop Now</button>


            }
              
        </div>
    )
}

export default CartDropdown


