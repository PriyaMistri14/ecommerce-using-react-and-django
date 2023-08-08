import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { axiosPOST } from '../../axiosApi'

import { removeCurrentUser } from '../../store/user/userSlice'

import { setIsAdmin } from '../../store/user/userSlice'

import { axiosIntance } from '../../axiosApi'


const Logout = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandler = async () => {

        try {
            const res = await axiosPOST("auth/logout/",
                {
                    refresh_token: localStorage.getItem("refresh_token")
                })
        }
        catch (error) {
            console.log("Error while blacklisting tthe token :::::", error)
        }

        dispatch(removeCurrentUser())
        dispatch(setIsAdmin(false))        


        axiosIntance.defaults.headers["Authorization"] = null
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        navigate("/selectUserOrAdmin")


    }



    return (
        <a onClick={logoutHandler}>LOG OUT</a>
    )
}

export default Logout
