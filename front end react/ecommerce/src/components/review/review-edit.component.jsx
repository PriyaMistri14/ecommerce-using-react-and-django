import React from 'react'


import { Edit, ReferenceInput, SimpleForm , TextInput } from 'react-admin'



const ReviewEdit = (props) => {
  return (
    <Edit title='Edit a category' {...props} >
        <SimpleForm>
            <ReferenceInput source='user' reference='user' />
            <TextInput disabled source='id' />
            <TextInput source='rating' />
            <TextInput source='discription' />
            <ReferenceInput source='product' reference='product' />
            
        </SimpleForm>

    </Edit>
  )
}

export default ReviewEdit
