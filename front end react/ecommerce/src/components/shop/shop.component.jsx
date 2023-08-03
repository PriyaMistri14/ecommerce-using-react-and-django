import React from 'react'

import './shop.styles.css'

import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'

import { useEffect } from 'react'

import { fetchProduct } from '../../store/product/productSlice'


import { searchProduct } from '../../store/product/productSlice'


import { useNavigate } from 'react-router-dom'
import ProductCard from '../product-card/product-card.component'

import { useState } from 'react'




const Shop = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currentUser = useSelector(state => state.user.currentUser)
    const isAdmin = useSelector(state => state.user.isAdmin)

    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        if (currentUser !== null) {
            const payload = {
                ordering: '-id',
                page: 1,
                page_size: 5

            }
            isAdmin ? navigate('/category') : dispatch(fetchProduct(payload))

        }
        else {
            navigate('/selectUserOrAdmin')
        }




    }, [])

    const products = useSelector(state => state.product.products)
    const totalPages = useSelector(state => state.product.totalPages)

    var arr = []
    for (var i = 0; i < totalPages; i++) {
        arr.push(i + 1)
    }


    console.log("PRODUCTSS  :   ", products, "totalPages : ", totalPages, "Total page arr : ", arr);

    const onChangeHandler = (e) => {
        const search = e.target.value
        dispatch(searchProduct(search))
    }




    return (
        <div className='shop-container'>
            <h2>Shop Now</h2>
            <input type='search' placeholder='Search Here' onChange={onChangeHandler} />

            {
                products && products.map(product => <ProductCard product={product} />)
            }

            {
                arr && arr.length != 0 && arr.map(ele => ele == currentPage ?  <a onClick={()=>alert(ele)} style={{color:"red"}}>{ele}</a> :<a style={{color:"blue"}}>{ele}</a>)

            }

        </div>

    )
}

export default Shop



