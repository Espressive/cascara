import React from 'react';
import Admin from './';

/* eslint-disable sort-keys */
export default {
  Admin: <Admin />,
  AdminHeader: <Admin.Header />,
  AdminNav: <Admin.Nav />,
  AdminMain: <Admin.Main />,
  AdminChildren: (
    <Admin>
      <Admin.Header />
      <Admin.Nav />
      <Admin.Main />
    </Admin>
  ),
  AdminShorthand: (
    <Admin header='Header Prop' main='Main Prop' nav='Nav Prop' />
  ),
};
/* eslint-enable sort-keys */
