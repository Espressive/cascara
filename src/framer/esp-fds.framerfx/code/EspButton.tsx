import * as React from 'react';
import * as System from '../../../ui';
import { ControlType, PropertyControls, addPropertyControls } from 'framer';
import { withHOC } from './withHOC';

const InnerEspButton = (props) => {
  return <System.EspButton {...props} />;
};

export const EspButton = withHOC(InnerEspButton);

EspButton.defaultProps = {
  width: 150,
  height: 25,
  content: 'Test',
};

addPropertyControls(EspButton, {
  content: {
    type: ControlType.String,
    title: 'Content',
    defaultValue: ' Button',
  },
  fluid: { type: ControlType.Boolean, title: 'Fluid' },
});
