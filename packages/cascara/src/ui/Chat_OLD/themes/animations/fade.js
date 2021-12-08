import { linear } from './timingFunctions';
import {
  fast,
  faster,
  normal,
  slow,
  slower,
  ultraFast,
  ultraSlow,
} from './durations';

export const fadeInOutAnimations = {
  // Fade Ins

  // Basic Fade In Animation -- Fast
  fadeEnterFast: {
    duration: fast,
    fillMode: 'forwards',
    keyframe: ({ delta }) => ({
      '0%': { opacity: delta },
      '100%': { opacity: 1 },
    }),
    keyframeParams: { delta: 0 },
    timingFunction: linear,
  },

  // Basic Fade In Animation -- Faster
  fadeEnterFaster: {
    duration: faster,
    fillMode: 'forwards',
    keyframe: ({ delta }) => ({
      '0%': { opacity: delta },
      '100%': { opacity: 1 },
    }),
    keyframeParams: { delta: 0 },
    timingFunction: linear,
  },

  // Basic Fade In Animation --Normal
  fadeEnterNormal: {
    duration: normal,
    fillMode: 'forwards',
    keyframe: ({ delta }) => ({
      '0%': { opacity: delta },
      '100%': { opacity: 1 },
    }),
    keyframeParams: { delta: 0 },
    timingFunction: linear,
  },

  // Basic Fade In Animation --Slow
  fadeEnterSlow: {
    duration: slow,
    fillMode: 'forwards',
    keyframe: ({ delta }) => ({
      '0%': { opacity: delta },
      '100%': { opacity: 1 },
    }),
    keyframeParams: { delta: 0 },
    timingFunction: linear,
  },

  // Basic Fade In Animation --Slow
  fadeEnterSlower: {
    duration: slower,
    fillMode: 'forwards',
    keyframe: ({ delta }) => ({
      '0%': { opacity: delta },
      '100%': { opacity: 1 },
    }),
    keyframeParams: { delta: 0 },
    timingFunction: linear,
  },

  // Basic Fade In Animation -- Ultra Fast
  fadeEnterUltraFast: {
    duration: ultraFast,
    fillMode: 'forwards',
    keyframe: ({ delta }) => ({
      '0%': { opacity: delta },
      '100%': { opacity: 1 },
    }),
    keyframeParams: { delta: 0 },
    timingFunction: linear,
  },

  // Basic Fade In Animation --UltraSlow
  fadeEnterUltraSlow: {
    duration: ultraSlow,
    fillMode: 'forwards',
    keyframe: ({ delta }) => ({
      '0%': { opacity: delta },
      '100%': { opacity: 1 },
    }),
    keyframeParams: { delta: 0 },
    timingFunction: linear,
  },

  // Basic Fade Out Animation --Fast
  fadeExitFast: {
    duration: fast,
    fillMode: 'forwards',
    keyframe: ({ delta }) => ({
      '0%': { opacity: 1 },
      '100%': { opacity: delta },
    }),
    keyframeParams: { delta: 0 },
    timingFunction: linear,
  },

  // Basic Fade Out Animation --Faster
  fadeExitFaster: {
    duration: faster,
    fillMode: 'forwards',
    keyframe: ({ delta }) => ({
      '0%': { opacity: 1 },
      '100%': { opacity: delta },
    }),
    keyframeParams: { delta: 0 },
    timingFunction: linear,
  },

  // Basic Fade Out Animation --Normal
  fadeExitNormal: {
    duration: normal,
    fillMode: 'forwards',
    keyframe: ({ delta }) => ({
      '0%': { opacity: 1 },
      '100%': { opacity: delta },
    }),
    keyframeParams: { delta: 0 },
    timingFunction: linear,
  },

  // Basic Fade Out Animation --Slow
  fadeExitSlow: {
    duration: slow,
    fillMode: 'forwards',
    keyframe: ({ delta }) => ({
      '0%': { opacity: 1 },
      '100%': { opacity: delta },
    }),
    keyframeParams: { delta: 0 },
    timingFunction: linear,
  },

  // Basic Fade Out Animation --Slower
  fadeExitSlower: {
    duration: slower,
    fillMode: 'forwards',
    keyframe: ({ delta }) => ({
      '0%': { opacity: 1 },
      '100%': { opacity: delta },
    }),
    keyframeParams: { delta: 0 },
    timingFunction: linear,
  },

  // Basic Fade Out Animation --UltraFast
  fadeExitUltraFast: {
    duration: ultraFast,
    fillMode: 'forwards',
    keyframe: ({ delta }) => ({
      '0%': { opacity: 1 },
      '100%': { opacity: delta },
    }),
    keyframeParams: { delta: 0 },
    timingFunction: linear,
  },

  // Basic Fade Out Animation --UltraSlow
  fadeExitUltraSlow: {
    duration: ultraSlow,
    fillMode: 'forwards',
    keyframe: ({ delta }) => ({
      '0%': { opacity: 1 },
      '100%': { opacity: delta },
    }),
    keyframeParams: { delta: 0 },
    timingFunction: linear,
  },
};
