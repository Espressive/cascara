import React from 'react';
import pt from 'prop-types';
// import styles from './Table.module.scss';

// external prop types
import { propTypes as actionButtonPT } from '../../modules/ActionButton';
import { propTypes as actionEditPT } from '../../modules/ActionEdit';

const propTypes = {
  actions: pt.arrayOf(
    pt.oneOfType([pt.shape(actionButtonPT), pt.shape(actionEditPT)])
  ),
  title: pt.string,
};

const ActionBar = ({ actions = [], title = '' }) => (
  <>
    {title && <span>{title}</span>}
    {actions.length && actions}
  </>
);

ActionBar.propTypes = propTypes;

export default ActionBar;
