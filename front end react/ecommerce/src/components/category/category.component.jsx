import React from 'react'
import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { fetchCategory } from '../../store/category/categorySlice'


import { useSelector } from 'react-redux'

import { axiosGET } from '../../axiosApi'

import './category.styles.css'






const Category = () => {

    const dispatch = useDispatch()


   

    useEffect(() => {

        (async () => {
            const res = await dispatch(fetchCategory())
            console.log("Response in useeffect : ............", res.payload);

        }

        )()


    }, [])

 const categories = useSelector(state => state.category.categories)
    console.log("CATEEEE :  ", categories);

    return (
        <div>
            <h2>Category</h2>
            {
               categories && categories.map(category => (
                    <div className='category-container'>
                    <h4>{category.name}</h4>
                    <img src={category.imageUrl} alt="category" />
                    </div>
                ))
            }

        </div>
    )
}

export default Category
