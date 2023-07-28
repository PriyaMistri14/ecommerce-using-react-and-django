
import './App.css';

import { Routes, Route, Link } from "react-router-dom";

import HomePage from './components/home-page/home-page.component';

import Login from './components/login-form/login-form.component';

import Register from './components/registration-form/registration-form.component';

import { useSelector } from 'react-redux';

import { axiosIntance, axiosPOST } from './axiosApi';

import { useNavigate } from 'react-router-dom';


import { removeCurrentUser } from './store/user/userSlice';

import { useDispatch } from 'react-redux';
import SelectUserOrAdmin from './components/selectUserOrAdmin/selectUserOrAdmin.component';
import Category from './components/category/category.component';



import Shop from './components/shop/shop.component';
import ProductDetail from './components/product-detail/product-detail.component';
import CartIcon from './components/cart-icon/cart-icon.component';

import CartDropdown from './components/cart-dropdown/cart-dropdown.component';
import CategoryShop from './components/category-shop/category-shop.component';







function App() {
  const currentUser = useSelector(state => state.user.currentUser)
  console.log("Current USERRRRR : ", currentUser);
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const isCartOpen = useSelector(state => state.cart.isCartOpen)



  const logoutHandler = async () => {

    try {

      const res = await axiosPOST("auth/logout/", {
        refresh_token: localStorage.getItem("refresh_token")
      })

    }
    catch (error) {
      console.log("Error while blacklisting tthe token :::::", error)
    }

    dispatch(removeCurrentUser())


    axiosIntance.defaults.headers["Authorization"] = null
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    navigate("/selectUserOrAdmin")


  }



  return (
    <div className="App">
      <header className="App-header">
        <nav className='nav-container'>
          <Link to='/'>LOGO</Link>
          <Link to='/category'>Category</Link>
          <Link to='/shop'>Shop Now</Link>

          {
            isCartOpen && <CartDropdown />
          }

          {
            currentUser ? <p onClick={logoutHandler}>Logout</p> : <Link to='/selectUserOrAdmin'>Login</Link>

          }
          <CartIcon />
        </nav>


        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/selectUserOrAdmin" element={<SelectUserOrAdmin />} />
          <Route path="/category" element={<Category />} />
          <Route path="/shop" element={<Shop />} />
          <Route path='/productDetail' element={<ProductDetail />} />
          <Route path='/categoryShop' element={<CategoryShop />}   />


        </Routes>

      </header>
    </div>
  );
}

export default App;
