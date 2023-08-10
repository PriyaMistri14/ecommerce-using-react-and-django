
import './App.css';

import { Routes, Route, Link } from "react-router-dom";

import HomePage from './components/home-page/home-page.component';

import { useSelector } from 'react-redux';

import CartIcon from './components/cart-icon/cart-icon.component';

import CartDropdown from './components/cart-dropdown/cart-dropdown.component';

import AdminPanel from './components/admin-panel/admin-panel.component';

import Logout from './components/logout/logout.component';

import '@stripe/stripe-js'

import UserProfile from './components/user-profile/user-profile.component';

import UserProfileIcon from './components/user-profile-icon/user-profile-icon.component';

import { ReactComponent as Logo } from '../src/assets/crown.svg'

import { lazy } from 'react';

import { Suspense } from 'react';

import { useState } from 'react';
import { current } from '@reduxjs/toolkit';




const Login = lazy(() => import('./components/login-form/login-form.component'))

const Register = lazy(() => import('./components/registration-form/registration-form.component'))

const SelectUserOrAdmin = lazy(() => import('./components/selectUserOrAdmin/selectUserOrAdmin.component'))

const Category = lazy(() => import('./components/category/category.component'))

const Shop = lazy(() => import('./components/shop/shop.component'))

const ProductDetail = lazy(() => import('./components/product-detail/product-detail.component'))

const CategoryShop = lazy(() => import('./components/category-shop/category-shop.component'))

const Checkout = lazy(() => import('./components/checkout/checkout.component'))

const OrderDetail = lazy(() => import('./components/order-detail/order-detail.component'))

const Success = lazy(() => import('./components/success/success.component'))

const ReviewForm = lazy(() => import('./components/review/review-form.component'))

const ForgotPassword = lazy(() => import('./components/forgot-password/forgot-password.component'))

const EditProfile = lazy(() => import('./components/edit-profile/edit-profile.component'))




function App() {
  const currentUser = useSelector(state => state.user.currentUser)
  console.log("Current USERRRRR : ", currentUser);

  const isCartOpen = useSelector(state => state.cart.isCartOpen)

  const isAdmin = useSelector(state => state.user.isAdmin)

  console.log("ISADMIN :  ", isAdmin);

  const isUserProfileCartOpen = useSelector(state => state.user.isUserProfileCartOpen)

  const [currentTab, setCurrentTab] = useState("")


  return (
    <div className="App">
      <header className="App-header">

        {
          isAdmin ? <AdminPanel /> :
            <nav className='nav-container'>
              {

                currentTab == "home" ? <Link to='/' onClick={() => setCurrentTab("home")} style={{ 'background-color': 'red' }} ><Logo className='logo' /></Link> : <Link to='/' onClick={() => setCurrentTab("home")}><Logo className='logo' /></Link>
              }

              {
                currentTab == "category" ? <Link to='/categoryUser' onClick={() => setCurrentTab("category")} style={{ 'background-color': 'red' }}>Category</Link> : <Link to='/categoryUser' onClick={() => setCurrentTab("category")}>Category</Link>
              }

              {
                currentTab == "shop" ? <Link to='/shop' onClick={() => setCurrentTab("shop")} style={{ 'background-color': 'red' }}>Shop Now</Link> : <Link to='/shop' onClick={() => setCurrentTab("shop")} >Shop Now</Link>
              }

              {
                currentTab == "order" ? <Link to='/orderDetails' onClick={() => setCurrentTab("order")} style={{ 'background-color': 'red' }}>See Orders</Link> : <Link to='/orderDetails' onClick={() => setCurrentTab("order")}>See Orders</Link>

              }

              {
                isCartOpen && <CartDropdown />
              }
              {
                isUserProfileCartOpen && <UserProfile />
              }

              {
                currentUser ? <Logout /> : <Link to='/selectUserOrAdmin'>Login</Link>

              }
              {
                currentTab == "profile" ? <div onClick={() => setCurrentTab("profile")} style={{ 'background-color': 'red' }}><UserProfileIcon /></div> : <div onClick={() => setCurrentTab("profile")}><UserProfileIcon  /></div>
              }
             
              <CartIcon />

            </nav>
        }


        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loginUser" element={<Suspense fallback='Loading...'><Login /></Suspense>} />
          <Route path="/register" element={<Suspense fallback='Loading....'><Register /></Suspense>} />
          <Route path="/selectUserOrAdmin" element={<Suspense fallback='Loading...'><SelectUserOrAdmin /></Suspense>} />
          <Route path="/categoryUser" element={<Suspense fallback='Loading...'><Category /></Suspense>} />
          <Route path="/shop" element={<Suspense fallback='Loading...'><Shop /></Suspense>} />
          <Route path='/productDetailUser' element={<Suspense fallback='Loading...'><ProductDetail /></Suspense>} />
          <Route path='/categoryShop' element={<Suspense fallback='Loading...'><CategoryShop /></Suspense>} />
          <Route path='/checkout' element={<Suspense fallback='Loading...'><Checkout /></Suspense>} />
          <Route path='/orderDetails' element={<Suspense fallback='Loading...'><OrderDetail /></Suspense>} />
          <Route path='/success/:orderId' element={<Suspense fallback='Loading...'><Success /></Suspense>} />
          <Route path='/giveReview' element={<Suspense fallback='Loading...'><ReviewForm /></Suspense>} />
          <Route path='/forgotPassword' element={<Suspense fallback='Loading...'><ForgotPassword /></Suspense>} />
          <Route path='/editProfile' element={<Suspense fallback='Loading...'><EditProfile /></Suspense>} />

        </Routes>


      </header>
    </div>
  );
}

export default App;
