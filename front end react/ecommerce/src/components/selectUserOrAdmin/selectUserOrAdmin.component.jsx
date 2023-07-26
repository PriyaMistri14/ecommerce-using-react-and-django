
import React from 'react'

import { useNavigate } from 'react-router-dom'

const SelectUserOrAdmin = () => {
    const navigate = useNavigate()

    const loginAsadmin = ()=>{
        navigate("/login",{state:"admin"} )
    }


    const loginAsUser = ()=>{
        navigate("/login", {state: "user"})
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


