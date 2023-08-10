import React from 'react'


import { Formik, Field, Form, ErrorMessage } from 'formik'

import * as Yup from 'yup'

import { axiosPOST, axiosIntance, axiosGET } from '../../axiosApi'



import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { checkIsAdmin, removeCurrentUser, setCurrentUser, setIsAdmin } from '../../store/user/userSlice'

import { useEffect } from 'react'


import { useLocation } from 'react-router-dom'



import { Link } from 'react-router-dom'


import './login-form.styles.css'


import GoogleLogin from 'react-google-login'

import { gapi } from 'gapi-script';

import { setCurrentUserAfterGoogleLogin } from '../../store/user/userSlice'



const googleClientId= '371515150052-oglnu8uq79or7g660o79nvff0p79fsn6.apps.googleusercontent.com'
const drfClientId = 'itZtZQNnZmbqMaeWsiSUBthfgFNfTt32L1dTbAn6'
const drfClientSecret = 'uZvpvcD4SmKlCuJqT5HgoIsPDW64JCimvFtmb9V4HxKWFZsTtM4x8kzN2H5HxvshxHMlSEtGdzyPrH2WrYcl6kYbVubP4vMWS8vztqiJp5QK11xXlqv73aqQKSR00zhQ'








const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    console.log("LOCATION VALUEEEE : ", location.state);

    const userType = location.state


    const currentUser = useSelector(state => state.user.currentUser)
    console.log("USERRRRR : ", currentUser);
    var isLoading = useSelector(state => state.user.isLoading)
    const error = useSelector(state => state.user.error)
    console.log("ERRORRRRRR : ", error);

    const isAdmin = useSelector(state => state.user.isAdmin)
    console.log("ISADMIN   :    ", isAdmin);

    if (userType == 'admin') {
        console.log("if is called");
        const res = dispatch(setIsAdmin(true))
        console.log("Response in if after : ", res);
    }

    // ....................



    function AuthPage() {
        useEffect(() => {
            function start() {
                gapi.client.init({
                    clientId: '371515150052-oglnu8uq79or7g660o79nvff0p79fsn6.apps.googleusercontent.com',
                    scope: 'email',
                });
            }

            gapi.load('client:auth2', start);
        }, []);
    }
    // ........................

    useEffect(() => {
        const token = localStorage.getItem('access_token')

        if (currentUser !== null && token) {
            isAdmin ? navigate('/category') : navigate('/categoryUser')

        }




    }, [])





    const initialValues = {
        username: "",
        password: ""
    }


    const onSubmit = async (values, field) => {
        console.log("Form data :  ", values, "field : ", field);



        const payload = {
            username: values.username,
            password: values.password
        }


        if (isAdmin) {

            const resCheckAdmin = await dispatch(checkIsAdmin(payload))
            console.log("Checkis admin res:  ", resCheckAdmin);

            if (resCheckAdmin.meta.requestStatus === 'fulfilled' && !resCheckAdmin.payload) {
                console.log("If condition is true");


                field.setFieldError("password", "No active ADMIN account found for given credentials!!")
            }
            else {

                const res = await dispatch(setCurrentUser(payload))
                console.log("RES:  ", res);

                if (res.meta.requestStatus === 'fulfilled') {
                    // const res = await axiosPOST("auth/login/", payload)
                    console.log("RESPONSE:  ", res.payload.access);
                    axiosIntance.defaults.headers['Authorization'] = 'JWT ' + res.payload.access
                    localStorage.setItem("access_token", res.payload.access)
                    localStorage.setItem("refresh_token", res.payload.refresh)
                    alert("Successfully Login!! as Admin!!")
                    navigate("/category")
                }

                // res.meta.requestStatus === 'rejected'

                else {
                    field.setFieldError("password", "Invalid credential!!")
                }
            }
        }

        else {


            const res = await dispatch(setCurrentUser(payload))
            console.log("RES:  ", res);

            if (res.meta.requestStatus === 'fulfilled') {
                // const res = await axiosPOST("auth/login/", payload)
                console.log("RESPONSE:  ", res.payload.access);
                axiosIntance.defaults.headers['Authorization'] = 'JWT ' + res.payload.access
                localStorage.setItem("access_token", res.payload.access)
                localStorage.setItem("refresh_token", res.payload.refresh)
                alert("Successfully Login!! as User !!!")
                navigate("/categoryUser")
            }

            // res.meta.requestStatus === 'rejected'

            else {
                field.setFieldError("password", "No active USER account found for given credentials !!")
            }


        }




    }


    const validationSchema = Yup.object().shape({
        username: Yup.string().required("This field is required!!"),
        password: Yup.string().required("This field is required!!")
    })


    const changeRole = () => {
        dispatch(removeCurrentUser())
        dispatch(setIsAdmin(false))
        navigate('/selectUserOrAdmin')
    }




    const responseGoogle = async(response) => {
        isLoading = true
      
    
       const payload2 =  {
            token: response.accessToken,
            backend: "google-oauth2",
            grant_type: "convert_token",
            client_id: drfClientId,
            client_secret: drfClientSecret,
          }


        const result = await axiosPOST('auth2/convert-token', payload2)  

        console.log("...........................result : ", result);

        const r = await axiosGET('mysite/user/')
        const allUsers = r.data
        const filtered = allUsers.filter(user => user.first_name == response.profileObj.givenName ||
            user.last_name == response.profileObj.familyName  ||
            user.username == response.profileObj.email.split('@')[0] ||
            user.email ==  response.profileObj.email)
            
        console.log("Alluser : ", allUsers , "filtered users : ", filtered, "Response : ", response.profileObj.givenName);
        const userId = filtered.length != 0 ?  filtered[0].id : 0

        const payload ={
            access : result.data.access_token,
            refresh: result.data.refresh_token,
            userId: userId,
            userEmail: response.profileObj.email,
            userFirstName : response.profileObj.givenName,
            userLastName : response.profileObj.familyName,
            username : response.profileObj.email.split('@')[0]


        }

        const res =  dispatch(setCurrentUserAfterGoogleLogin(payload))

        axiosIntance.defaults.headers['Authorization'] = 'JWT ' + result.data.access_token
        localStorage.setItem("access_token", result.data.access_token)
        localStorage.setItem("refresh_token", result.data.refresh_token)



        console.log("response google login :  ", response, "payload : ", payload, "response : ", res);
       isLoading= false
        alert("Successfully login!!")
        navigate("/categoryUser")
    }



    return (
       isLoading ? <p>Loading......</p> :  <div>
            <br />


            <p onClick={changeRole} className='change-role-btn'>Change Role</p>
            <h2>Login Form</h2>


            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                <Form >
                    Username : <Field name='username' type='text' /><br /><br />
                    <ErrorMessage name='username' />
                    <br /><br />

                    Password : <Field name='password' type='password' /><br /><br />

                    <ErrorMessage name="password" />
                    <br /><br />

                    <button type='submit'>Login</button>
                    <br />



                </Form>

            </Formik>
            <br />
            <br />

            <GoogleLogin
                clientId="371515150052-oglnu8uq79or7g660o79nvff0p79fsn6.apps.googleusercontent.com"
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />

            <p>Forgot password ? <Link to='/forgotPassword'>Click here</Link></p>
            <p>Don't have an account ? <Link to='/register'>Register</Link></p>

        </div>
    )
}

export default Login
