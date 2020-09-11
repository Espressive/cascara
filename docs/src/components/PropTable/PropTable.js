import Tag from '../Tag';
import styles from './PropTable.module.scss';

const PropTable = ({ docData, ...rest }) => {
  const propsArray = Object.entries(docData?.props);

  return (
    <div className={styles.PropTable} {...rest}>
      <h4 className={styles.Title}>{docData.displayName}</h4>
      {propsArray.length > 0 ? (
        propsArray.map(([propName, propData]) => (
          <details className={styles.Details} key={propName}>
            <summary className={styles.Summary}>
              {propName}
              <Tag
                content={propData?.type?.name || 'MISSING TYPE'}
                style={{ float: 'right' }}
              />
              {propData?.required && (
                <Tag
                  content='required'
                  style={{ float: 'right', marginRight: '.25em' }}
                />
              )}
            </summary>
            <dl className={styles.Content}>
              <dt>Description</dt>
              <dd>
                {propData?.description || (
                  <em>ALL PROPS REQUIRE A JSDOC DESCRIPTION</em>
                )}
              </dd>
              {propData?.type?.value && (
                <>
                  <dt>Alowed Values</dt>
                  <dd>
                    {propData.type.value.map((value, i) => {
                      const item = value.name ? (
                        <span>{value.name}</span>
                      ) : (
                        <code>{value.value}</code>
                      );

                      return item;
                    })}
                  </dd>
                </>
              )}
              {propData?.defaultValue?.value && (
                <>
                  {' '}
                  <dt>Default Value</dt>
                  <dd>
                    <code>{propData?.defaultValue?.value}</code>
                  </dd>
                </>
              )}
            </dl>

            {/* 
              NOTE: Leave this here for now until we validate table display
              For more complex component types
              <pre className={styles.Content}>
                <code>{JSON.stringify(propData, null, '  ')}</code>
              </pre> 
            */}
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
