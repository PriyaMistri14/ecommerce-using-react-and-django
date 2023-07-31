import React from 'react'

import { Create, SimpleForm, TextInput, ReferenceInput } from 'react-admin'



const CartItemCreate = (props) => {
    return (
        <Create title="Create a cart item " {...props} >
            <SimpleForm>
                <ReferenceInput source='product_detail' reference='productDetail' />
                <TextInput source='quantity' />


            </SimpleForm>



        </Create>
    )
}

export default CartItemCreate
