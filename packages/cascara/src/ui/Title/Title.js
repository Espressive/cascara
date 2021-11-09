import React from 'react';
import { Boundaries } from '../../system-components';
import { Flex } from '../../atoms';

import styles from './Title.module.scss';
import { PROP_TYPES } from './__globals';

const PageTitle = ({ titlePost, titlePre, titleSub, title }) => {
  const titleTag = title && (
    <h3 className={styles.Title}>
      {title} {titleSub && <div className={styles.Sub}>{titleSub}</div>}
    </h3>
  );

  const isOnlyTitle = (titlePre || titlePost) === undefined;
  const documentTitle = titleSub ? `${title} - ${titleSub}` : title;

  return (
    <Boundaries>
      {title && (
        <title itemProp='name' lang='en'>
          {documentTitle}
        </title>
      )}
      {isOnlyTitle ? ( // Do not render any extra markup if we do not need to.
        titleTag
      ) : (
        <Flex className={styles._} space='start'>
          {titlePre}
          {titleTag}
          {titlePost && (
            <Flex.Item push>
              <div>{titlePost}</div>
            </Flex.Item>
          )}
        </Flex>
      )}
    </Boundaries>
  );
};

PageTitle.propTypes = PROP_TYPES;

export default PageTitle;
