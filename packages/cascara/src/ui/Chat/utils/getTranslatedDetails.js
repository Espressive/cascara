import React from 'react';
import { TranslationIcon } from '@fluentui/react-icons-northstar';

const translatedDetails = (
  <>
    Translated <TranslationIcon size='small' />
  </>
);

const getTranslatedDetails = (isTranslated) =>
  isTranslated ? translatedDetails : null;

export { getTranslatedDetails };
