import pt from 'prop-types';

import Link from 'next/link';
import styles from './Tabs.module.scss';

const propTypes = {
  content: pt.string,
  isActive: pt.bool,
};

const TabsTab = ({ content, isActive, ...rest }) => {
  // We do not want the data prop on the component at all if it is not true
  const active = isActive ? true : undefined;
  return (
    <Link {...rest}>
      <a className={styles.Tab} data-active={active}>
        {content.replace(/\.[^.]+$/, '')}
      </a>
    </Link>
  );
};

TabsTab.displayName = 'Tabs.Tab';
TabsTab.propTypes = propTypes;

export default TabsTab;
