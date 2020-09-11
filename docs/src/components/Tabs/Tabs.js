import TabsTab from './TabsTab';
import styles from './Tabs.module.scss';

const Tabs = ({ children }) => {
  return <div className={styles.Tabs}>{children}</div>;
};

Tabs.Tab = TabsTab;

export default Tabs;
