const COLOR_MODIFIER = {
  from: 'color',
  modifiers: [['darker', 0.4]],
};

const CHART_DEFAULTS = {
  animate: true,
  borderColor: COLOR_MODIFIER,
  borderWidth: 1,
  colors: 'nivo',
  defs: [
    {
      background: 'inherit',
      color: 'rgba(0,0,0,0.1)',
      id: 'dots',
      padding: 1,
      size: 4,
      stagger: true,
      type: 'patternDots',
    },
    {
      background: 'inherit',
      color: 'rgba(0,0,0,0.1)',
      id: 'lines',
      lineWidth: 6,
      rotation: -45,
      spacing: 10,
      type: 'patternLines',
    },
    {
      background: 'inherit',
      color: 'rgba(0,0,0,0.1)',
      id: 'squares',
      padding: 4,
      size: 4,
      stagger: false,
      type: 'patternSquares',
    },
  ],
  labelTextColor: COLOR_MODIFIER,
  motionDamping: 15,
  motionStiffness: 90,
};

const AXIS_CONFIG = {
  legendPosition: 'middle',
  tickPadding: 5,
  tickRotation: 0,
  tickSize: 5,
};

export { CHART_DEFAULTS, COLOR_MODIFIER, AXIS_CONFIG };
