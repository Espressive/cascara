import React from 'react';
import { Button, Input } from 'reakit';
import Popover from '../Popover';
import Section from './Section';

const sectionHeader = (
  <div className='ui fluid icon input'>
    <Input style={{ borderRadius: '2em' }} type='text' />
    <i aria-hidden='true' className='search icon' />
  </div>
);

const equalFlex = {
  flex: 1,
};
const sectionFooter = (
  <div style={{ display: 'flex' }}>
    <Button className='ui basic button' style={equalFlex}>
      Cancel
    </Button>
    <Button className='ui positive button' style={equalFlex}>
      Save
    </Button>
  </div>
);

const drySection = (
  <Section footer={sectionFooter} header={sectionHeader}>
    <p>Paragraph</p>
    <p>Paragraph</p>
    <p>Paragraph</p>
    <p>Paragraph</p>
    <p>Paragraph</p>
    <p>Paragraph</p>
    <p>Paragraph</p>
    <p>Paragraph</p>
    <p>Paragraph</p>
  </Section>
);

const trigger = (
  <button className='ui basic button' type='button'>
    Hello
  </button>
);

const Fixture = () => (
  <main className='ui container'>
    {drySection}
    <Popover trigger={trigger}>{drySection}</Popover>
  </main>
);

export default Fixture;
