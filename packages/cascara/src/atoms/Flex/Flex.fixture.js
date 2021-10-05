import React from 'react';
import Flex from './Flex';
import Button from '../Button';
import ActionStack from '../../ui/ActionStack';

const Buttons = () =>
  ['A', 'B', 'C'].map((i) => <Button content={`Button ${i}`} key={i} />);

export default {
  default: (
    <Flex>
      <Buttons />
    </Flex>
  ),
  spaceStart: (
    <Flex space='start'>
      <Buttons />
    </Flex>
  ),
  spaceStartPush: (
    <Flex space='start'>
      <Buttons />
      <Flex.Item push>
        <ActionStack actions={[{ label: 'Stuff' }, { label: 'More Stuff' }]} />
      </Flex.Item>
      <Button content='Button' />
    </Flex>
  ),
  spaceEnd: (
    <Flex space='end'>
      <Buttons />
    </Flex>
  ),
};
