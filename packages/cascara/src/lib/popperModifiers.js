// This Popper modifier will subtract the height of the trigger from any bottom placement so that our popper will open over the trigger itself
const popperOverTrigger = {
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

const popperSameWidth = {
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

export { popperOverTrigger, popperSameWidth };
