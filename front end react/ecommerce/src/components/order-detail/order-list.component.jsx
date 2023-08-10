import React from 'react'

import { List, Datagrid, TextField, EditButton, DeleteButton, ReferenceField, DateField, ReferenceManyField, NumberField } from 'react-admin'



const OrderList = (props) => {
  
    return (
        <List {...props}>
            <Datagrid>

                <TextField source='id' />
                {/* <TextField source='user' /> */}
                <ReferenceField source="user" reference="user">
                    <TextField source="username" />
                </ReferenceField>
            
                <TextField source='product_detail'/>
              
                <TextField source='discount' />
                <TextField source='coupon' />
                <TextField source='quantity' />                
                <TextField source='status' />
                <NumberField source='total_amount' />
                <DateField source='created_at' />
                <DateField source='updated_at' />             
                <EditButton />
                <DeleteButton />


            </Datagrid>

        </List>
    )
}

export default OrderList
