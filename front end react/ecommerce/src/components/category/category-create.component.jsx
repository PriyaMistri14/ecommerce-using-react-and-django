import React from 'react'

import { Create, SimpleForm, TextInput } from 'react-admin'



const CategoryCreate = (props) => {
    return (
        <Create title="Create a category " {...props} >
            <SimpleForm>
                <TextInput source='name' />
                <TextInput source='imageUrl' />


            </SimpleForm>



        </Create>
    )
}

export default CategoryCreate
