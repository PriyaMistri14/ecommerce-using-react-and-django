import React from 'react'

import { Create,SimpleForm, TextInput, BooleanInput, NumberInput  } from 'react-admin'


const CouponCreate = (props) => {
  return (
   <Create title='Create a coupon' {...props}>
    <SimpleForm>
        <TextInput source='coupon_code' />
        <BooleanInput source='is_expired' />
        <NumberInput source='discount_price'/>
        <NumberInput source='minimum_amount'/>
    </SimpleForm>

   </Create>
  )
}

export default CouponCreate
