import React from 'react';

import Title from '.';

const preContent = <button type='button'>Pre</button>;
const postContent = <button type='button'>Post</button>;

export default {
  renderNothing: <Title />,
  titleMarkupOnly: <Title title='Only Title Markup' />,
  withPre: <Title pre={preContent} title='With Pre' />,
  withPost: <Title post={postContent} title='With Post' />,
  withPrePost: (
    <Title post={postContent} pre={preContent} title='With Pre and Post' />
  ),
  withSub: <Title sub='Some Sub Content' title='With Sub Title' />,
};
