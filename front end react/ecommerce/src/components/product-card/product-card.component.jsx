import React from 'react'

import './product-card.styles.css'

import { useNavigate } from 'react-router-dom'

import { useEffect } from 'react'

import { useSelector } from 'react-redux'



const ProductCard = (props) => {

    const { product } = props

    const navigate = useNavigate()

    const currentUser = useSelector(state => state.user.currentUser)

    const isAdmin = useSelector(state => state.user.isAdmin)

useEffect(()=>{

    if (currentUser === null) {
      navigate('/selectUserOrAdmin')
    }
  else{
    isAdmin && navigate('/category')
  }

},[])




    return (
        <div>

            <h3>{product.name}</h3>
            <p>Price :   ${product.price}</p>
            <img src={product.imageUrl} alt='product' />
            <p onClick={() => navigate('/productDetailUser', {
                state: {
                    productId: product.id,
                    productImage: product.imageUrl,
                    productPrice: product.price
                }
            })} >See Details</p>


        </div>
    )
}

export default ProductCard
