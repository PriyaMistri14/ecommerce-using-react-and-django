import React from 'react'


import { Edit, SelectInput, SimpleForm , TextInput } from 'react-admin'



const ProductDetailEdit = (props) => {
  return (
    <Edit title='Edit a category' {...props} >
        <SimpleForm>
            <TextInput disabled source='id' />
            <TextInput source='available_quantity' />
            {/* <TextInput source='available_size' /> */}
            {/* <TextInput source='available_color' />           */}
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
            
        </SimpleForm>

    </Edit>
  )
}

export default ProductDetailEdit
