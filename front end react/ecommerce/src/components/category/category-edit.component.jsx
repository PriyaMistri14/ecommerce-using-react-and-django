import React from 'react'


import { Edit, SimpleForm , TextInput } from 'react-admin'



const CategoryEdit = (props) => {
  return (
    <Edit title='Edit a category' {...props} >
        <SimpleForm>
            <TextInput disabled source='id' />
            <TextInput source='name' />
            <TextInput source='imageUrl' />

        </SimpleForm>

    </Edit>
  )
}

export default CategoryEdit
