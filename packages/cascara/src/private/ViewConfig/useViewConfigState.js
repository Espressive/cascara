import { useState } from 'react';
import { equals, findIndex, insert, without } from 'ramda';

// Finds the index of a supplied object in a list
const getObjectIndex = (obj, list) => findIndex(equals(obj))(list);

// Removes the supplied object from the supplied list
const getCleanList = (obj, list) => without([obj], list);

// Combines both above functions to reduce boilerplate
// in move functions
const getObjIndexAndCleanList = (obj, list) => ({
  cleanList: getCleanList(obj, list),
  prevIndex: getObjectIndex(obj, list),
});

const useViewConfigState = (
  { initialSelection } = { initialSelection: [] }
) => {
  // We have a single state that is managed with helper functions
  // and we never expose the internal set function outside of this hook
  const [currentSelection, setCurrentSelection] = useState(initialSelection);

  // Adds supplied object to the bottom of the current list
  const itemAdd = (obj) => {
    setCurrentSelection([...currentSelection, obj]);
  };

  // Removes supplied object from current list
  const itemRemove = (obj) => {
    setCurrentSelection(getCleanList(obj, currentSelection));
  };

  // Moves object matching supplied object up in the list
  const moveItemDown = (obj) => {
    const { cleanList, prevIndex } = getObjIndexAndCleanList(
      obj,
      currentSelection
    );

    const newIndex = prevIndex + 1;

    setCurrentSelection(insert(newIndex, obj, cleanList));
  };

  // Moves object matching supplied object down in the list
  const moveItemUp = (obj) => {
    const { cleanList, prevIndex } = getObjIndexAndCleanList(
      obj,
      currentSelection
    );

    const newIndex = prevIndex - 1;

    setCurrentSelection(insert(newIndex, obj, cleanList));
  };

  // DO NOT EXPOSE THE INTERNAL SET STATE FUNCTION, ONLY RETURN HELPERS
  return {
    currentSelection,
    itemAdd,
    itemRemove,
    moveItemDown,
    moveItemUp,
  };
};

export default useViewConfigState;
