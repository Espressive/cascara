import React, { useRef } from 'react';
import { Button } from '../../../src';

const handleAlert = () => alert('Alerted!');

const ButtonRef = () => {
  const buttonRef = useRef(null);

  function handleRefLog() {
    console.log(buttonRef);
    alert('See console for log...');
  }

  return <Button content='Ref' onClick={handleRefLog} ref={buttonRef} />;
};

export default {
  all: (
    <Button
      content='content'
      fluid={false}
      isBrandColor={false}
      onClick={handleAlert}
      outcome='positive'
    />
  ),
  default: <Button content='Default' />,
  fluid: (
    <div>
      <Button content='Fluid' fluid />
      <button className='ui primary fluid button' type='button'>
        Hello
      </button>
    </div>
  ),
  link: (
    <Button as='a' content='Link' href='https://google.com' target='_blank' />
  ),
  negative: <Button content='Negative' outcome='negative' />,
  positive: <Button content='Positive' outcome='positive' />,
  ref: <ButtonRef />,
};
