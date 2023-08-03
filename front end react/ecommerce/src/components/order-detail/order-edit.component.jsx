import React from 'react'

import { Edit, NumberInput, ReferenceInput, SimpleForm, TextInput } from 'react-admin'



const OrderEdit = (props) => {
    return (
        <Edit title="Edit a order " {...props} >
            <SimpleForm>
            <TextInput disabled source='id' />
                <ReferenceInput source='user' reference='user' />
                <ReferenceInput source='product_detail' reference='productDetail' />
                <ReferenceInput source='coupon' reference='coupon' />
                <NumberInput source='total_amount' />
                <TextInput source='quantity' />
                <TextInput source='status' />
                


            </SimpleForm>



        </Edit>
    )
}

export default OrderEdit
