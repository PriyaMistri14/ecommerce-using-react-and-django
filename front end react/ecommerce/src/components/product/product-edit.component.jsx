import React from 'react'


import { Edit, ReferenceInput, SimpleForm , TextInput } from 'react-admin'



const ProductEdit = (props) => {
  return (
    <Edit title='Edit a category' {...props} >
        <SimpleForm>
            <TextInput disabled source='id' />
            <TextInput source='name' />
            <TextInput source='price' />
            <TextInput source='imageUrl' />
            <ReferenceInput source='category' reference='category' />

        </SimpleForm>

    </Edit>
  )
}

export default ProductEdit
