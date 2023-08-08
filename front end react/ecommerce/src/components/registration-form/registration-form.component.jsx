import React from 'react'

import { ErrorMessage, Form, Field , Formik} from 'formik'

import * as Yup from 'yup'
import { axiosPOST } from '../../axiosApi'

import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { useEffect } from 'react'

import { Link } from 'react-router-dom'


const Register = () => {

    const navigate = useNavigate()
  
    const currentUser = useSelector(state => state.user.currentUser)

    const isAdmin = useSelector(state => state.user.isAdmin)

    useEffect(()=>{
        if (currentUser !== null) {
            isAdmin ? navigate('/category') : navigate('/categoryUser')

        }
      

    },[])





    const initialValues = {
        username: "",
        email:"",
        password : "",
        password2 : ""

    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("This field is required!!"),
        email: Yup.string().email("Invalid email formate!!").required("This field is required!!"),
        password: Yup.string().required("This field is required!!") .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Password should contains minimum 8 characters, one Upper case letter , one lower case letter, one number and one special character!!!"),
        password2: Yup.string().oneOf([Yup.ref('password'),""], "Password not match!!").required("This field is required!!")

    })



    const onSubmit = async(values, field) =>{
        console.log("form data : ", values);
        const payload ={
            username: values.username,
            email: values.email,
            password: values.password,
            password2: values.password2
        }
        try{
            const res = await axiosPOST("auth/register/", payload)
            console.log("RESPONSE :: ", res);
            alert("Successfully Register!!")
            navigate("/loginUser")

        }catch(error){
            console.log("Error while register : ", error);
            if(error.response.status === 400)
            {
                field.setFieldError("username", "Username already exists!!")
            }

        }
    }


  return (
    <div>
        <h2>Register Your self </h2>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
            <Form>
                Username : <Field name='username' type='text'  /><br /><br />
                <ErrorMessage name='username' />
                <br />
                <br />
                Email : <Field name='email' type='email' /><br /><br />
                <ErrorMessage name='email' />
                <br />
                <br />
                Password : <Field name='password' type='password' /><br /><br />
                <ErrorMessage name='password' />
                <br />
                <br />
                Password2 : <Field name='password2' type='password' /><br /><br />
                <ErrorMessage name='password2' />
                <br /><br />

                <button type='submit'>Register</button><br />

            </Form>


        </Formik>
       
            <br />
            <br />
            <p>Already have an account ? <Link to='/loginUser'>Register</Link></p>

      
    </div>
  )
}

export default Register
