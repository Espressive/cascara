import Link from 'next/link';
import styles from './Tabs.module.scss';

const TabsTab = ({ content, isActive, ...rest }) => {
  return (
    <Link {...rest}>
      <a className={styles.Tab} data-active={isActive}>
        {content.replace(/\.[^.]+$/, '')}
      </a>
    </Link>
  );
};

TabsTab.displayName = 'Tabs.Tab';

export default TabsTab;
