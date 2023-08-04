import React from 'react'

import './review.styles.css'

import { useEffect } from 'react'

import { useSelector, UseSelector } from 'react-redux/es/hooks/useSelector'

import { useDispatch } from 'react-redux'

import { fetchReviews } from '../../store/review/reviewSlice'

import { useNavigate } from 'react-router-dom'




const Review = (props) => {

    const { productId } = props

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const currentUser = useSelector(state => state.user.currentUser)

    const isAdmin = useSelector(state => state.user.isAdmin)





    useEffect(() => {

        if (currentUser !== null) {
            isAdmin && navigate('/category')

            const res = dispatch(fetchReviews(productId))
            console.log("RRRRRRR : ", res);

        }
        else {
            navigate('/selectUserOrAdmin')
        }

    }, [])



    const reviews = useSelector(state => state.review.reviews)

    console.log("REVIEWSSS   : ", reviews);




    return (
        <div><h4>Reviews and Rating</h4>
        <table align='center'>
            <tr><td>Username</td><td>Rating</td><td>Description</td></tr>
            {
                reviews && reviews.length != 0 ? reviews.map((review) => (
                    <tr><td>{review.username}</td><td>{review.rating}</td><td>{review.description}</td></tr>
                  
                ))
                : "No reviews found for given product"
        }
</table>
        </div>
    )
}

export default Review
