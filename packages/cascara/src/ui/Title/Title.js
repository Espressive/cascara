import React from 'react';
import { Role } from 'reakit';

import { Boundaries } from '../../system-components';
import { Flex } from '../../atoms';

import { DEFAULT_AS_TAG, PROP_TYPES } from './__globals';
import styles from './Title.module.scss';

const Title = ({
  title,
  titleAs = DEFAULT_AS_TAG,
  titlePost,
  titlePre,
  titleSub,
  ...rest
}) => {
  const titleTag = title && (
    <Role as={titleAs} className={styles.Title} {...rest}>
      {title} {titleSub && <div className={styles.Sub}>{titleSub}</div>}
    </Role>
  );

  const isOnlyTitle = (titlePre || titlePost) === undefined;

  return (
    <Boundaries>
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

Title.propTypes = PROP_TYPES;

export default Title;
