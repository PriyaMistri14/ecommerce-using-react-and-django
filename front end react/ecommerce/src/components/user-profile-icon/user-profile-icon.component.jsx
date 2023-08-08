
import React from 'react'

import { useDispatch } from 'react-redux'

import { setIsUserProfileCartOpen } from '../../store/user/userSlice'




const UserProfileIcon = () => {

    const dispatch = useDispatch()


    const setUserProfileCart = () => {

        dispatch(setIsUserProfileCartOpen())

    }

    return (
        <div className='card-icon-container' onClick={setUserProfileCart} >
            <a className='cart-icon' >My Profile</a>
        </div>

    )
}

export default UserProfileIcon

