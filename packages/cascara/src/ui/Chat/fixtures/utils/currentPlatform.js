const platforms = {
  cordova: Boolean(window.hasOwnProperty('cordova')),
  electron: Boolean(process.versions['electron']),
};

const getCurrentPlatform = () => {
  let pf = 'web';

  for (const platform in platforms) {
    if (platforms[platform]) {
      // Once we match a platform we return and do not test any other platforms,
      // so the order of the `platforms` object is potentially important.
      pf = platform;
      return pf;
    }
  }

  return pf;
};

const currentPlatform = getCurrentPlatform();

export { currentPlatform };
