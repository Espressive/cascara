import React, { useContext } from 'react';
import pt from 'prop-types';
import { AdminContext } from './context';
import styles from './AdminStructure.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const AdminStructureChildren = ({ children }) => {
  const { drawer } = useContext(AdminContext);

  return (
    <>
      <main
        className={cx({
          _main: true,
          with_drawer: drawer,
        })}
      >
        {children}
      </main>
      {drawer && <section className={styles._drawer}>{drawer}</section>}
    </>
  );
};

AdminStructureChildren.propTypes = propTypes;

export default AdminStructureChildren;
