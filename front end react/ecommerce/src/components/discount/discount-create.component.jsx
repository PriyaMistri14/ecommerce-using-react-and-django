import React from 'react'

import { Create, ReferenceInput, SimpleForm,  NumberInput, DateInput,  BooleanInput } from 'react-admin'



const DiscountCreate = (props) => {
    return (
        <Create title="Create a discount " {...props} >
            <SimpleForm>
                <ReferenceInput source='product' reference='product' />     
                <NumberInput source='percentage' />
                <BooleanInput source='isActive' />
                <DateInput source='due_date' />
                


            </SimpleForm>



        </Create>
    )
}

export default DiscountCreate
