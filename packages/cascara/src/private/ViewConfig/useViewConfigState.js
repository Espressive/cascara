import { useState } from 'react';
import { useInitialValue } from 'reakit-utils';
import { equals, findIndex, insert, without } from 'ramda';
import { LOCAL_STORAGE_KEY } from './__globals';

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
  // Parse our last filter state from localstorage which will be used to initialize state if it exists
  const lastFilter = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  // Make sure changes to our initial state after first render to not cause a render loop
  const initial = useInitialValue(lastFilter || initialSelection);

  // We have a single state that is managed with helper functions
  // and we never expose the internal set function outside of this hook
  const [currentSelection, setCurrentSelection] = useState(initial);

  // We will set the current selection into both state and localstorage
  const setCurrentSelectionAndStorage = (val) => {
    setCurrentSelection(val);
    if (val.length === 0) {
      // We should clean up after ourselves if someone removes everything
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } else {
      // Set the same value from state into the key
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(val));
    }
  };

  // Adds supplied object to the bottom of the current list
  const itemAdd = (obj) => {
    setCurrentSelectionAndStorage([...currentSelection, obj]);
  };

  // Removes supplied object from current list
  const itemRemove = (obj) => {
    setCurrentSelectionAndStorage(getCleanList(obj, currentSelection));
  };

  // Moves object matching supplied object up in the list
  const moveItemDown = (obj) => {
    const { cleanList, prevIndex } = getObjIndexAndCleanList(
      obj,
      currentSelection
    );

    const newIndex = prevIndex + 1;

    setCurrentSelectionAndStorage(insert(newIndex, obj, cleanList));
  };

  // Moves object matching supplied object down in the list
  const moveItemUp = (obj) => {
    const { cleanList, prevIndex } = getObjIndexAndCleanList(
      obj,
      currentSelection
    );

    const newIndex = prevIndex - 1;

    setCurrentSelectionAndStorage(insert(newIndex, obj, cleanList));
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
