import styles from './PropTable.module.scss';

const PropTable = ({ docData, ...rest }) => {
  const propsArray = Object.entries(docData?.props);

  return (
    <div className={styles.PropTable} {...rest}>
      <div className={styles.Title}>
        <h4>{docData.displayName}</h4>
        <div className={styles.Tag}>Props</div>
      </div>
      {propsArray.length > 0 ? (
        propsArray.map(([propName, propData]) => (
          <details className={styles.Details} key={propName}>
            <summary className={styles.Summary}>{propName}</summary>
            <pre className={styles.Content}>
              <code>{JSON.stringify(propData, null, '  ')}</code>
            </pre>
          </details>
        ))
      ) : (
        <em>
          No <code>docData</code> provided...
        </em>
      )}
    </div>
  );
};

export default PropTable;
