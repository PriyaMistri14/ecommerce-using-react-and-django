import React from 'react'


import { Edit, ReferenceInput, SimpleForm , TextInput } from 'react-admin'



const ProductDetailEdit = (props) => {
  return (
    <Edit title='Edit a category' {...props} >
        <SimpleForm>
            <TextInput disabled source='id' />
            <TextInput source='available_quantity' />
            <TextInput source='available_size' />
            <TextInput source='available_color' />
            <ReferenceInput source='product' reference='product' />
            
        </SimpleForm>

    </Edit>
  )
}

export default ProductDetailEdit
