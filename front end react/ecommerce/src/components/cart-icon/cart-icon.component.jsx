
import React from 'react'

import './cart-icon.styles.css'

import { ReactComponent as Icon } from '../../assets/shopping-bag.svg'

import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'

import { setIsCartOpen } from '../../store/cart/cartSlice'


import { useNavigate } from 'react-router-dom'




const CartIcon = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const cartCount = useSelector(state => state.cart.cartCount)

  const isCartOpen = useSelector(state => state.cart.isCartOpen)
  console.log("isCartOpen", isCartOpen);

  const currentUser = useSelector(state => state.user.currentUser)

  const isAdmin = useSelector(state => state.user.isAdmin)

  const setCart = () => {

    if (currentUser !== null) {
      isAdmin ? navigate('/category') : dispatch(setIsCartOpen())

    }
    else {
      navigate('/selectUserOrAdmin')
    }


  }

  return (
    <div className='card-icon-container' onClick={setCart} >
      <Icon className='cart-icon' />
      <span className='icon-cnt'>{cartCount}</span>

    </div>



  )
}

export default CartIcon

