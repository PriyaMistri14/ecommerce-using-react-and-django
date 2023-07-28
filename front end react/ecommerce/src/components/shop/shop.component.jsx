import React from 'react'

import './shop.styles.css'

import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'

import { useEffect } from 'react'

import { fetchProduct } from '../../store/product/productSlice'


import { searchProduct } from '../../store/product/productSlice'


import { useNavigate } from 'react-router-dom'
import ProductCard from '../product-card/product-card.component'


const Shop = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(fetchProduct())



    },[])

const products = useSelector(state => state.product.products)
console.log("PRODUCTSS  :   ", products);

const onChangeHandler =(e)=>{
    const search = e.target.value
    dispatch(searchProduct(search))
}




  return (
    <div>
        <h2>Shop Now</h2>
        <input type='search' placeholder='Search Here' onChange={onChangeHandler} />

        {
            products && products.map(product => <ProductCard product={product}/>)
        }
      
    </div>
  )
}

export default Shop



