import { getTransformKeyframesMap } from './utils';

const transforms = [
  'rotate(0deg)',
  'scale(1.1)rotate(5deg)',
  'rotate(-5deg)',
  'scale(.9)rotate(0deg)',
  'rotate(-5deg)',
  'scale(1.1)rotate(5deg)',
  'rotate(0deg)',
  'scale(.9)rotate(5deg)',
  'rotate(-5deg)',
  'scale(1.1)rotate(0deg)',
  'rotate(-5deg)',
  'scale(.9)rotate(5deg)',
  'rotate(0deg)',
];

const wiggle = {
  duration: '2s',
  iterationCount: 'infinite',
  keyframe: getTransformKeyframesMap(transforms),
};

export { wiggle };
