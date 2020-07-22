import React from 'react';
import { Button } from './Button';

const handleClick = () => alert('clicked!');

export default {
  all: (
    <Button
      content='content'
      fluid
      isBrandColor
      outcome='positive'
      onClick={() => handleClick()}
    />
  ),
  default: <Button content='Default' />,
  fluid: <Button content='Fluid' fluid />,
  positive: <Button content='Positive' outcome='positive' />,
  negative: <Button content='Negative' outcome='negative' />,
  link: (
    <Button as='a' content='Link' href='https://google.com' target='_blank' />
  )
};
