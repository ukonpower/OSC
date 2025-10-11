import React from 'react';
import { InputGroup } from '../components/composites/InputGroup';

export const Basic = () => (
  <InputGroup
    title="User Info"
    initialValues={{ name: '', age: 20, active: true }}
    onSubmit={values => alert(JSON.stringify(values))}
  />
);

export default {
  title: 'orengine/InputGroup',
  component: InputGroup,
};
