import Tag from '../Tag';
// import {JsonPlaceholder} from '@espressive/cascara'
import styles from './PropTable.module.scss';

const PropTable = ({ docData, ...rest }) => {
  const propsArray = docData?.props ? Object.entries(docData?.props) : [];

  // TODO: Update this to be a recursive switch that has a display style for each type. Some types will have no recursion, others will.
  // https://reactjs.org/docs/typechecking-with-proptypes.html

  return (
    <div className={styles.PropTable} {...rest}>
      <h4 className={styles.Title}>
        {docData.displayName}
        {docData.description && (
          <span className={styles.Sub}>{docData.description}</span>
        )}
      </h4>
      {/* {docData && <JsonPlaceholder data={docData} isInitialOpen title='docData' />} */}
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
                    {propData?.type?.name !== 'arrayOf' ? (
                      <pre>
                        {JSON.stringify(propData?.type?.value, null, '  ')}
                      </pre>
                    ) : (
                      /* propData.type.value.map((value, i) => {
                        const item = value.name ? (
                          <span key={i}>{value.name}</span>
                        ) : (
                          <code key={i}>{value.value}</code>
                        );

                        return item;
                      }) */
                      <pre>
                        {JSON.stringify(propData?.type?.value, null, '  ')}
                      </pre>
                    )}
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
          </details>
        ))
      ) : (
        <em
          style={{
            display: 'block',
            padding: '1em',
          }}
        >
          No <code>docData</code> provided...
        </em>
      )}
    </div>
  );
};

export default PropTable;
