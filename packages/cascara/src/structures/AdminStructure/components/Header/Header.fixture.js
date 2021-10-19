import React from 'react';
import Header from './Header';

const testLogo =
  'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png';

export default {
  default: <Header />,
  titleOnly: <Header title='Company' />,
  withLogo: <Header logo={testLogo} title='Company' />,
  withPost: <Header logo={testLogo} post={'Hello'} title='Company' />,
};
