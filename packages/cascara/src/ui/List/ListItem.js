import React from 'react';
import pt from 'prop-types';
import styles from './List.module.scss';
import { CompositeItem } from 'reakit/Composite';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types -- Could be anything
  compositeState: pt.object,
  description: pt.string,
  label: pt.string,
  linkComponent: pt.oneOfType([
    pt.string,
    pt.shape({
      // Kind of a hack, but making sure that there is a render function
      // on the link component being passed so we know it is supposed to render
      render: pt.func,
    }),
  ]),
  // eslint-disable-next-line react/forbid-prop-types -- Could be anything
  linkComponentProps: pt.object,
  pre: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const ListItem = ({
  description,
  label,
  linkComponent = 'a',
  linkComponentProps,
  compositeState,
  pre,
}) => {
  return (
    <li className={styles.Item}>
      {/* <button type='button'>Test</button> */}
      <CompositeItem
        {...linkComponentProps}
        {...compositeState}
        as={linkComponent}
        className={styles.Link}
      >
        {pre}
        <div className={styles.Content}>
          {label && <div className={styles.Label}>{label}</div>}
          {description && (
            <div className={styles.Descripton}>{description}</div>
          )}
        </div>
      </CompositeItem>
    </li>
  );
};

ListItem.propTypes = propTypes;

export { propTypes };

export default ListItem;
