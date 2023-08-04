import React from 'react'

import { useDispatch } from 'react-redux'

import { useEffect } from 'react'

import { useState } from 'react'

import { useSelector } from 'react-redux'

import { useLocation } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'


import { addReview } from '../../store/review/reviewSlice'



const ReviewForm = () => {

    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState("")

    const currentUser = useSelector(state => state.user.currentUser)
    const userId = currentUser === null ? "" : currentUser.userId
    const isAdmin = useSelector(state =>state.user.isAdmin)

    const location = useLocation()
    const productId = location.state

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        if (currentUser !== null) {
          isAdmin && navigate('/category')
    
        }
        else {
          navigate('/selectUserOrAdmin')
        }
    
    
    
      }, [])





    const giveReview = ()=>{
        const payload ={
            rating: rating,
            description: description,
            user: userId,
            product: productId
        }
        console.log("payload of give reviews : ", payload);
        dispatch(addReview(payload))
        alert("Thank you for your review!!!")
        navigate('/orderDetails')
        
    }



  return (
    <div>
        <h3>Please give your review !!</h3>

        <br />
        <br />

        Rating :
        <select onChange={(e)=> setRating(e.target.value)} >
            <option selected disabled>Select rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <br />
        <br />

        Description:

        <textarea placeholder='Say something about product....' onChange={(e)=>setDescription(e.target.value)} />
      <br />
      <br />
      <p onClick={giveReview}>Submit</p>
      <p onClick={()=> navigate('/orderDetails')}>Skip</p>


    </div>
  )
}

export default ReviewForm
