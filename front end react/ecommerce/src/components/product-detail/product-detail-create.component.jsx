import React from 'react'

import { Create, ReferenceInput, SimpleForm, TextInput, SelectInput } from 'react-admin'


const ProductDetailCreate = (props) => {
  return (
    <Create title='Create a product detail' {...props}>
      <SimpleForm>
        <TextInput source='available_quantity' />
        {/* <TextInput source='available_size' /> */}
        <SelectInput source="available_size" choices={[
          { id: 'XXXS', name: 'XXXS' },
          { id: 'XXS', name: 'XXS' },
          { id: 'XS', name: 'XS' },
          { id: 'S', name: 'S' },
          { id: 'M', name: 'M' },
          { id: 'L', name: 'L' },
          { id: 'XL', name: 'XL' },
          { id: 'XXL', name: 'XXL' },
          { id: 'XXXL', name: 'XXXL' },
        ]} />

        <SelectInput source="available_color" choices={[
          { id: 'Red', name: 'Red' },
          { id: 'Black', name: 'Black' },
          { id: 'Blue', name: 'Blue' },
          { id: 'Green', name: 'Green' },
          { id: 'Pink', name: 'Pink' },
          { id: 'Orange', name: 'Orange' },
          { id: 'White', name: 'White' },
        ]} />
        {/* <TextInput source='available_color' /> */}
        <ReferenceInput source='product' reference='product' />

      </SimpleForm>

    </Create>
  )
}

export default ProductDetailCreate
