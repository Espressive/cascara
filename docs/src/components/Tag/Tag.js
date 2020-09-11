import styles from './Tag.module.scss';

const Tag = ({ content, ...rest }) => {
  return (
    <span {...rest} className={styles.Tag}>
      {content}
    </span>
  );
};

export default Tag;
