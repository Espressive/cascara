import React from 'react';
import pt from 'prop-types';

const propTypes = {
  action: pt.string,
};

const Form = ({ action }) => {
  return <form action={action} />;
};

Form.propTypes = propTypes;
Form.displayName = 'Form';

export { propTypes };
export default Form;
