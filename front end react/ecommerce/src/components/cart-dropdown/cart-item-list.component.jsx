import React from 'react'

import { List, Datagrid, TextField, EditButton, DeleteButton, ImageField, DateField, ReferenceManyField } from 'react-admin'



const CartItemList = (props) => {
  
    return (
        <List {...props}>
            <Datagrid>

                <TextField source='id' />
                <TextField source='product_detail' />
                <TextField source='quantity'/>  
                <DateField source='created_at' />
                <DateField source='updated_at' />             
                <EditButton />
                <DeleteButton />


            </Datagrid>

        </List>
    )
}

export default CartItemList
