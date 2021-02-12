const getKeyframesMap = (frames) =>
  Object.assign(
    {},
    ...frames.map((frame, i) => {
      const keyframePercent = Math.floor((i / (frames.length - 1)) * 100) + '%';

      return { [keyframePercent]: frame };
    })
  );

export { getKeyframesMap };
