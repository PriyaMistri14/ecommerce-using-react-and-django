import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { changeOrderStatus } from '../../store/order/orderSlice'

import { useEffect } from 'react'

import { useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'




const Success = () => {

    const currentUser = useSelector(state => state.user.currentUser)

    const isAdmin = useSelector(state => state.user.isAdmin)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const {orderId} = useParams()
    console.log("ORDER ID IN SUCCESS PAGE : ", orderId);


    useEffect(()=>{

        if(currentUser !== null)
        {
           if(isAdmin) 
           {
               navigate('/category')

           }
           else{
            const res = dispatch(changeOrderStatus({orderId: orderId, orderStatus:"Success"}))
            console.log("RES after changing order : ", res);
            navigate('/orderDetails')
           }
        }
        else{
            navigate('/selectUserOrAdmin')
        }



    },[])




  return (
    <div>
        <h2>Payment Success</h2>
        <h3>Thank you !</h3>
      
    </div>
  )
}

export default Success
