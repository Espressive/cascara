import React from 'react';
import pt from 'prop-types';
import { TabList, TabPanel, useTabState } from 'reakit';
import styles from './Main.module.scss';
import classNames from 'classnames/bind';
import Loader from '../../../../private/Loader';
import StructureMainTabs from './MainTabs';
import { Role } from 'reakit/Role';

const cx = classNames.bind(styles);

const propTypes = {
  as: pt.string,
  body: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  drawer: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  footer: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  header: pt.string,
  isLoading: pt.bool,
  links: pt.arrayOf(
    pt.shape({
      // eslint-disable-next-line react/forbid-prop-types -- SVG shows up as an object
      icon: pt.object,
      label: pt.string.isRequired,
      linkComponent: pt.shape({
        // Kind of a hack, but making sure that there is a render function
        // on the link component being passed so we know it is supposed to render
        render: pt.func,
      }),
      // eslint-disable-next-line react/forbid-prop-types -- Could be anything
      linkComponentProps: pt.object,
    })
  ),
};

const Main = ({
  as = 'div',
  children,
  header,
  body,
  footer,
  isLoading = false,
  links,
  ...rest
}) => {
  const tabs = useTabState();
  return (
    <Role {...rest} as={as} className={cx('Main', rest.className)}>
      {header && <h2 className='ui header'>{header}</h2>}
      {links && (
        <TabList
          {...tabs}
          aria-label='Section Navigation'
          className='ui tabular top attached stackable menu'
        >
          {links.map((link) => (
            <StructureMainTabs
              {...tabs}
              activeClassName={styles.ActiveLink}
              className={styles.Link}
              key={link.label}
              {...link}
            />
          ))}
        </TabList>
      )}
      {body && (
        <TabPanel
          {...rest}
          className={cx('ui segment', {
            attached: links && footer,
            'bottom attached': links && !footer,
            loading: isLoading,
            'top attached': footer && !links,
          })}
          visible
        >
          {body}

          {isLoading && <Loader />}
        </TabPanel>
      )}

      {children}

      {footer && (
        <div className='ui bottom attached secondary segment'>{footer}</div>
      )}
    </Role>
  );
};

Main.propTypes = propTypes;
Main.displayName = 'AdminStructure.Main';

export default Main;
