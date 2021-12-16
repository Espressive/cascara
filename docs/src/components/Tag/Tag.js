import pt from 'prop-types';

import styles from './Tag.module.scss';

const propTypes = {
  content: pt.string,
};

const Tag = ({ content, ...rest }) => {
  const classList = [styles.Tag, rest.className];

  return (
    <span {...rest} className={classList.join(' ')}>
      {content}
    </span>
  );
};

Tag.propTypes = propTypes;

export default Tag;
