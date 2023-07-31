import React from 'react'

import { BooleanInput, Create, EmailField, PasswordInput, SimpleForm, TextInput } from 'react-admin'



const UserCreate = (props) => {
    return (
        <Create title="Create a user " {...props} >
            <SimpleForm>
                <TextInput source='username' />
                <EmailField source = 'email' />
                <BooleanInput source='is_superuser' />
                <PasswordInput source='password' />
            </SimpleForm>



        </Create>
    )
}

export default UserCreate
