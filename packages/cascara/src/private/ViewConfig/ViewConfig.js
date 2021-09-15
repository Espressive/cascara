import pt from 'prop-types';
import React, { useCallback, useRef, useState } from 'react';
import { compose, filter, without } from 'ramda';
import { Menu, MenuButton, useMenuState } from 'reakit/Menu';
import { DEFAULT_TRIGGER, STATE_SHAPE } from './__globals';
import ViewConfigItem from './ViewConfigItem';
import styles from './ViewConfig.module.scss';
import { popperOverTrigger } from '../../lib/popperModifiers';

// const MemoViewConfigItem = memo(ViewConfigItem);

const propTypes = {
  isInitialOpen: pt.bool,
  options: pt.arrayOf(pt.object).isRequired,
  placement: pt.oneOf(['bottom-end', 'bottom-start']),
  state: STATE_SHAPE,
  title: pt.string,
  trigger: pt.node,
};

const ViewConfig = ({
  isInitialOpen = false,
  options,
  placement = 'bottom-end',
  state, // This is our component's state, not the state of the Reakit component
  title,
  trigger = DEFAULT_TRIGGER,
}) => {
  // Set a ref on our trigger to pass into the disclosure and also measure clientHeight
  const triggerRef = useRef();

  const [searchValue, setSearchValue] = useState('');

  const menuState = useMenuState({
    // This MUST be modal: true in order to render in a portal or else we
    // will have problems with any menus rendered inside of positioned
    // elements other than "relative"
    modal: true,
    placement,
    preventBodyScroll: true,
    unstable_popperModifiers: [popperOverTrigger],
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
        <ViewConfigItem
          {...option}
          {...setterFunctions}
          isActive={isSelected}
          key={option.label}
          state={menuState}
        />
      );
    });

  const handleSearchValue = useCallback((e) => {
    setSearchValue(e.target.value.trim());
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchValue('');
  }, []);

  // Do not render anything if we have not passed any options
  return options ? (
    <>
      <MenuButton {...menuState} {...trigger.props} ref={triggerRef}>
        {(disclosureProps) => React.cloneElement(trigger, disclosureProps)}
      </MenuButton>
      <Menu
        {...menuState}
        aria-label='options Menu'
        className={`ui dropdown active visible ${styles._}`}
        tabIndex={0}
      >
        <div
          className={'menu transition visible'}
          style={{ position: 'initial' }}
        >
          {title && <h4 className={styles.Title}>{title}</h4>}

          {activeOptions.length > 0 && (
            <div className={styles.ActiveItems}>
              {renderOptions(activeOptions, true)}
            </div>
          )}

          <div className='ui icon input'>
            {searchValue && (
              <i
                className='close icon'
                onClick={handleClearSearch}
                onKeyDown={handleClearSearch}
                role='button'
                style={{ cursor: 'pointer', opacity: 1, pointerEvents: 'all' }}
                tabIndex={0}
              />
            )}
            <input
              onChange={handleSearchValue}
              placeholder='Search...'
              type='search'
              value={searchValue}
            />
          </div>

          {filteredInactiveOptions.length > 0 ? (
            renderOptions(filteredInactiveOptions)
          ) : (
            <div className={styles.Info}>
              {searchValue ? <em>No results</em> : <em>All selected</em>}
            </div>
          )}
        </div>
      </Menu>
    </>
  ) : null;
};

ViewConfig.propTypes = propTypes;

export default ViewConfig;
