import React from 'react';
import pt from 'prop-types';
import ListItem, { propTypes as listItemPropTypes } from './ListItem';
import { Composite, useCompositeState } from 'reakit/Composite';
import styles from './List.module.scss';

const propTypes = {
  data: pt.arrayOf(pt.shape(listItemPropTypes)),
};

const List = ({ data, ...rest }) => {
  const compositeState = useCompositeState();
  return (
    <Composite {...rest} className={styles._} {...compositeState} as='ul'>
      {!data ? (
        <div className='ui basic segment' style={{ minHeight: '4rem' }}>
          <div className='ui active inverted dimmer'>
            <div className='ui loader' />
          </div>
        </div>
      ) : data?.length < 1 ? (
        <div
          className='ui basic center aligned segment'
          style={{ minHeight: '10rem' }}
        >
          <em>No data.</em>
        </div>
      ) : (
        data?.map((item, i) => (
          <ListItem
            key={item.label + i}
            {...item}
            compositeState={compositeState}
          />
        ))
      )}
    </Composite>
  );
};

List.propTypes = propTypes;

export default List;
