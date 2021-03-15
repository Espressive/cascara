import React, { Suspense } from 'react';
import pt from 'prop-types';
import classNames from 'classnames/bind';
import { useStructureName } from '../hooks';
import styles from './AdminStructure.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  drawer: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  header: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  main: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  nav: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const AdminStructure = ({ main, header, drawer, nav }) => {
  useStructureName('Admin');

  return (
    <>
      <header className={styles._header}>{header}</header>
      <nav className={styles._nav}>{nav}</nav>
      <main
        className={cx({
          _main: true,
          with_drawer: drawer,
        })}
      >
        <Suspense fallback={<AdminStructure.Main isLoading />}>{main}</Suspense>
      </main>
      <section className={styles._drawer}>
        <Suspense fallback={<AdminStructure.Drawer isLoading />}>
          {drawer}
        </Suspense>
      </section>
    </>
  );
};

AdminStructure.propTypes = propTypes;

export default AdminStructure;
