import React from 'react';
import Tabs from './Tabs';

const panelA = {
  label: 'Panel A',
  content: (
    <>
      <h3>I am a panel</h3>
      <p>Hey there friend!</p>
    </>
  ),
};

const panelB = {
  label: 'Panel B',
  content: <p>I am a new panel.</p>,
};

const panelC = {
  label: 'Panel C',
  content: (
    <>
      <h3>A Third Panel</h3>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias
        voluptatum illum voluptatibus autem esse eaque totam hic placeat
        dignissimos nisi.
      </p>
    </>
  ),
};

const tabs = [panelA, panelB, panelC];

const Basic = (fixtureProps) => (
  <div className='ui container'>
    <h2>Basic Tabs</h2>
    <p>We can define an array of tab objects with label and content props.</p>
    <Tabs {...fixtureProps} />
  </div>
);

const Title = (fixtureProps) => (
  <div className='ui container'>
    <h2>Title</h2>
    <p>We can set a title for a set of tabs.</p>
    <Tabs {...fixtureProps} />
  </div>
);

export default {
  basic: <Basic tabs={tabs} />,
  title: <Title tabs={tabs} title='Cool Tabs' />,
};
