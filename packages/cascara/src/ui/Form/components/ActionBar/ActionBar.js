import React from 'react';
import pt from 'prop-types';
import { Role } from 'reakit/Role';

// external prop types
import { propTypes as actionButtonPT } from '../../../../modules/ActionButton';
import { propTypes as actionEditPT } from '../../modules/ActionEdit';

import styles from '../../Form.module.scss';
import { Boundaries } from '../../../../system-components';

const propTypes = {
  actions: pt.arrayOf(
    pt.oneOfType([pt.shape(actionButtonPT), pt.shape(actionEditPT)])
  ),
};

const ActionBar = ({ actions }) => {
  return (
    <Boundaries>
      <Role className={styles.FormActionBar}>{actions}</Role>
    </Boundaries>
  );
};

ActionBar.propTypes = propTypes;

export default ActionBar;
