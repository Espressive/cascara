import React from 'react';
import pt from 'prop-types';

// external prop types
import { propTypes as actionButtonPT } from '../../../../modules/ActionButton';
import { propTypes as actionEditPT } from '../../modules/ActionEdit';

import styles from '../../Form.module.scss';
import { Boundaries } from '../../../../system-components';

import { Role } from 'reakit/Role';
import classnames from 'classnames/bind';

const propTypes = {
  actions: pt.arrayOf(
    pt.oneOfType([pt.shape(actionButtonPT), pt.shape(actionEditPT)])
  ),
  as: pt.string,
  className: pt.string,
};

const cx = classnames.bind(styles);

const ActionBar = ({ as = 'div', actions, className, ...rest }) => {
  return (
    <Boundaries>
      <Role {...rest} as={as} className={cx(className, 'FormActionBar')}>
        {actions}
      </Role>
    </Boundaries>
  );
};

ActionBar.propTypes = propTypes;

export default ActionBar;
