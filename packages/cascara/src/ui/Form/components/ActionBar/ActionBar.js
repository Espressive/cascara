import React from 'react';
import pt from 'prop-types';

// external prop types
import { propTypes as actionButtonPT } from '../../../../modules/ActionButton';
import { propTypes as actionEditPT } from '../../modules/ActionEdit';

import styles from '../../Form.module.scss';
import { Boundaries } from '../../../../system-components';

import classnames from 'classnames/bind';

const propTypes = {
  actions: pt.arrayOf(
    pt.oneOfType([pt.shape(actionButtonPT), pt.shape(actionEditPT)])
  ),
  className: pt.string,
};

const cx = classnames.bind(styles);

const ActionBar = ({ actions, className }) => {
  return (
    <Boundaries>
      <div className={cx(className, 'FormActionBar')}>{actions}</div>
    </Boundaries>
  );
};

ActionBar.propTypes = propTypes;

export default ActionBar;
