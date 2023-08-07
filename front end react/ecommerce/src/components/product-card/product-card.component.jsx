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

    useEffect(() => {

        if (currentUser === null) {
            navigate('/selectUserOrAdmin')
        }
        else {
            isAdmin && navigate('/category')
        }

    }, [])




    return (
        <div className='product-card-container'>

            <h3>{product.name}</h3>
            <p>Price :   ${product.price}</p>
            <img src={product.imageUrl} alt='product' />

            {/* FOR SINGLE */}


            {/* {
                product.discounts && product.discounts.length != 0 &&  product.discounts[0].isActive && <p>{product.discounts[0].percentage}% Off till {product.discounts[0].due_date}</p>
            } */}



            {/* FOR MULTIPLE */}



            {
                product.discounts && product.discounts.length != 0 && product.discounts.map(discount => discount.isActive && <p>{discount.percentage}% Off till {discount.due_date}</p>)
            }
            <p onClick={() => navigate('/productDetailUser', {
                state: {
                    productId: product.id,
                    productImage: product.imageUrl,
                    productPrice: product.price
                }
            })} className='see-details-btn' >See Details</p>


        </div>
    )
}

export default ProductCard
