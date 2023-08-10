import React from 'react'

import { List, Datagrid, TextField, EditButton, DeleteButton, ReferenceField, DateField, ReferenceManyField } from 'react-admin'



const CartItemList = (props) => {
  
    return (
        <List {...props}>
            <Datagrid>

                <TextField source='id' />
                <TextField source='product_detail' />
                <ReferenceField source="user" reference="user">
                    <TextField source="username" />
                </ReferenceField>
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
