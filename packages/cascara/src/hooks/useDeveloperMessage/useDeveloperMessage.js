import { useEffect } from 'react';
import prefixDevMessage from './prefixDevMessage';

const useDeveloperMessage = (isMessageShown, message) => {
  // Wrap in useEffect so we do run this on the next render unless our dependencies have changed.
  useEffect(() => {
    // We do not want to spam the console with these messages so we only alert developers if state hook values have changed.
    if (process.env.NODE_ENV === 'development' && isMessageShown) {
      // eslint-disable-next-line no-console -- We want to alert developers of missing state hooks
      console.warn(prefixDevMessage(message));
    }
  }, [isMessageShown, message]);
};

// Not sure if this is a good idea but it does keep this function
// grouped with the hook itself and limits the number of overall
// exports from the library.
useDeveloperMessage.prefix = prefixDevMessage;

export default useDeveloperMessage;
