import React from 'react'

import { Create, ReferenceInput, SimpleForm, TextInput  } from 'react-admin'


const ProductCreate = (props) => {
  return (
   <Create title='Create a product' {...props}>
    <SimpleForm>
        <TextInput source='name' />
        <TextInput source='imageUrl' />
        <TextInput source='price' />
        <ReferenceInput source='category' reference='category' />

    </SimpleForm>

   </Create>
  )
}

export default ProductCreate
