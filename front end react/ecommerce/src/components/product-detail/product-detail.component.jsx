import React from 'react'

import { useLocation } from 'react-router-dom'

import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'


import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'

import { fetchProductDetail } from '../../store/product/productSlice'


import './product-detail.styles.css'
import { updateCartItem } from '../../store/cart/cartSlice'


import { searchProductDetail } from '../../store/product/productSlice'


import { setIsReviewCartOpen } from '../../store/review/reviewSlice'
import Review from '../review/review.component'




const ProductDetail = () => {


  const colors = ['Red', 'Black', 'Blue', 'Green', 'Pink', 'Orange', 'White']
  const sizes = ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']


  const navigate = useNavigate()

  const location = useLocation()

  console.log("LOCATION VALUE PRODUCT ID :  ", location.state);

  const productId = location.state.productId
  const productImage = location.state.productImage
  const productPrice = location.state.productPrice

  console.log("Product id and product img and product price : ", productId, productImage, productPrice);


  const currentUser = useSelector(state => state.user.currentUser)

  const isAdmin = useSelector(state => state.user.isAdmin)

  const isLoading = useSelector(state => state.product.isLoading)


const isReviewCartOpen = useSelector(state => state.review.isReviewCartOpen)


  const dispatch = useDispatch()

  useEffect(() => {

    if (currentUser !== null) {
      isAdmin && navigate('/category')

      const res = dispatch(fetchProductDetail(productId))
      console.log("RRRRRRR : ", res);

    }
    else {
      navigate('/selectUserOrAdmin')
    }



  }, [])


  // const productDetail = useSelector(state => state.product.productDetail.product_details)
  const wholeProduct = useSelector(state => state.product.productDetail)
  const productDetail = wholeProduct === null ? [] : wholeProduct.product_details



  console.log("Product details:UUUUUUU  ", productDetail, "whole product: ", wholeProduct);

  const userId = currentUser === null ? "" : currentUser.userId

  const addItemToCart = (productDetail) => {
    const productDetailId = productDetail.id
    // for backend 
    const payload = {
      user: userId,
      product_detail: productDetailId,

    }


    const item = {
      wholeProduct,
      productDetail
    }

    const data = {
      payload,
      item
    }
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<", data.item.productDetail.available_quantity);
    console.log("PAYLOADDDD :  ", payload, "Product Detailllllll : ", productDetail, "itemmm : ", item);

    if (productDetail.available_quantity == 0) {
      alert("No more quantity avaliable!!")

    }
    else {

      dispatch(updateCartItem(data))

    }
  }


  const onColorChangeHandler = (e) => {
    const payload = {
      color: e.target.value,
      productId: productId,
      size: null
    }
    dispatch(searchProductDetail(payload))




  }

  const onSizeChangeHandler = (e) => {
    const payload = {
      size: e.target.value,
      productId: productId,
      color: null
    }
    dispatch(searchProductDetail(payload))

  }


  const setReviewCart = ()=>{
    dispatch(setIsReviewCartOpen())
  }





console.log("isReviewCartOpen : ", isReviewCartOpen);



  return (

    <div>

      <h2>Details</h2>

      <select onChange={onColorChangeHandler} className='color-select'>
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
      <br />
      <br />

      <img src={productImage} alt='product' />
      <p>Price : ${productPrice}</p>

      <div className='product-detail-main-container'>
        {
          productDetail && productDetail.length != 0 ?
            productDetail.map(product => (
              <div className='product-detail-container'>

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
      <p>Available Items:</p>
      <p>Please select any radio button to add that product to cart !!</p>

      {
        productDetail && productDetail.length != 0 ? productDetail.map(product =>
          <div>
            <input type='radio' name='color' value={product} onClick={() => addItemToCart(product)} />
            <label><strong>Color : </strong>{product.available_color}</label>
            <label><strong> Size : </strong> {product.available_size}</label>
            <label><strong> Quantity : </strong>{product.available_quantity}</label>
          </div>) :
          "No details found for given product!!"

      }

<br />
<br />
      <div className='review-container'>
        {
          isReviewCartOpen ? <span onClick={setReviewCart}>Cancle</span> : <span onClick={setReviewCart}>See review</span>
        }

        {
          isReviewCartOpen && <Review productId={productId}/>
        }

      </div>

    </div>
  )
}

export default ProductDetail
