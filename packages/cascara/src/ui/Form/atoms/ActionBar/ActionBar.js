import React from 'react';
import pt from 'prop-types';

// external prop types
import { propTypes as actionButtonPT } from '../../../../modules/ActionButton';
import { propTypes as actionEditPT } from '../../modules/ActionEdit';

import styles from '../../Form.module.scss';
import ErrorBoundary from '../../../../shared/ErrorBoundary';

const propTypes = {
  actions: pt.arrayOf(
    pt.oneOfType([pt.shape(actionButtonPT), pt.shape(actionEditPT)])
  ),
};

const ActionBar = ({ actions }) => {
  return (
    <ErrorBoundary>
      <div className={styles.FormActionBar}>{actions}</div>
    </ErrorBoundary>
  );
};

ActionBar.propTypes = propTypes;

export default ActionBar;
