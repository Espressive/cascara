import React, { Fragment } from 'react';

const getNodesFromMarkdown = (text) => {
  let msg = text;

  // Add line break tags for each newline
  msg = msg.split('\n').map((item, i) => (
    <Fragment key={i}>
      {item}
      <br />
    </Fragment>
  ));

  return msg;
};

export { getNodesFromMarkdown };
