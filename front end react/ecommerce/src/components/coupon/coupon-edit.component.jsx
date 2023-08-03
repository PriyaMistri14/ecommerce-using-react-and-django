import React from 'react'

import { Edit, SimpleForm, TextInput, BooleanInput, NumberInput } from 'react-admin'


const CouponEdit = (props) => {
    return (
        <Edit title='Edit a coupon' {...props}>
            <SimpleForm>
                <TextInput disabled source='id' />
                <TextInput source='coupon_code' />
                <BooleanInput source='is_expired' />
                <NumberInput source='discount_price' />
                <NumberInput source='minimum_amount' />
            </SimpleForm>

        </Edit>
    )
}

export default CouponEdit
