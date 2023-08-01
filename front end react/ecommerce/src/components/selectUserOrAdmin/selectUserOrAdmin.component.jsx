
import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { useEffect } from 'react'



const SelectUserOrAdmin = () => {
    const navigate = useNavigate()

    const currentUser = useSelector(state => state.user.currentUser)

    const isAdmin = useSelector(state => state.user.isAdmin)


    useEffect(()=>{
      
      if(currentUser !== null){
        console.log(" current user is not null !");
        isAdmin ? navigate('/category') : navigate('/categoryUser')
      }

    

    },[])

    const loginAsadmin = ()=>{
        navigate("/loginUser",{state:"admin"} )
    }


    const loginAsUser = ()=>{
        navigate("/loginUser", {state: "user"})
    }


  return (
    <div>
        <h2>Login as ...</h2>
        <p onClick={loginAsadmin}  >Admin</p>
        <p onClick={loginAsUser} >User</p>
      
    </div>
  )
}

export default SelectUserOrAdmin


