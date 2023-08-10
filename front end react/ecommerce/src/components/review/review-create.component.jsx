import React from 'react'

import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'react-admin'


const ReviewCreate = (props) => {
  return (
    <Create title='Create a review' {...props}>
      <SimpleForm>
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

    </Create>
  )
}

export default ReviewCreate
