
import React from 'react'

import { useDispatch } from 'react-redux'

import { setIsUserProfileCartOpen } from '../../store/user/userSlice'


import { useSelector } from 'react-redux'




const UserProfileIcon = () => {

    const dispatch = useDispatch()

    const currentUser = useSelector(state => state.user.currentUser)


    const setUserProfileCart = () => {

        if (currentUser != null) {
            dispatch(setIsUserProfileCartOpen())
        }

    }

    return (
        <div className='card-icon-container' onClick={setUserProfileCart} >
            <a className='cart-icon' >My Profile</a>
        </div>

    )
}

export default UserProfileIcon

