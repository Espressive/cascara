const platforms = {
  cordova: Boolean(Object.prototype.hasOwnProperty.call(window, 'cordova')),
  electron: Boolean(process.versions['electron']),
};

const getCurrentPlatform = () => {
  for (const platform in platforms) {
    if (platforms[platform]) {
      // Once we match a platform we return and do not test any other platforms,
      // so the order of the `platforms` object is potentially important.
      return platform;
    } else {
      // If we do not match any other platform, set `web` as our platform
      return 'web';
    }
  }
};

const currentPlatform = getCurrentPlatform();

export { currentPlatform };
