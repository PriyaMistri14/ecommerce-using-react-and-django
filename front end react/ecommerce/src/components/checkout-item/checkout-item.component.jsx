import React from 'react'

import './checkout-item.styles.css'


import { useDispatch } from 'react-redux'

import { updateCartItem } from '../../store/cart/cartSlice'

import { removeCartItem } from '../../store/cart/cartSlice'

import { clearCartItem } from '../../store/cart/cartSlice'

import { useSelector } from 'react-redux'


import { orderItem } from '../../store/order/orderSlice'


import { clearCartItemAfterOrder } from '../../store/cart/cartSlice'

import { useNavigate } from 'react-router-dom'


import Countdown from 'react-countdown'


import { axiosPATCH } from '../../axiosApi'





const CheckoutItem = (props) => {
    const { product } = props

    const wholeProduct = useSelector(state => state.product.productDetail)

    const navigate = useNavigate()


    const currentUser = useSelector(state => state.user.currentUser)

    const orderedProductWhole = useSelector(state => state.order)
    console.log("Ordered products : ", orderedProductWhole);

    const orderedItems = orderedProductWhole ? orderedProductWhole.orderedItems : []




    // .............discount price count .............

    var newPrice
    var due_date
    var miliseconds

    // FOR SINGLE
    // if (product.discounts && product.discounts.length != 0 && product.discounts[0].isActive) {
    //     const percentage = product.discounts[0].percentage
    //     newPrice =product.price - (product.price * percentage / 100)
    //     due_date = product.discounts[0].due_date
    //     miliseconds = new Date(due_date).getTime() - new Date().getTime()
    //     // miliseconds= miliseconds.getMilliseconds()
    //     console.log("new price after discount :   ", newPrice);
    // }



    // FOR MULTIPLE

    if (product && product.discounts && product.discounts.length != 0) {
        product.discounts.map(discount => {

            if (discount.isActive) {

                const percentage = discount.percentage
                newPrice = product.price - (product.price * percentage / 100)
                due_date = discount.due_date
                miliseconds = new Date(due_date).getTime() - new Date().getTime()
                // miliseconds= miliseconds.getMilliseconds()
                console.log("new price after discount :   ", newPrice);

            }



        })
    }





    const renderer = (dateObj) => {

        const { days, hours, minutes, seconds, completed } = dateObj
        if (completed) {
            const activeDiscount = product && product.discounts && product.discounts.length != 0 && product.discounts.filter(discount => discount.isActive)
            console.log("Discount id : ", activeDiscount[0].id, "activeDiscount : ", activeDiscount);
            const res = axiosPATCH(`mysite/discount/${activeDiscount[0].id}/`, { isActive: false })
            console.log("res after discount is not active : ", res);
            return <span>Discount is not active !!</span>
        }
        else {
            return <span>Discount is active until : {days} : {hours} : {minutes} : {seconds}</span>
        }
    }


    // .......................................................





    const userId = currentUser === null ? "" : currentUser.userId
    const productDetail =
    {
        id: product.productDetailId,
        available_quantity: product.available_quantity,
        available_color: product.color,
        available_size: product.size

    }


    const dispatch = useDispatch()

    const payload = {
        user: userId,
        product_detail: product.productDetailId,

    }


    const item = {
        wholeProduct,
        productDetail
    }

    const data = {
        payload,
        item
    }
    console.log("checkout item component : data", data);

    const addProductToCartHandler = () => {
        if (product.available_quantity == 0) {
            alert("No more quantity available !!!")
        }
        else {

            const res = dispatch(updateCartItem(data))
            console.log("res in add to cart in checkout page : ", res);
        }
    }


    const removeItemFromCartHandler = () => {
        const res = dispatch(removeCartItem(product))
        console.log("res in add to cart in checkout page : ", res);

    }

    const clearItemFromCartHandler = () => {
        dispatch(clearCartItem(product))
    }


    const orderProduct = () => {

        if (orderedItems && orderedItems.length == 0)  //first order
        {
            alert("Congratulations , you have received coupon for your first order, Coupon code is : `FirstOrder` ")
        }

        var payload

        if (newPrice != undefined) {
            payload = {
                product_detail: product.productDetailId,
                user: userId,
                quantity: product.quantity,
                total_amount: newPrice * product.quantity,
                discount: product.discounts[0].id
            }


        }
        else {

            payload = {
                product_detail: product.productDetailId,
                user: userId,
                quantity: product.quantity,
                total_amount: product.price * product.quantity
            }




        }



        const otherDetails = {
            productId: product.productId,
            productDetailId: product.productDetailId,
            quantity: product.quantity,
            price: product.price,
            image: product.image,
            name: product.name,
            color: product.color,
            size: product.size,
            available_quantity: product.available_quantity,
            discounts: product.discounts

        }


        const data = {
            payload: payload,
            otherDetails: otherDetails
        }
        console.log("payload to order : ", payload);

        const res = dispatch(orderItem(data))
        console.log("RRRRREEEE: ", res);
        dispatch(clearCartItemAfterOrder(product))
        alert("successfully ordered!!!")
        navigate("/giveReview", { state: product.productId })




    }





    return (
        <div className='checkout-item-container'>
            <span>{product.name}</span>
            <img className='checkout-image' src={product.image} alt='product' />
            {/* <span>${product.price}</span> */}
            {
                newPrice ? <span>${product.price} New price : ${newPrice}</span> :
                    <span>${product.price}</span>
            }
            {
                newPrice && <Countdown date={Date.now() + miliseconds} renderer={renderer} />
            }

            <div className='arrow' onClick={removeItemFromCartHandler}>
                &#10094;

            </div>

            <span>#{product.quantity}</span>

            <div className='arrow' onClick={addProductToCartHandler}>
                &#10095;

            </div>

            <span>{product.color}</span>
            <span>{product.size}</span>

            <div className='remove-button' onClick={clearItemFromCartHandler}>&#10005;</div>

            <span onClick={orderProduct}>Order Now</span>



        </div>
    )
}

export default CheckoutItem
