import React from 'react'


import { Formik, Field, Form, ErrorMessage } from 'formik'

import * as Yup from 'yup'

import { axiosPOST, axiosIntance } from '../../axiosApi'



import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { checkIsAdmin, setCurrentUser } from '../../store/user/userSlice'

import { useEffect } from 'react'


import { useLocation } from 'react-router-dom'




const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    console.log("LOCATION VALUEEEE : ", location.state);

    const userType = location.state


    const currentUser = useSelector(state => state.user.currentUser)
    console.log("USERRRRR : ", currentUser);
    const isLoading = useSelector(state => state.user.isLoading)
    const error = useSelector(state => state.user.error)
    console.log("ERRORRRRRR : ", error);

    const isAdmin = useSelector(state => state.user.isAdmin)
    console.log("ISADMIN   :    ", isAdmin);


    useEffect(() => {
        currentUser && navigate("/category")
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


        if (userType == 'admin') {

            const resCheckAdmin = await dispatch(checkIsAdmin(payload))
            console.log("Checkis admin res:  ", resCheckAdmin);

            if (resCheckAdmin.meta.requestStatus === 'fulfilled' && !resCheckAdmin.payload.data) {

                console.log("RESPONSE: isADmin user  ", resCheckAdmin.payload.data);
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
                    alert("Successfully Login!!")
                    navigate("/")
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
                alert("Successfully Login!!")
                navigate("/category")
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




    return (
        <div>
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

        </div>
    )
}

export default Login
