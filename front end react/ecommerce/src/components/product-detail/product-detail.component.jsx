import React from 'react'

import { useLocation } from 'react-router-dom'

import { useEffect, useState } from 'react'


import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'

import { fetchProductDetail } from '../../store/product/productSlice'


import './product-detail.styles.css'
import { updateCartItem } from '../../store/cart/cartSlice'


import { searchProductDetail } from '../../store/product/productSlice'




const ProductDetail = () => {


  const colors = ['Red', 'Black', 'Blue', 'Green', 'Pink', 'Orange', 'White']
  const sizes = ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

  const location = useLocation()

  console.log("LOCATION VALUE PRODUCT ID :  ", location.state);

  const productId = location.state.productId
  const productImage = location.state.productImage  //not needed
  const productPrice = location.state.productPrice

  console.log("Product id and product img and product price : ", productId, productImage, productPrice);



  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProductDetail(productId))
  }, [])


  const productDetail = useSelector(state => state.product.productDetail.product_details)
  const wholeProduct = useSelector(state => state.product.productDetail)


  console.log("Product details:UUUUUUU  ", productDetail);

  const userId = useSelector(state => state.user.currentUser.userId)

  const totalQuantity = useSelector(state => state.cart.cartCount)

  const total = useSelector(state => state.cart.cartTotal)

  const cartItems = useSelector(state => state.cart.cartItems)

  console.log("CART ITEMS :  ", cartItems, "Total quntity : ", totalQuantity, "total : ", total);


  const addItemToCart = (productDetail) => {
    const productDetailId = productDetail.id
    // for backend 
    const payload = {
      user: userId,
      product_detail: productDetailId,
      quantity: totalQuantity
    }


    const item = {
      wholeProduct,
      productDetail
    }

    const data = {
      payload,
      item
    }

    console.log("PAYLOADDDD :  ", payload, "Product Detailllllll : ", productDetail, "itemmm : ", item);

    if (productDetail.available_quantity == 0) {
      alert("No more quantity avaliable!!")

    }
    else {

      dispatch(updateCartItem(data))

    }
  }


const onColorChangeHandler = (e)=>{
  const payload ={
    color: e.target.value,
    productId: productId,
    size: null
  }
dispatch(searchProductDetail(payload))
  



}

const onSizeChangeHandler = (e) =>{
  const payload ={
    size: e.target.value,
    productId: productId,
    color: null
  }
dispatch(searchProductDetail(payload))
 
}







  return (
    <div>
      <h2>Details</h2>

      <select onChange={onColorChangeHandler}>
        <option selected value="" >Search by Color</option>
        {
          colors.map(color => <option value={color}>{color}</option>)
        }
      </select>

      <select onChange={onSizeChangeHandler}>
        <option selected value="" >Search by Size</option>
        {
          sizes.map(size => <option value={size}>{size}</option>)
        }
      </select>

      {
        productDetail && productDetail.length != 0 ?
          productDetail.map(product => (
            <div className='product-detail-container'>
              <img src={productImage} alt='product' />
              <p>Available quantity : {product.available_quantity}</p>
              <p>Available size : {product.available_size}</p>
              <p>Available color : {product.available_color}</p>
              <p className='add-to-cart' onClick={() => addItemToCart(product)}>Add to Cart</p>

            </div>
          )

          )
          : "No Details found for given product!!"
      }

    </div>
  )
}

export default ProductDetail
