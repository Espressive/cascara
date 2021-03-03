const getTransformKeyframesMap = (transforms) =>
  Object.assign(
    {},
    ...transforms.map((movement, i) => {
      const keyframePercent = `${Math.floor(
        (i / (transforms.length - 1)) * 100
      )}%`;

      return { [keyframePercent]: { transform: movement } };
    })
  );

export { getTransformKeyframesMap };
