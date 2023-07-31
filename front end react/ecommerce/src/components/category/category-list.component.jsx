import React from 'react'

import { List, Datagrid, TextField, EditButton, DeleteButton, ImageField, DateField, ReferenceManyField } from 'react-admin'



const CategoryList = (props) => {
  
    return (
        <List {...props}>
            <Datagrid>

                <TextField source='id' />
                <TextField source='name' />
                <ImageField source='imageUrl' />
                <DateField source='created_at' />
                <DateField source='updated_at' />
                {/* <ReferenceManyField reference='product' target='category' >
                    <Datagrid>
                        <TextField source='name' />
                    </Datagrid>
                </ReferenceManyField> */}
                <EditButton />
                <DeleteButton />


            </Datagrid>

        </List>
    )
}

export default CategoryList
