import React, { memo, useCallback, useState } from 'react';
import { compose, filter, without } from 'ramda';
import { useMenuState } from 'reakit/Menu';
import { Popover, PopoverDisclosure, usePopoverState } from 'reakit/Popover';
import { DEFAULT_TRIGGER, VIEW_CONFIG_PROP_TYPES } from './__globals';
import ViewConfigItem from './ViewConfigItem';
import styles from './ViewConfig.module.scss';
import { DEFAULT_CASCARA_MODIFIERS } from '../../lib/popperModifiers';
import { Clickable } from 'reakit/Clickable';
import pt from 'prop-types';
import { InlineIcon } from '@iconify/react';
import { eyeIcon } from '@espressive/icons';

const MemoViewConfigItem = memo(ViewConfigItem);

const propTypes = VIEW_CONFIG_PROP_TYPES;

const popoverProptypes = {
  activeOptions: pt.arrayOf([pt.shape({})]),
  filteredInactiveOptions: pt.arrayOf([pt.shape({})]),
  handleClearSearch: pt.func,
  handleSearchValue: pt.func,
  renderOptions: pt.func,
  searchValue: pt.string,
  title: pt.string,
};
const PopOverConfig = ({
  activeOptions,
  filteredInactiveOptions,
  handleClearSearch,
  handleSearchValue,
  renderOptions,
  searchValue,
  title,
}) => {
  const popover = usePopoverState({
    animated: 250,
    gutter: 0,
    placement: 'bottom-start',
  });
  return (
    <>
      <PopoverDisclosure {...popover} className='ui basic icon button'>
        <InlineIcon icon={eyeIcon} />
      </PopoverDisclosure>
      <Popover {...popover} aria-label='Welcome' className={` ${styles._}`}>
        {title && <h4 className={styles.Title}>{title}</h4>}
        {activeOptions.length > 0 && (
          <div className={styles.ActiveItems}>
            {renderOptions(activeOptions, true)}
          </div>
        )}
        <div className={`${styles.SearchInput}`}>
          <div className='ui icon input' style={{ width: '100%' }}>
            {searchValue && (
              <Clickable
                as='i'
                className='close icon'
                onClick={handleClearSearch}
                onKeyDown={handleClearSearch}
                role='button'
                style={{
                  cursor: 'pointer',
                  opacity: 1,
                  pointerEvents: 'all',
                }}
                tabIndex={0}
              />
            )}
            <input
              className={`${styles.SearchInputInput}`}
              onChange={handleSearchValue}
              placeholder='Search...'
              style={{ borderRadius: '100px' }}
              type='search'
              value={searchValue}
            />
          </div>
        </div>
        {filteredInactiveOptions.length > 0 ? (
          renderOptions(filteredInactiveOptions)
        ) : (
          <div className={styles.Info}>
            {searchValue ? <em>No results</em> : <em>All selected</em>}
          </div>
        )}
      </Popover>
    </>
  );
};
PopOverConfig.propTypes = popoverProptypes;

const ViewConfig = ({
  isInitialOpen = false,
  options,
  placement = 'bottom-end',
  state, // This is our component's state, not the state of the Reakit component
  title = 'Columns',
  trigger = DEFAULT_TRIGGER,
}) => {
  // Check if the state hook is being used. We do this check inside the
  // base component so the parent error boundary will catch.
  if (!state) {
    throw new Error('ViewConfig requires a useViewConfigState hook.');
  }

  const [searchValue, setSearchValue] = useState('');

  const menuState = useMenuState({
    // This MUST be modal: true in order to render in a portal or else we
    // will have problems with any menus rendered inside of positioned
    // elements other than "relative"
    modal: true,
    placement,
    preventBodyScroll: true,
    unstable_popperModifiers: DEFAULT_CASCARA_MODIFIERS,
    visible: isInitialOpen,
  });

  const { currentSelection: activeOptions = [] } = state;

  const hasMatch = ({ label }) =>
    searchValue
      ? // This uses a regex to do a case insensitive match
        label.match(new RegExp(searchValue, 'i'))
      : true;

  const filteredInactiveOptions = compose(
    without(activeOptions),
    filter(hasMatch)
  )(options);

  const renderOptions = (options, isSelected) =>
    options.map((option) => {
      const { currentSelection, ...setterFunctions } = state;
      return (
        <MemoViewConfigItem
          {...option}
          {...setterFunctions}
          isActive={isSelected}
          key={option.label}
          state={menuState}
        />
      );
    });

  const handleSearchValue = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchValue('');
  }, []);

  // Do not render anything if we have not passed any options
  return options ? (
    <>
      {PopOverConfig({
        activeOptions,
        filteredInactiveOptions,
        handleClearSearch,
        handleSearchValue,
        renderOptions,
        searchValue,
        title,
      })}
    </>
  ) : null;
};

ViewConfig.propTypes = propTypes;

export default ViewConfig;
