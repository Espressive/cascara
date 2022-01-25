const PALLET_COLORS = [
  '#377eb8',
  '#984ea3',
  '#a65628',
  '#f781bf',
  '#999999',
  '#e5c494',
];
const AXIS_CONFIG = {
  legendPosition: 'middle',
  tickPadding: 5,
  tickRotation: 0,
  tickSize: 5,
};

const COLOR_MODIFIER = {
  from: 'color',
  modifiers: [['darker', 1.5]],
};

const BORDER_COLOR_MODIFIER = {
  from: 'color',
  modifiers: [['darker', 0.25]],
};

const CHART_DEFAULTS = {
  animate: true,
  borderColor: BORDER_COLOR_MODIFIER,
  borderWidth: 1,
  colors: PALLET_COLORS,
  labelTextColor: COLOR_MODIFIER,
  motionDamping: 15,
  motionStiffness: 90,
};

const MARGIN_CONFIG = {
  bottom: 16,
  left: 32,
  right: 32,
  top: 16,
};

export {
  AXIS_CONFIG,
  BORDER_COLOR_MODIFIER,
  CHART_DEFAULTS,
  COLOR_MODIFIER,
  MARGIN_CONFIG,
};
