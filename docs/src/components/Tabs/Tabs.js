import pt from 'prop-types';

import TabsTab from './TabsTab';
import styles from './Tabs.module.scss';

const propTypes = {
  children: pt.oneOfType([pt.element(), pt.arrayOf(pt.element)]),
};

const Tabs = ({ children }) => {
  return <div className={styles.Tabs}>{children}</div>;
};

Tabs.Tab = TabsTab;
Tabs.propTypes = propTypes;

export default Tabs;
