import React from 'react'


import { Edit, ReferenceInput, SimpleForm , TextInput } from 'react-admin'



const CartItemEdit = (props) => {
  return (
    <Edit title='Edit a category' {...props} >
        <SimpleForm>
            <TextInput disabled source='id' />
            <TextInput source='quantity' />           
            <ReferenceInput source='product_detail' reference='productDetail' />

        </SimpleForm>

    </Edit>
  )
}

export default CartItemEdit
