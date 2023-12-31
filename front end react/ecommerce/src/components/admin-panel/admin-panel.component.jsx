import React from 'react'
import {Admin, Resource} from 'react-admin'

import CategoryList from '../category/category-list.component'

import drfProvider, { jwtTokenAuthProvider, fetchJsonWithAuthJWTToken } from 'ra-data-django-rest-framework';

import CategoryCreate from '../category/category-create.component';

import CategoryEdit from '../category/category-edit.component';

import ProductCreate from '../product/product-create.component';

import ProductEdit from '../product/product-edit.component';

import ProductList from '../product/product-list.component';

import ProductDetailCreate from '../product-detail/product-detail-create.component';

import ProductDetailEdit from '../product-detail/product-detail-edit.component';

import ProductDetailList from '../product-detail/product-detail-list.component';

import CartItemCreate from '../cart-dropdown/cart-item-create.component';

import CartItemEdit from '../cart-dropdown/cart-item-edit.component';

import CartItemList from '../cart-dropdown/cart-item-list.component';

import ReviewCreate from '../review/review-create.component';

import ReviewEdit from '../review/review-edit.component';

import ReviewList from '../review/review-list.component';

import UserCreate from '../user/user-create.component';

import UserEdit from '../user/user-edit.component';

import UserList from '../user/user-list.component';

import OrderCreate from '../order-detail/order-create.component';

import OrderEdit from '../order-detail/order-edit.component';

import OrderList from '../order-detail/order-list.component';

import CouponCreate from '../coupon/coupon-create.component';

import CouponEdit from '../coupon/coupon-edit.component';

import CouponList from '../coupon/coupon-list.component';

import DiscountCreate from '../discount/discount-create.component';

import DiscountEdit from '../discount/discount-edit.component';

import DiscountList from '../discount/discount-list.component';




// ...........
import CustomJwtTokenAuthProvider from './authProvider';

import Login from '../login-form/login-form.component';

const dataProvider = drfProvider("http://localhost:8000/mysite", fetchJsonWithAuthJWTToken);

// ..........
const customAuthProvider = CustomJwtTokenAuthProvider()





const AdminPanel = () => {
    
  return (
    <Admin dataProvider={dataProvider} authProvider={customAuthProvider} loginPage={Login}  >
       <Resource name='category' list={CategoryList} create={CategoryCreate} edit={CategoryEdit} recordRepresentation="name" /> 
       <Resource name='product' list={ProductList} create={ProductCreate} edit={ProductEdit} recordRepresentation="name"/>
       <Resource name='productDetail' list={ProductDetailList} create={ProductDetailCreate} edit={ProductDetailEdit} />
       <Resource name='cartItem' list={CartItemList} create={CartItemCreate} edit={CartItemEdit} />
       <Resource name='review' list={ReviewList} create={ReviewCreate} edit={ReviewEdit} />
       <Resource name='user' list={UserList} create={UserCreate} edit={UserEdit} recordRepresentation="username"/>
       <Resource name='order' list={OrderList} create={OrderCreate} edit={OrderEdit} />
       <Resource name='coupon' list={CouponList} create={CouponCreate} edit={CouponEdit} recordRepresentation="coupon_code" />
       <Resource name='discount' list={DiscountList} create={DiscountCreate} edit={DiscountEdit} />


    </Admin>
  )
}

export default AdminPanel




