import React from 'react';
import './Tokens.scss';

const Fixture = () => (
  <main style={{ backgroundColor: 'var(--color-base-red)' }}>
    <h2>@espressive/design-tokens</h2>
    <p>
      This section will show up red if the <code>var(--color-base-red)</code>{' '}
      CSS variable is present. It is not being defined with a fallback color.
    </p>
  </main>
);

export default Fixture;
