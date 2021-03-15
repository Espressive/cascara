// This hook will add a class or classname to the document body as a side
// effect. It will also remove the same class or classnames from the body
// when the component unmounts.

import { useEffect } from 'react';

// Add a classname to our document body
const addStructureName = (name) =>
  document.documentElement.setAttribute('data-structure', name);

// Remove a classname from our document body
const removeStructureName = (name) =>
  document.documentElement.removeAttribute('data-structure', name);

const useStructureName = (name) => {
  useEffect(() => {
    // Set our body class or classes if there is an array
    name instanceof Array ? name.map(addStructureName) : addStructureName(name);

    // Remove our class or classes if there is more than one
    return () => {
      name instanceof Array
        ? name.map(removeStructureName)
        : removeStructureName(name);
    };
  }, [name]);
};

export default useStructureName;
