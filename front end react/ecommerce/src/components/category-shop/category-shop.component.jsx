
import React from 'react'

import './category-shop.styles.css'

import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'

import { useLocation } from 'react-router-dom'

import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { fetchProductBasedOnCategory } from '../../store/category/categorySlice'


import { searchProductBasedOnCategory } from '../../store/category/categorySlice'


import ProductCard from '../product-card/product-card.component'


const CategoryShop = () => {

const dispatch = useDispatch()
const location = useLocation()

const navigate = useNavigate()

const categoryId = location.state.categoryId
const categoryName = location.state.categoryName

console.log("CATEGORY ID  :  ", categoryId);

const currentUser = useSelector(state => state.user.currentUser)

const isAdmin = useSelector(state => state.user.isAdmin)


useEffect(()=>{
    if (currentUser !== null) {
        isAdmin ? navigate('/category') : dispatch(fetchProductBasedOnCategory(categoryId))

    }
    else {
        navigate('/selectUserOrAdmin')
    }

    
}, [])


const products = useSelector(state => state.category.products)

console.log("Products based on category in component :  ;;;;", products);


const onChangeHandler = (e)=>{
    const search = e.target.value

    const payload = {
        search:search,
        categoryId:categoryId
    }

    dispatch(searchProductBasedOnCategory(payload))

}




  return (
    <div>
        <h2>{categoryName}</h2>
        <input type='search' placeholder='search here' onChange={onChangeHandler} />
        {
            products && products.map(product => <ProductCard product={product}/>)
        
        }
      
    </div>
  )
}

export default CategoryShop



