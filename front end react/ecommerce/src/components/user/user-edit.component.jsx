import React from 'react'


import { Edit, SimpleForm, TextInput , EmailField, BooleanInput, PasswordInput} from 'react-admin'



const UserEdit = (props) => {
    return (
        <Edit title='Edit a category' {...props} >
            <SimpleForm>
                <TextInput disabled source='id' />
                <TextInput source='username' />
                <EmailField source='email' />
                <BooleanInput source='is_superuser' />
                <PasswordInput source='password' />

            </SimpleForm>

        </Edit>
    )
}

export default UserEdit
