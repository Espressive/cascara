import React from 'react';
import pt from 'prop-types';
import styles from './BaristaStructure.module.scss';

const propTypes = {
  detail: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  header: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  list: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  nav: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
};

const BaristaStructure = ({ detail, header, list, nav }) => {
  return (
    <>
      <header className={styles._header}>{header}</header>
      <nav className={styles._nav}>{nav}</nav>
      <main className={styles._main}>
        <section className={styles._list}>{list}</section>
        <section className={styles._detail}>{detail}</section>
      </main>
    </>
  );
};

BaristaStructure.propTypes = propTypes;

export default BaristaStructure;
