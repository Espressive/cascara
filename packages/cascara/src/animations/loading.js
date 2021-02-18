import { getKeyframesMap } from './utils';

const frames = [{ opacity: 1 }, { opacity: 0.5 }, { opacity: 1 }];

const loading = {
  duration: '1.5s',
  iterationCount: 'infinite',
  keyframe: getKeyframesMap(frames),
};

export { loading };
