import React from 'react'

import './shop.styles.css'

import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'

import { useEffect } from 'react'

import { fetchProduct } from '../../store/product/productSlice'


import { useNavigate } from 'react-router-dom'


const Shop = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(fetchProduct())



    },[])

const products = useSelector(state => state.product.products)
console.log("PRODUCTSS  :   ", products);


  return (
    <div>
        <h2>Shop Now</h2>
        {
            products && products.map(product => (
                <div>
                    <h3>{product.name}</h3>
                    <p>Price :   ${product.price}</p>
                    <img src={product.imageUrl} alt='product' />
                    <p onClick={()=>navigate('/productDetail', {state:{ productId: product.id,
                    productImage: product.imageUrl ,
                    productPrice: product.price
                     }})} >See Details</p>



                </div>

            ))
        }
      
    </div>
  )
}

export default Shop



