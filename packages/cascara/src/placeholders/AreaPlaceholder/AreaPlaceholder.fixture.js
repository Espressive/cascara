import React from 'react';
import AreaPlaceholder from './AreaPlaceholder';

/* eslint-disable sort-keys */
export default {
  default: (
    <AreaPlaceholder label='Label'>
      <p>Yo</p>
    </AreaPlaceholder>
  ),
  contextExample: (
    <div style={{ padding: '1em' }}>
      <AreaPlaceholder label='Tenant Context'>
        <AreaPlaceholder label='Auth Context'>
          <h1 style={{ margin: 0 }}>App</h1>
        </AreaPlaceholder>
      </AreaPlaceholder>
    </div>
  ),
};
/* eslint-enable sort-keys */
