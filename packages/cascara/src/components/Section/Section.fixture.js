import React from 'react';

import Section from '.';

const preContent = <button type='button'>Pre</button>;
const postContent = <button type='button'>Post</button>;
const content = <div>Content</div>;

export default {
  basic: (
    <Section
      isBasic
      title='With Pre, Post and Sub'
      titlePost={postContent}
      titlePre={preContent}
      titleSub='Some Sub Content'
    >
      {content}
    </Section>
  ),
  renderEverything: (
    <Section
      title='With Pre, Post and Sub'
      titlePost={postContent}
      titlePre={preContent}
      titleSub='Some Sub Content'
    >
      {content}
    </Section>
  ),
  renderNothing: <Section />,
  titleMarkupOnly: <Section title='Only Section Markup'>{content}</Section>,
  withPre: (
    <Section title='With Pre' titlePre={preContent}>
      {content}
    </Section>
  ),
  withPost: (
    <Section title='With Post' titlePost={postContent}>
      {content}
    </Section>
  ),
  withPrePost: (
    <Section
      title='With Pre and Post'
      titlePost={postContent}
      titlePre={preContent}
    >
      {content}
    </Section>
  ),
  withSub: (
    <Section title='With Sub Section' titleSub='Some Sub Content'>
      {content}
    </Section>
  ),
};
