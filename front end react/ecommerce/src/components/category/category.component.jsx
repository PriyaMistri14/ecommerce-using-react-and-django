import React from 'react'
import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { fetchCategory } from '../../store/category/categorySlice'


import { useSelector } from 'react-redux'

import { axiosGET } from '../../axiosApi'

import './category.styles.css'


import { useNavigate } from 'react-router-dom'






const Category = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()


    const currentUser = useSelector(state => state.user.currentUser)
    const isAdmin = useSelector(state => state.user.isAdmin)
    console.log("Current user in category component : ", currentUser, " is Admin : ", isAdmin);
    




    useEffect(() => {

        if(currentUser !== null){
            isAdmin ? navigate('/category') : dispatch(fetchCategory())
           
          }
          else{
            navigate('/selectUserOrAdmin')
          }
        
     
    },[])

    

    const categories = useSelector(state => state.category.categories)
    console.log("CATEEEE :  ", categories);

    return (
        <div>
            <h2>Category</h2>
            <div className='category-main-container'>
            {
                categories && categories.map(category => (
                    <div className='category-container'  onClick={() => navigate('/categoryShop', {
                        state: {
                            categoryId: category.id,
                            categoryName: category.name
                        }
                    })}>
                        <h4>{category.name}</h4>
                        <img src={category.imageUrl} alt="category" />
                    </div>
                ))
            }

        </div>
        </div>
    )
}

export default Category
