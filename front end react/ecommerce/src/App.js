
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







function App() {
  const data = useSelector(state => state.user.currentUser)
  console.log("Current USERRRRR : ", data);
  const navigate = useNavigate()

  const dispatch = useDispatch()



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
    navigate("/login/")


  }



  return (
    <div className="App">
      <header className="App-header">
        <nav className='nav-container'>
          <Link to='/'>LOGO</Link>

{
data ? <p onClick={logoutHandler}>Logout</p> :  <Link to='/login'>Login</Link>

}

         
          

        </nav>


        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

      </header>
    </div>
  );
}

export default App;