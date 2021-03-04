import pt from 'prop-types';

import styles from './Placeholder.module.css';

const propTypes = {
  children: pt.oneOfType([pt.element, pt.arrayOf(pt.element)]),
  componentName: pt.string,
};

const Placeholder = ({ children, componentName, ...rest }) => {
  const restEntries = Object.entries(rest);

  return (
    <div className={styles.Placeholder} title={componentName}>
      <pre style={{ fontSize: '.75em' }}>
        <code>
          {restEntries.length > 0 &&
            restEntries.map((entry, i) => (
              <span key={i}>{entry.toString()}</span>
            ))}
        </code>
      </pre>

      {children}
    </div>
  );
};

Placeholder.propTypes = propTypes;

export default Placeholder;
