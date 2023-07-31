import React from 'react'

import { List, Datagrid, TextField, EditButton, DeleteButton, ImageField, DateField, ReferenceManyField } from 'react-admin'



const ReviewList = (props) => {
  
    return (
        <List {...props}>
            <Datagrid>

                <TextField source='id' />
                <TextField source='user' />
                <TextField source='ranting'/>
                <TextField source='discription' />                
                <TextField source='product' />
                <DateField source='created_at' />
                <DateField source='updated_at' />             
                <EditButton />
                <DeleteButton />


            </Datagrid>

        </List>
    )
}

export default ReviewList
