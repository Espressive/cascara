import maxSize from 'popper-max-size-modifier';

// This Popper modifier will subtract the height of the trigger from any bottom placement so that our popper will open over the trigger itself
export const popperOverTrigger = {
  name: 'offset',
  options: {
    offset: ({ placement, reference, popper }) => {
      if (['bottom', 'bottom-end', 'bottom-start'].includes(placement)) {
        return [0, -reference.height];
      } else {
        return [];
      }
    },
  },
};

// This modifier will make the popper take the same width as the trigger
export const popperSameWidth = {
  effect: ({ state }) => {
    state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
  },
  enabled: true,
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  name: 'popperSameWidth',
  phase: 'beforeWrite',
  requires: ['computeStyles'],
};

// This modifier will keep the popper to stay within the viewport
export const applyMaxSize = {
  enabled: true,
  fn({ state }) {
    const { height } = state.modifiersData.maxSize;
    state.styles.popper.maxHeight = `${height}px`;
  },
  name: 'applyMaxSize',
  phase: 'beforeWrite',
  requires: ['maxSize'],
};

export const DEFAULT_CASCARA_MODIFIERS = [
  popperOverTrigger,
  maxSize,
  applyMaxSize,
];
