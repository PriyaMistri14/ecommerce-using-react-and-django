import React from 'react'

import './user-profile.styles.css'

import { useSelector } from 'react-redux'

import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'


const UserProfile = () => {

    const navigate = useNavigate()

    const currentUser = useSelector(state => state.user.currentUser)

    const isAdmin = useSelector(state => state.user.isAdmin)

    const userEmail = currentUser ? currentUser.userEmail : ""

    const userName = currentUser ? currentUser.username : ""

    const userFirstName = currentUser ? currentUser.userFirstName : ""

    const userLastName = currentUser ? currentUser.userLastName : ""


    useEffect(() => {
        if (currentUser !== null) {
            isAdmin && navigate('/category')

        }
        else{
            navigate('/selectUserOrAdmin')
        }


    }, [])

  return (
    <div className='user-profile-container'>
      <p>User Name : {userName}</p>
      <p>Email : {userEmail}</p>
      <p>First Name : {userFirstName}</p>
      <p>Last Name : {userLastName}</p>
      <p onClick={()=>navigate("/editProfile")} className='change-pwd-btn'>Edit Profile</p>
      <p onClick={()=>navigate("/forgotPassword")} className='change-pwd-btn'>Change Password</p>

      
    </div>
  )
}

export default UserProfile
