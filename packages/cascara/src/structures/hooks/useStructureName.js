// This hook will add a data attribute to the html document as a side
// effect. It will also remove the same attribute when the component unmounts.

import { useEffect } from 'react';

const STRUCTURE_ATTRIBUTE = 'data-structure';

// Add a classname to our document body
const addStructureName = (name) =>
  document.documentElement.setAttribute(STRUCTURE_ATTRIBUTE, name);

// Remove a classname from our document body
const removeStructureName = (name) =>
  document.documentElement.removeAttribute(STRUCTURE_ATTRIBUTE, name);

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
