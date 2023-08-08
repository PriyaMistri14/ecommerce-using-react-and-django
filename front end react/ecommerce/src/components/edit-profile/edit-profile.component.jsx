import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { useEffect } from 'react'

import { ErrorMessage, Form, Field, Formik } from 'formik'

import * as Yup from 'yup'
import { axiosPUT } from '../../axiosApi'



const EditProfile = () => {

    const navigate = useNavigate()

    const currentUser = useSelector(state => state.user.currentUser)

    const isAdmin = useSelector(state => state.user.isAdmin)

    const userId = currentUser ? currentUser.userId : 0

    const userEmail = currentUser ? currentUser.userEmail : ""

    const username = currentUser ? currentUser.username : ""

    const userFirstName = currentUser ? currentUser.userFirstName : ""

    const userLastName = currentUser ? currentUser.userLastName : ""



    useEffect(() => {
        if (currentUser !== null) {
            isAdmin && navigate('/category')

        }
        else {
            navigate("/selectUserOrAdmin")
        }


    }, [])



    const initialValues = {
        username: username,
        userEmail: userEmail,
        userFirstName: userFirstName,
        userLastName: userLastName

    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("This field is required!!"),
        userEmail: Yup.string().email("Invalid email format!!").required("This field is required!!"),
        userFirstName: Yup.string().required("This field is required!!"),
        userLastName: Yup.string().required("This field is required!!"),

    })



    const onSubmit = async (values, field) => {
        console.log("form data : ", values);
        const payload = {
            username: values.username,
            email: values.userEmail,
            first_name: values.userFirstName,
            last_name: values.userLastName
        }

        const res = await axiosPUT(`auth/updateProfile/${userId}`, payload)
        console.log("Update profile!! res : ", res.data);
        alert("Profile saved successfully!!")
        navigate("/categoryUser")

    }


    return (

        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >

                <Form>

                    User Name  : <Field name='username' type='text' />
                    <br />
                    <br />
                    <ErrorMessage name='username' /><br /><br />

                    User Email : <Field name='userEmail' type='email' />
                    <br />
                    <br />
                    <ErrorMessage name='userEmail' />
                    <br />
                    <br />
                    User First Name : <Field name='userFirstName' type='text' />
                    <br />
                    <br />
                    <ErrorMessage name='userFirstName' />
                    <br />
                    <br />
                    User Last Name : <Field name='userLastName' type='text' />
                    <br />
                    <br />
                    <ErrorMessage name='userLastName' />
                    <br />
                    <br />
                    <button type='submit'>Save</button>
                    <button onClick={() => navigate('/categoryUser')} >Cancel</button>
                    <br />

                </Form>

            </Formik>

        </div>
    )
}

export default EditProfile
