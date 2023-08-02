import React from 'react'

import { Edit, ReferenceInput, SimpleForm, TextInput } from 'react-admin'



const OrderEdit = (props) => {
    return (
        <Edit title="Edit a order " {...props} >
            <SimpleForm>
            <TextInput disabled source='id' />
                <ReferenceInput source='user' reference='user' />
                <ReferenceInput source='product_detail' reference='productDetail' />
                <TextInput source='quantity' />
                <TextInput source='status' />
                


            </SimpleForm>



        </Edit>
    )
}

export default OrderEdit
