import { useEffect } from 'react';

const useSetLayoutAttribute = (layoutName) => {
  useEffect(() => {
    // Add a data attribute to the html tag.
    document.documentElement.setAttribute('data-layout', layoutName);

    return () => {
      // Remove the data attribute from the html tag.
      document.documentElement.removeAttribute('data-layout');
    };
  }, [layoutName]);
};

export default useSetLayoutAttribute;
