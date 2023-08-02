import React from 'react'

import { Create, ReferenceInput, SimpleForm, TextInput } from 'react-admin'



const OrderCreate = (props) => {
    return (
        <Create title="Create a order " {...props} >
            <SimpleForm>
                <ReferenceInput source='user' reference='user' />
                <ReferenceInput source='product_detail' reference='productDetail' />
                <TextInput source='quantity' />
                <TextInput source='status' />
                


            </SimpleForm>



        </Create>
    )
}

export default OrderCreate
