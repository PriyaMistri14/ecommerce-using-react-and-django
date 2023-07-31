import React from 'react'

import { List, Datagrid, TextField, EditButton, DeleteButton, ImageField, DateField, ReferenceManyField } from 'react-admin'



const ProductList = (props) => {
   
    return (
        <List {...props}>
            <Datagrid>

                <TextField source='id' />
                <TextField source='category'/>
                <TextField source='name' />
                <ImageField source='imageUrl' />
                <TextField source='price' />
                <DateField source='created_at' />
                <DateField source='updated_at' />             
                <EditButton />
                <DeleteButton />


            </Datagrid>

        </List>
    )
}

export default ProductList
