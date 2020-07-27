import React, { Fragment } from 'react';
import pt from 'prop-types';
import classNames from 'classnames/bind';
import { noop } from 'lodash';

import { Button, Select, Header, Popup } from 'semantic-ui-react';
import 'semantic-ui-css-custom';
import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /** Can render as a different tag or component */
  as: pt.oneOfType([pt.string, pt.node]),
  /** the items collection length */
  count: pt.number,
  /** entity name in plural form */
  entityNamePlural: pt.string,
  /** entity name in singular form */
  entityNameSingular: pt.string,
  /** specifies if the data is currently loading */
  isLoading: pt.bool,
  /** items per page limit */
  limit: pt.number,
  /** a message to be displayed when no items to display */
  notFoundMessage: pt.string,
  /** current page */
  page: pt.number,
};

const Pagination = ({
  as: ComponentType = 'div',
  children = null,
  count = 0,
  entityNamePlural = 'Total',
  entityNameSingular = 'Total',
  isLoading = false,
  limit = 10,
  notFoundMessage = 'No items to display',
  onPaginationChange = noop,
  page = 1,
  ...rest
}) => {
  /**
   * Handles pagination changes
   *
   * This function updates the pagination values
   * and invokes upstream logic to handle the change.
   *
   * @param {Event} _ Usually the click event
   * @param {Object} component Component object passed by SUIR
   * @param {String} component.name The name of the component
   * @param {Any} component.value The new value in the component */
  const handlePaginationChange = (_, component) => {
    let newPage = page;
    let newlimit = limit;

    if (component.name === 'page') {
      newPage = component.value;
    }

    if (component.name === 'limit') {
      newlimit = component.value;

      // safeguard
      if (newlimit >= count) {
        newPage = 1;
      }
    }

    onPaginationChange({
      page: newPage,
      limit: newlimit,
    });
  };

  /**
   * Handles button's click event
   *
   * This handler decides wether to increase or decrease page
   * based on button name. It acts as a proxy for `handlePaginationChange`
   *
   * @param {Event} _ Usually the click event
   * @param {Object} component Component object passed by SUIR
   * @param {String} component.name The name of the component */
  const handleButtonClick = (_, button) => {
    let newPage = page;

    if (button.name === 'forward') {
      newPage++;
    } else {
      newPage--;
    }

    handlePaginationChange(null, {
      name: 'page',
      value: newPage,
    });
  };

  const availablePages = Math.ceil(count / limit) || 1;
  const canGoForward = page < availablePages;
  const canGoBackward = page > 1;

  const entityName = count === 1 ? entityNameSingular : entityNamePlural;

  const displayRangeStart = limit * page - limit + 1;
  const displayRangeEnd =
    page === availablePages ? count : displayRangeStart + limit - 1;

  const limitOptions = [10, 25, 50, 75, 100, 150, 250, 500]
    .filter((item) => item < count)
    .map((item) => ({
      id: `${item}`,
      text: `${item}`,
      value: item,
    }))
    .concat([
      {
        id: 'all',
        text: 'All',
        value: count < 10 ? 10 : count,
      },
    ]);

  const pageOptions = Array(availablePages)
    .fill(1)
    .map((val, index) => ({
      id: `${index + val}`,
      text: `${index + val}`,
      value: index + val,
    }));

  const limitSelect = () => (
    <label className={cx({ label: true })}>
      {`${entityNamePlural} per page:`}
      <Select
        className={cx({ select: true })}
        compact
        disabled={isLoading}
        name='limit'
        onChange={handlePaginationChange}
        options={limitOptions}
        selection
        value={limit}
      />
    </label>
  );

  const pageSelect = () => (
    <label className={cx({ label: true })}>
      {'Page '}
      <Select
        className={cx({ select: true })}
        compact
        disabled={isLoading}
        name='page'
        onChange={handlePaginationChange}
        options={pageOptions}
        selection
        value={page}
      />
      {` of ${availablePages} `}
    </label>
  );

  const backButton = (className) => (
    <Button
      basic
      className={className}
      disabled={isLoading || !canGoBackward}
      icon='chevron left'
      name={'backward'}
      onClick={handleButtonClick}
    />
  );

  const forwardButton = (className) => (
    <Button
      basic
      className={className}
      disabled={isLoading || !canGoForward}
      icon='chevron right'
      name={'forward'}
      onClick={handleButtonClick}
    />
  );

  const header = (className) => (
    <Header
      className={cx({
        [className]: true,
        fontWeightReset: true,
      })}
      sub
    >
      {count ? (
        <Fragment>
          {`${count} ${entityName} `}
          {!className && <br />}
          <span className={cx({ fontWeightReset: true })}>
            {`(Displaying ${displayRangeStart} - ${displayRangeEnd})`}
          </span>
        </Fragment>
      ) : (
        <span className={cx({ fontWeightReset: true })}>{notFoundMessage}</span>
      )}
    </Header>
  );

  const footer = (className) => (
    <Header
      className={cx({
        [className]: true,
        textTransformReset: true,
      })}
      sub
    >
      {count ? (
        <Fragment>
          <span className={cx({ fontWeightReset: true })}>{'Displaying '}</span>
          {`${displayRangeStart} - ${displayRangeEnd}`}
          <span className={cx({ fontWeightReset: true })}>
            {` of ${count}`}
          </span>
        </Fragment>
      ) : (
        <span className={cx({ fontWeightReset: true })}>{notFoundMessage}</span>
      )}
    </Header>
  );

  const pageNavigation = (className) => (
    <div className={className}>
      {limitSelect()}
      {pageSelect()}
    </div>
  );

  const mobilePageNavigation = (
    <div className={cx({ mobilePageNav: true })}>
      {limitSelect()}
      <br />
      {pageSelect()}
    </div>
  );

  const mobileHeader = (
    <div className={cx({ mobileHeader: true })}>
      <Popup
        content={mobilePageNavigation}
        hoverable
        on='click'
        position='bottom center'
        trigger={header()}
      />
    </div>
  );

  const mobileFooter = (
    <div className={cx({ mobileFooter: true })}>
      <Popup
        content={mobilePageNavigation}
        hoverable
        on='click'
        position='top center'
        trigger={footer()}
      />
    </div>
  );

  return (
    <ComponentType className={cx({ _: true })} {...rest}>
      {header(cx({ headerTotals: true }))}
      {pageNavigation(cx({ headerNav: true }))}
      {backButton(cx({ headerBackButton: true }))}
      {forwardButton(cx({ headerFrwdButton: true }))}
      {children && <div className={cx({ content: true })}>{children}</div>}
      {footer(cx({ footerTotals: true }))}
      {pageNavigation(cx({ footerNav: true }))}
      {backButton(cx({ footerBackButton: true }))}
      {forwardButton(cx({ footerFrwdButton: true }))}

      {mobileHeader}
      {mobileFooter}
    </ComponentType>
  );
};

Pagination.propTypes = propTypes;

export { Pagination };
