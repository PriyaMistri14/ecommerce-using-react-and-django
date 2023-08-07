import React from 'react'

import { List, Datagrid, TextField, EditButton, DeleteButton, DateField, NumberField, BooleanField } from 'react-admin'



const DiscountList = (props) => {
  
    return (
        <List {...props}>
            <Datagrid>

                <TextField source='id' />
                <TextField source='product' />
                <NumberField source='percentage' />
                <BooleanField source='isActive' />
                <DateField source='due_date' />
                <DateField source='created_at' />
                <DateField source='updated_at' />             
                <EditButton />
                <DeleteButton />


            </Datagrid>

        </List>
    )
}

export default DiscountList
