import React, { useRef } from 'react';
import { Button } from './Button';

const handleAlert = () => alert('Alerted!');

const ButtonRef = () => {
  const buttonRef = useRef(null);

  const handleRefLog = () => {
    console.log(buttonRef);
    alert('See console for log...');
  };

  return (
    <Button ref={buttonRef} content='Ref' onClick={() => handleRefLog()} />
  );
};

export default {
  all: (
    <Button
      content='content'
      fluid={false}
      isBrandColor={false}
      outcome='positive'
      onClick={() => handleAlert()}
    />
  ),
  default: <Button content='Default' />,
  fluid: <Button content='Fluid' fluid />,
  positive: <Button content='Positive' outcome='positive' />,
  negative: <Button content='Negative' outcome='negative' />,
  link: (
    <Button as='a' content='Link' href='https://google.com' target='_blank' />
  ),
  ref: <ButtonRef />
};
