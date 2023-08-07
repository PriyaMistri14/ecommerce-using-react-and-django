import React from 'react'

import { Edit, ReferenceInput, SimpleForm, BooleanInput, TextInput ,NumberInput, DateInput } from 'react-admin'



const DiscountEdit = (props) => {
    return (
        <Edit title="Edit a discount " {...props} >
            <SimpleForm>
                <TextInput disabled source='id' />
                <ReferenceInput source='product' reference='product' />
                <NumberInput source='percentage' />
                <BooleanInput source='isActive' />
                <DateInput source='due_date' />



            </SimpleForm>



        </Edit>
    )
}

export default DiscountEdit
