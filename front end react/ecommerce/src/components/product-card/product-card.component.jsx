import React from 'react'

import './product-card.styles.css'

import { useNavigate } from 'react-router-dom'




const ProductCard = (props) => {

    const { product } = props

    const navigate = useNavigate()


    return (
        <div>

            <h3>{product.name}</h3>
            <p>Price :   ${product.price}</p>
            <img src={product.imageUrl} alt='product' />
            <p onClick={() => navigate('/productDetail', {
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
