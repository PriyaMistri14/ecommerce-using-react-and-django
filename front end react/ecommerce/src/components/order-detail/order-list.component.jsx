import React from 'react'

import { List, Datagrid, TextField, EditButton, DeleteButton, ImageField, DateField, ReferenceManyField } from 'react-admin'



const OrderList = (props) => {
  
    return (
        <List {...props}>
            <Datagrid>

                <TextField source='id' />
                <TextField source='user' />
                <TextField source='product_detail'/>
                <TextField source='quantity' />                
                <TextField source='status' />
                <DateField source='created_at' />
                <DateField source='updated_at' />             
                <EditButton />
                <DeleteButton />


            </Datagrid>

        </List>
    )
}

export default OrderList
