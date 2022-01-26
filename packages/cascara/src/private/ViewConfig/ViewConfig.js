import React from 'react';
import Boundaries from '../../atoms/Boundaries';
import ViewConfigBase from './ViewConfigBase';
import { LOADING_TRIGGER, VIEW_CONFIG_PROP_TYPES } from './__globals';

const propTypes = VIEW_CONFIG_PROP_TYPES;

const ViewConfig = (props) => {
  const {
    options,
    // state, // This is our component's state, not the state of the Reakit component
  } = props;

  // Render the loading version of the trigger if no options are defined yet.
  return (
    <Boundaries>
      {options ? <ViewConfigBase {...props} /> : LOADING_TRIGGER}
    </Boundaries>
  );
};

ViewConfig.propTypes = propTypes;

export default ViewConfig;
