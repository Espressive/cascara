import pt from 'prop-types';

import styles from './Tag.module.scss';

const propTypes = {
  content: pt.string,
};

const Tag = ({ content, ...rest }) => {
  return (
    <span {...rest} className={styles.Tag}>
      {content}
    </span>
  );
};

Tag.propTypes = propTypes;

export default Tag;
