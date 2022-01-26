import React from 'react';
import pt from 'prop-types';
import { Columns, Image, Section } from '@espressive/cascara';
import styles from './Rule.module.scss';

const propTypes = {
  body: pt.string.isRequired,
  doImg: pt.string,
  dontImg: pt.string,
  title: pt.string.isRequired,
};

const Rule = ({ title, body, doImg, dontImg }) => {
  return (
    <Section className={styles._} title={title}>
      <p>{body}</p>
      <Columns count={2}>
        {dontImg && (
          <div className={styles.Dont}>
            <h6>Don&apos;t Do This</h6>
            <Image
              alt={`Incorrect usage example for: ${title}`}
              src={dontImg}
            />
          </div>
        )}
        {doImg && (
          <div className={styles.Do}>
            <h6>Do This</h6>
            <Image alt={`Correct usage example for: ${title}`} src={doImg} />
          </div>
        )}
      </Columns>
    </Section>
  );
};

Rule.propTypes = propTypes;

export default Rule;
