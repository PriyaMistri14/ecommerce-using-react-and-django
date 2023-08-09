import React from 'react'

import { Create, ReferenceInput, SimpleForm, TextInput  } from 'react-admin'


const ProductDetailCreate = (props) => {
  return (
   <Create title='Create a product detail' {...props}>
    <SimpleForm>
        <TextInput source='available_quantity' />
        <TextInput source='available_size' />
        <TextInput source='available_color' />
        <ReferenceInput source='product' reference='product' />      

    </SimpleForm>

   </Create>
  )
}

export default ProductDetailCreate
