import React from 'react'

import { List, Datagrid, TextField, EditButton, DeleteButton, ImageField, DateField, ReferenceManyField, BooleanField, EmailField } from 'react-admin'



const UserList = (props) => {
  
    return (
        <List {...props}>
            <Datagrid>

                <TextField source='id' />
                <TextField source='username' />
                <TextField source='password' />
                <BooleanField source='is_superuser' />
                <EmailField source='email' />
                <DateField source='date_joined' />             
              
                <EditButton />
                <DeleteButton />


            </Datagrid>

        </List>
    )
}

export default UserList
