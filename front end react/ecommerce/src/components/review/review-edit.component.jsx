import React from 'react'


import { Edit, ReferenceInput, SimpleForm , TextInput } from 'react-admin'



const ReviewEdit = (props) => {
  return (
    <Edit title='Edit a category' {...props} >
        <SimpleForm>
        <TextInput disabled source='id' />
            <ReferenceInput source='user' reference='user' />           
            <TextInput source='rating' />
            <TextInput source='description' />
            <ReferenceInput source='product' reference='product' />
            
        </SimpleForm>

    </Edit>
  )
}

export default ReviewEdit
