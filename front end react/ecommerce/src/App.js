
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
import AdminPanel from './components/admin-panel/admin-panel.component';

import { Admin, Resource } from 'react-admin'

import restProvider from 'ra-data-simple-rest'

import CategoryList from './components/category/category-list.component';

import Logout from './components/logout/logout.component';


// ..............

import drfProvider, { jwtTokenAuthProvider, fetchJsonWithAuthJWTToken } from 'ra-data-django-rest-framework';
import CategoryCreate from './components/category/category-create.component';
import CategoryEdit from './components/category/category-edit.component';
import Checkout from './components/checkout/checkout.component';

const authProvider = jwtTokenAuthProvider()
const dataProvider = drfProvider("http://localhost:8000/mysite", fetchJsonWithAuthJWTToken);


// const dataProvider = drfProvider("http://localhost:8000/mysite");



function App() {
  const currentUser = useSelector(state => state.user.currentUser)
  console.log("Current USERRRRR : ", currentUser);
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const isCartOpen = useSelector(state => state.cart.isCartOpen)

  const isAdmin = useSelector(state => state.user.isAdmin)

  console.log("ISADMIN :  ", isAdmin);



  // const logoutHandler = async () => {

  //   try {

  //     const res = await axiosPOST("auth/logout/", {
  //       refresh_token: localStorage.getItem("refresh_token")
  //     })

  //   }
  //   catch (error) {
  //     console.log("Error while blacklisting tthe token :::::", error)
  //   }

  //   dispatch(removeCurrentUser())


  //   axiosIntance.defaults.headers["Authorization"] = null
  //   localStorage.removeItem("access_token")
  //   localStorage.removeItem("refresh_token")
  //   navigate("/selectUserOrAdmin")


  // }



  return (
    <div className="App">
      <header className="App-header">
      
        {
          isAdmin ? <AdminPanel />:
            <nav className='nav-container'>
              <Link to='/'>LOGO</Link>
              {/* <Link to='/adminPanel'>Admin</Link> */}
              <Link to='/categoryUser'>Category</Link>
              <Link to='/shop'>Shop Now</Link>

              {
                isCartOpen && <CartDropdown />
              }

              {
                currentUser ? <Logout /> : <Link to='/selectUserOrAdmin'>Login</Link>

              }
              <CartIcon />
            </nav>
        }

        {/* <Admin dataProvider={dataProvider}> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loginUser" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/selectUserOrAdmin" element={<SelectUserOrAdmin />} />
          <Route path="/categoryUser" element={<Category />} />
          <Route path="/shop" element={<Shop />} />
          <Route path='/productDetailUser' element={<ProductDetail />} />
          <Route path='/categoryShop' element={<CategoryShop />} />
          <Route path='/checkout' element={<Checkout />} />

          {/* <Route path='/api/token/' element= {<AdminPanel />} /> */}
          {/* <Route path='/adminPanel' element={<AdminPanel />}/> */}

        </Routes>
        {/* {
          isAdmin  &&  <Resource name='category' list={CategoryList} create={CategoryCreate} edit={CategoryEdit} />
        } */}
        {/* <Resource name='category' list={CategoryList} create={CategoryCreate} edit={CategoryEdit} /> */}
        {/* </Admin> */}

      </header>
    </div>
  );
}

export default App;
