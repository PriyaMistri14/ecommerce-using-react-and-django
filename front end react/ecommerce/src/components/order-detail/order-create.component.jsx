import React from 'react'

import { Create, ReferenceInput, SimpleForm, TextInput, NumberInput } from 'react-admin'



const OrderCreate = (props) => {
    return (
        <Create title="Create a order " {...props} >
            <SimpleForm>
                <ReferenceInput source='user' reference='user' />
                <ReferenceInput source='product_detail' reference='productDetail' />
                <ReferenceInput source='coupon' reference='coupon' />
                <TextInput source='quantity' />
                <NumberInput source='total_amount' />
                <TextInput source='status' />
                


            </SimpleForm>



        </Create>
    )
}

export default OrderCreate
