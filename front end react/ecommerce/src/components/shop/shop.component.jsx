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
    const [pageSize, setPageSize] = useState(5)
    const [order, setOrder] = useState('id')

    // const payload = {
    //     ordering: order,
    //     page: currentPage,
    //     page_size: pageSize

    // }

    useEffect(() => {
        if (currentUser !== null) {
            const payload = {
                ordering: order,
                page: currentPage,
                page_size: pageSize

            }
            console.log("pagesize in useEffect : ", pageSize);
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


    const onPageChangeHandler = (pageNo) => {
        setCurrentPage(pageNo)
        const payload = {
            ordering: order,
            page: pageNo,
            page_size: pageSize

        }
        dispatch(fetchProduct(payload))



    }







    return (
        <div className='shop-container'>
            <h2>Shop Now</h2>
            <input type='search' placeholder='Search Here' onChange={onChangeHandler} />

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

export default Shop



