import React from 'react'

import { Create, ReferenceInput, SimpleForm, TextInput } from 'react-admin'


const ReviewCreate = (props) => {
  return (
    <Create title='Create a review' {...props}>
      <SimpleForm>

        <ReferenceInput source='user' reference='user' />
        <TextInput source='rating' />
        <TextInput source='discription' />
        <ReferenceInput source='product' reference='product' />

      </SimpleForm>

    </Create>
  )
}

export default ReviewCreate
