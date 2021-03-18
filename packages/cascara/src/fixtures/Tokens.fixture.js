import React from 'react';
import '@espressive/design-tokens/css';
import styles from './Tokens.module.scss';

const Fixture = () => (
  <div className={styles.Fixture}>
    <header>
      <h2>@espressive/design-tokens</h2>
    </header>
    <section style={{ backgroundColor: 'var(--color-base-red)' }}>
      <h3>In CSS or React</h3>
      <p>
        <code>import &apos;@espressive/design-tokens/css&apos;</code>
      </p>
      <p>
        This section will show up red if the <code>var(--color-base-red)</code>
        CSS variable is present. It is not being defined with a fallback color.
        This will set all of our token values as CSS variables with root level
        scopes.
      </p>
    </section>
    <section className={styles.Module}>
      <h3>In SCSS</h3>
      <p>
        <code>@use &apos;@espressive/design-tokens/scss&apos; as *;</code>
      </p>
      <p>
        This section will show up green if the <code>$color-base-green</code>{' '}
        SCSS variable is present.
      </p>
    </section>
    <section>
      <h3>Responsive</h3>
      <p className={styles.ResponsiveModule}> screen size</p>
    </section>
  </div>
);

export default Fixture;
