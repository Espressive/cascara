import React from 'react';
import AreaPlaceholder from './AreaPlaceholder';

export default {
  contextExample: (
    <div style={{ padding: '1em' }}>
      <AreaPlaceholder label='Tenant Context'>
        <AreaPlaceholder label='Auth Context'>
          <h1 style={{ margin: 0 }}>App</h1>
        </AreaPlaceholder>
      </AreaPlaceholder>
    </div>
  ),
  default: (
    <AreaPlaceholder label='Label'>
      <p>Yo</p>
    </AreaPlaceholder>
  ),
};
