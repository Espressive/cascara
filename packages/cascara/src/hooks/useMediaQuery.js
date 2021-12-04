// It would be good if this could just reference known media queries in design tokens

import { useEffect, useState } from 'react';

const useMediaQuery = (query, ifTrueFunc, ifFalseFunc) => {
  const isDOM = Boolean(
    typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
  );

  const mediaQuery = isDOM ? window?.matchMedia(query) : null;

  // We need to set state here so that the hook will return the new value
  const [match, setMatch] = useState(Boolean(mediaQuery?.matches));

  useEffect(() => {
    if (isDOM) {
      const handler = () => {
        setMatch(Boolean(mediaQuery?.matches));
        mediaQuery.matches ? ifTrueFunc?.() : ifFalseFunc?.();
      };

      // Setup
      mediaQuery?.addEventListener('change', handler);

      // Teardown
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      return null;
    }
  }, [mediaQuery, ifTrueFunc, ifFalseFunc, isDOM]);

  return match;
};

export default useMediaQuery;
