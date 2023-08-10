import React from 'react'


import { Edit, ReferenceInput, SimpleForm, TextInput, SelectInput } from 'react-admin'



const ReviewEdit = (props) => {
  return (
    <Edit title='Edit a category' {...props} >
      <SimpleForm>
        <TextInput disabled source='id' />
        <ReferenceInput source='user' reference='user' />        
        {/* <TextInput source='rating' /> */}
        <SelectInput source="rating" choices={[
          { id: '1', name: '1' },
          { id: '2', name: '2' },
          { id: '3', name: '3' },
          { id: '4', name: '4' },
          { id: '5', name: '5' },    
        ]} />
        <TextInput source='description' />
        <ReferenceInput source='product' reference='product' />

      </SimpleForm>

    </Edit>
  )
}

export default ReviewEdit
