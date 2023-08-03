import React from 'react'

import { List, Datagrid, TextField, EditButton, DeleteButton,  DateField,NumberField, BooleanField } from 'react-admin'



const CouponList = (props) => {
  
    return (
        <List {...props}>
            <Datagrid>

                <TextField source='id' />
                <TextField source='coupon_code'/>
                <BooleanField source='is_expired' />
                <NumberField source='discount_price' />
                <NumberField source='minimum_amount' />
                <DateField source='created_at' />
                <DateField source='updated_at' />             
                <EditButton />
                <DeleteButton />


            </Datagrid>

        </List>
    )
}

export default CouponList
