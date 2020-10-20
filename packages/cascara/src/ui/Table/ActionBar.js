import React from 'react';

const ActionBar = ({ actions = [], title = '' }) => (
  <>
    {title && <span>{title}</span>}
    {actions.length && actions}
  </>
);

export default ActionBar;
