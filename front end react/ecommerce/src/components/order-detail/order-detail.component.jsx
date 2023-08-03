
import './order-detail.styles.css'

import React from 'react'

import { useSelector } from 'react-redux'


import OrderDetailItem from '../order-detail-item/order-detail-item.component'


import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'







const OrderDetail = () => {


    const navigate = useNavigate()

    const orderedItems = useSelector(state => state.order.orderedItems)

    const currentUser = useSelector(state => state.user.currentUser)

    const isAdmin = useSelector(state => state.user.isAdmin)


    useEffect(() => {

        if (currentUser !== null) {
            isAdmin && navigate('/category')

        }
        else {
            navigate('/selectUserOrAdmin')
        }





    }, [])



    return (
        <div className='order-detail-container'>
            <div className='order-detail'><span>Name</span>
                <span>Image</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Color</span>
                <span>Size</span>
                <span>Status</span>
                <span>Date</span>
                <span>Total</span>
                <span>Apply Coupon</span>
                <span>Cancel Order</span>
                <span>Pay Now</span>
            </div>
            <div className='order-detail-item-container'>
          
                {
                    orderedItems && orderedItems.map((orderedItem) => <OrderDetailItem item={orderedItem} />)
                }
          

        </div>
        </div>
    )
}

export default OrderDetail





