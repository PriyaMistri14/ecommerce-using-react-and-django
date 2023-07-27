import React from 'react'

import { useLocation } from 'react-router-dom'

import { useEffect } from 'react'


import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'

import { fetchProductDetail } from '../../store/product/productSlice'


import './product-detail.styles.css'
import { updateCartItem } from '../../store/cart/cartSlice'




const ProductDetail = () => {

    const location = useLocation()

    console.log("LOCATION VALUE PRODUCT ID :  ", location.state);

    const productId = location.state.productId
    const productImage = location.state.productImage
    const productPrice = location.state.productPrice

console.log("Product id and product img and product price : ", productId, productImage, productPrice);



    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchProductDetail(productId))
    }, [])


    const productDetail = useSelector(state => state.product.productDetail)

    console.log("Product details:  ", productDetail);

    const userId = useSelector(state => state.user.currentUser.userId)

    const quantity = useSelector(state => state.cart.cartCount)

    const cartItems = useSelector(state => state.cart.cartItems)

    console.log("CART ITEMS :  ", cartItems);


    const addItemToCart = (productDetail)=>{
        const productDetailId = productDetail.id
        const payload = {
            user : userId,
            product_detail : productDetailId,
            quantity : quantity
        }
        const item ={
            productId:productDetail.product,
            productDetailId : productDetailId,
            color : productDetail.available_color,
            size : productDetail.available_size,
            image: productImage,
            price : productPrice

        }

      const data = {
        payload,
        item
      }

        console.log("PAYLOADDDD :  ", payload, "Product Detailllllll : ", productDetail, "itemmm : " , item);
        dispatch(updateCartItem(data))
    }


  return (
    <div>
        <h2>Details</h2>
        {
            productDetail &&  productDetail.length != 0 ?
              productDetail.map(product =>(
                <div className='product-detail-container'>
                    <img src={productImage} alt='product' />
                <p>Available quantity : {product.available_quantity}</p>
                <p>Available size : {product.available_size}</p>
                <p>Available color : {product.available_color}</p>
                <p className='add-to-cart' onClick={()=>addItemToCart(product)}>Add to Cart</p>

                </div>
              )

              ) 
            : "No Details found for given product!!"
         }
      
    </div>
  )
}

export default ProductDetail
