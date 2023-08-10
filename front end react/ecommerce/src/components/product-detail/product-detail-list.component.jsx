import React from 'react'

import { List, Datagrid,ReferenceField ,TextField, EditButton, DeleteButton, ImageField, DateField, ReferenceManyField } from 'react-admin'



const ProductDetailList = (props) => {

    return (
        <List {...props}>
            <Datagrid>

                <TextField source='id' />
                <TextField source='available_quantity' />
                <TextField source='available_size' />
                <TextField source='available_color' />
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

export default ProductDetailList
