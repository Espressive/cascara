import React from 'react';
import pt from 'prop-types';

// external prop types
import { propTypes as actionButtonPT } from '../../../../modules/ActionButton';
import { propTypes as actionEditPT } from '../../modules/ActionEdit';

import styles from '../../Form.module.scss';
import Boundaries from '../../../../atoms/Boundaries';

const propTypes = {
  actions: pt.arrayOf(
    pt.oneOfType([pt.shape(actionButtonPT), pt.shape(actionEditPT)])
  ),
};

const ActionBar = ({ actions }) => {
  return (
    <Boundaries>
      <div className={styles.FormActionBar}>{actions}</div>
    </Boundaries>
  );
};

ActionBar.propTypes = propTypes;

export default ActionBar;
