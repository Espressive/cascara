import styles from './Placeholder.module.css';

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

export default Placeholder;
