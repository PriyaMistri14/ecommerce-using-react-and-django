import React from 'react'

import { List, Datagrid, TextField, EditButton, DeleteButton, ReferenceField, DateField, ReferenceManyField } from 'react-admin'



const ReviewList = (props) => {
  
    return (
        <List {...props}>
            <Datagrid>

                <TextField source='id' />
                {/* <TextField source='user' /> */}
                <ReferenceField source="user" reference="user">
                    <TextField source="username" />
                </ReferenceField>
                <TextField source='rating'/>
                <TextField source='description' />                
                {/* <TextField source='product' /> */}
                <ReferenceField source="product" reference="product">
                    <TextField source="name" />
                </ReferenceField>
                <DateField source='created_at' />
                <DateField source='updated_at' />             
                <EditButton />
                <DeleteButton />


            </Datagrid>

        </List>
    )
}

export default ReviewList
