
import React from 'react'

import './category-shop.styles.css'

import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'

import { useLocation } from 'react-router-dom'

import { useEffect } from 'react'

import { useState } from 'react'

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

    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)






    useEffect(() => {
        if (currentUser !== null) {
            const payload = {
              
                page: currentPage,
                page_size: pageSize,
                categoryId:categoryId

            }

            isAdmin ? navigate('/category') : dispatch(fetchProductBasedOnCategory(payload))

        }
        else {
            navigate('/selectUserOrAdmin')
        }


    }, [])


    const products = useSelector(state => state.category.products)

    const totalPages = useSelector(state => state.category.totalPages)

    var arr = []
    for (var i = 0; i < totalPages; i++) {
        arr.push(i + 1)
    }




    console.log("Products based on category in component :  ;;;;", products, "TOTAL PAGES : ", totalPages);


    const onChangeHandler = (e) => {
        const search = e.target.value

        const payload = {
            search: search,
            categoryId: categoryId
        }

        dispatch(searchProductBasedOnCategory(payload))

    }


    const onPageChangeHandler = (pageNo) => {
        setCurrentPage(pageNo)
        const payload = {
          
            page: pageNo,
            page_size: pageSize,
            categoryId:categoryId,

        }
        dispatch(fetchProductBasedOnCategory(payload))


    }







    return (
        <div className='shop-container'>
            <h2>{categoryName}</h2>
            <input type='search' placeholder='search here' onChange={onChangeHandler} />
            <div className='product-container'>
                {
                    products && products.map(product => <ProductCard product={product} />)

                }
            </div>
            {
                currentPage != 1 && <span onClick={() => onPageChangeHandler(currentPage - 1)}>Prev</span>
            }
            {
                arr && arr.length != 0 && arr.map(ele => ele == currentPage ?
                    <a onClick={() => onPageChangeHandler(ele)} style={{ color: "red" }}>{ele}</a> :
                    <a onClick={() => onPageChangeHandler(ele)} style={{ color: "blue" }}>{ele}</a>)

            }
            {
                currentPage != arr.length && <span onClick={() => onPageChangeHandler(currentPage + 1)} >Next</span>
            }


        </div>
    )
}

export default CategoryShop



