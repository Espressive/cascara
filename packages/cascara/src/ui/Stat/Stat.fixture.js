import React from 'react';

import Stat from '.';

const clickHandler = () => console.log('click!');

export default {
  basic: <Stat label='Stat' value='50' />,
  clickable: <Stat label='Stat' onClick={clickHandler} value='50' />,
  fluid: <Stat fluid label='Stat' value='50' />,
  withSub: <Stat label='Stat' sub='Component' value='50' />,
};
