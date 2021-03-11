import React from 'react';
import pt from 'prop-types';
import Detail from './StructureDetail';
import Header from './StructureHeader';
import List from './StructureList';
import Nav from './StructureNav';

import styles from './Structure.module.scss';

const propTypes = {
  children: pt.arrayOf(
    pt.shape({
      // We only support one of the elements above as a child
      type: pt.oneOf([Detail, Header, List, Nav]),
    })
  ),
};

const inside = (child) => [List, Detail].includes(child.type);
const outside = (child) => [Nav, Header].includes(child.type);

const Structure = ({ children }) => {
  return (
    <>
      {children.filter(outside)}
      <main className={styles.Main}>{children.filter(inside)}</main>
    </>
  );
};

Structure.propTypes = propTypes;

Structure.Detail = Detail;
Structure.Header = Header;
Structure.List = List;
Structure.Nav = Nav;

// const Structure = {
//   Detail,
//   Header,
//   List,
//   Nav
// }

export default Structure;
