const platforms = {
  cordova: Boolean(Object.prototype.hasOwnProperty.call(window, 'cordova')),
  electron: Boolean(process.versions['electron']),
};

function getCurrentPlatform() {
  // If we do not match any other platform, set `web` as our platform
  let finalPlatform = 'web';

  for (const platform in platforms) {
    if (platforms[platform]) {
      // Once we match a platform we return and do not test any other platforms,
      // so the order of the `platforms` object is potentially important.
      finalPlatform = platform;
    }
  }

  return finalPlatform;
}

export const currentPlatform = getCurrentPlatform();
