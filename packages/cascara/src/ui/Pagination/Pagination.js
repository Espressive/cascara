import React from 'react';
import pt from 'prop-types';
import classNames from 'classnames/bind';
import { noop } from 'lodash';

import { Button, Header, Popup, Select } from 'semantic-ui-react';
import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /** Can render as a different tag or component */
  as: pt.oneOfType([pt.string, pt.node]),
  children: pt.oneOfType([pt.element, pt.arrayOf(pt.element)]),
  /** current page */
  currentPage: pt.number,
  /** entity name in plural form */
  entityNamePlural: pt.string,
  /** entity name in singular form */
  entityNameSingular: pt.string,
  /** specifies if the data is currently loading */
  isLoading: pt.bool,
  /** items per page limit */
  itemsPerPageLimit: pt.number,
  /** a message to be displayed when no items to display */
  notFoundMessage: pt.string,
  /** a function to handle pagination changes */
  onPaginationChange: pt.func,
  /** the items collection length */
  recordCount: pt.number,
};

const Pagination = ({
  as: ComponentType = 'div',
  children = null,
  recordCount = 0,
  entityNamePlural = 'Total',
  entityNameSingular = 'Total',
  isLoading = false,
  itemsPerPageLimit = 10,
  notFoundMessage = 'No items to display',
  onPaginationChange = noop,
  currentPage = 1,
  ...rest
}) => {
  //
  // Handles pagination changes
  //
  // This function updates the pagination values
  // and invokes upstream logic to handle the change.
  //
  // @param {Event} _ Usually the click event
  // @param {Object} component Component object passed by SUIR
  // @param {String} component.name The name of the component
  // @param {Any} component.value The new value in the component
  function handlePaginationChange(_, component) {
    let newPage = currentPage;
    let newitemsPerPageLimit = itemsPerPageLimit;

    if (component.name === 'page') {
      newPage = component.value;
    }

    if (component.name === 'itemsPerPageLimit') {
      newitemsPerPageLimit = component.value;

      // safeguard
      if (newitemsPerPageLimit >= recordCount) {
        newPage = 1;
      }
    }

    onPaginationChange({
      limit: newitemsPerPageLimit,
      page: newPage,
    });
  }

  //
  // Handles button's click event
  //
  // This handler decides wether to increase or decrease page
  // based on button name. It acts as a proxy for `handlePaginationChange`
  //
  // @param {Event} _ Usually the click event
  // @param {Object} component Component object passed by SUIR
  // @param {String} component.name The name of the component
  function handleButtonClick(_, button) {
    let newPage = currentPage;

    if (button.name === 'forward') {
      newPage++;
    } else {
      newPage--;
    }

    handlePaginationChange(null, {
      name: 'page',
      value: newPage,
    });
  }

  const availablePages = Math.ceil(recordCount / itemsPerPageLimit) || 1;
  const canGoForward = currentPage < availablePages;
  const canGoBackward = currentPage > 1;

  const entityName = recordCount === 1 ? entityNameSingular : entityNamePlural;

  const displayRangeStart =
    itemsPerPageLimit * currentPage - itemsPerPageLimit + 1;
  const displayRangeEnd =
    currentPage === availablePages
      ? recordCount
      : displayRangeStart + itemsPerPageLimit - 1;

  const itemsPerPageLimitOptions = [10, 25, 50, 75, 100, 150, 250, 500]
    .filter((item) => item < recordCount)
    .map((item) => ({
      id: `${item}`,
      text: `${item}`,
      value: item,
    }))
    .concat([
      {
        id: 'all',
        text: 'All',
        value: recordCount < 10 ? 10 : recordCount,
      },
    ]);

  const pageOptions = Array(availablePages)
    .fill(1)
    .map((val, index) => ({
      id: `${index + val}`,
      text: `${index + val}`,
      value: index + val,
    }));

  const itemsPerPageLimitSelect = () => (
    <label className={cx({ label: true })} htmlFor={'itemsPerPageLimit'}>
      {`${entityNamePlural} per page:`}
      <Select
        className={cx({ select: true })}
        compact
        disabled={isLoading}
        name='itemsPerPageLimit'
        onChange={handlePaginationChange}
        options={itemsPerPageLimitOptions}
        selection
        value={itemsPerPageLimit}
      />
    </label>
  );

  const pageSelect = () => (
    <label className={cx({ label: true })} htmlFor={'page'}>
      {'Page '}
      <Select
        className={cx({ select: true })}
        compact
        disabled={isLoading}
        name='page'
        onChange={handlePaginationChange}
        options={pageOptions}
        selection
        value={currentPage}
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
      {recordCount ? (
        <>
          {`${recordCount} ${entityName} `}
          {!className && <br />}
          <span className={cx({ fontWeightReset: true })}>
            {`(Displaying ${displayRangeStart} - ${displayRangeEnd})`}
          </span>
        </>
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
      {recordCount ? (
        <>
          <span className={cx({ fontWeightReset: true })}>{'Displaying '}</span>
          {`${displayRangeStart} - ${displayRangeEnd}`}
          <span className={cx({ fontWeightReset: true })}>
            {` of ${recordCount}`}
          </span>
        </>
      ) : (
        <span className={cx({ fontWeightReset: true })}>{notFoundMessage}</span>
      )}
    </Header>
  );

  const pageNavigation = (className) => (
    <div className={className}>
      {itemsPerPageLimitSelect()}
      {pageSelect()}
    </div>
  );

  const mobilePageNavigation = (
    <div className={cx({ mobilePageNav: true })}>
      {itemsPerPageLimitSelect()}
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

export default Pagination;
