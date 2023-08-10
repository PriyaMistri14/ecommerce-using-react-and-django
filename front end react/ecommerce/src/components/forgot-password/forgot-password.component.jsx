import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { useEffect } from 'react'

import { ErrorMessage, Form, Field, Formik } from 'formik'

import * as Yup from 'yup'
import { axiosPUT } from '../../axiosApi'
const OTP = Math.random().toString().substr(2, 6)
console.log("-------------------OTP-------------------------   :  ", OTP);
var counter = 20;

var timer = setInterval(() => {     

    if (counter < 0) {

        clearInterval(timer);
        alert("Times Up! , OTP is resended!!")
        window.location.reload()
    } else {
       
        document.getElementById("counter").innerHTML = 'Time remaning : ' + counter
        counter--;
    }
}, 1000);

console.log("Counter :   ", counter);


const ForgotPassword = () => {

    const navigate = useNavigate()

    const currentUser = useSelector(state => state.user.currentUser)

    const isAdmin = useSelector(state => state.user.isAdmin)

    const userId = currentUser ? currentUser.userId : 0



    useEffect(() => {
        if (currentUser !== null) {
            isAdmin && navigate('/category')

        }    


    }, [])



    const initialValues = {
        OTP: "",
        password: "",
        password2: ""

    }

    const validationSchema = Yup.object().shape({
        OTP: Yup.string().required("This field is required!!").max(6, "Only six digits!!").min(6, "Only six digits!!")
            .test('OTP', 'Invalid OTP!!', (value) => {
                return value == OTP
            }),

        password: Yup.string().required("This field is required!!").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password should contains minimum 8 characters, one Upper case letter , one lower case letter, one number and one special character!!!"),
        password2: Yup.string().oneOf([Yup.ref('password'), ""], "Password not match!!").required("This field is required!!")

    })



    const onSubmit = async (values, field) => {        
        console.log("form data : ", values);
        const payload ={
            password : values.password,
            password2 : values.password2
        }
 
        const res = await axiosPUT(`auth/changePassword/${userId}`, payload)
        console.log("Password reset!! res : ", res.data);
        alert("Password Changed successfully!!")
        navigate("/loginUser")
        
    }


    return (

        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >

                <Form>

                    OTP : <Field name='OTP' type='text' />
                    <br />
                    <br />
                    <ErrorMessage name='OTP' /><br /><br />
                   <span id='counter'></span>  {/* for timer to display remaining time for OTP valid*/}
                    <br />
                    <br />
                    Password : <Field name='password' type='password' />
                    <br />
                    <br />
                    <ErrorMessage name='password' />
                    <br />
                    <br />
                    Password2 : <Field name='password2' type='password' />
                    <br />
                    <br />
                    <ErrorMessage name='password2' />
                    <br />
                    <br />
                    <button type='submit'>Change Password</button>
                    <br />


                </Form>

            </Formik>

        </div>
    )
}

export default ForgotPassword
