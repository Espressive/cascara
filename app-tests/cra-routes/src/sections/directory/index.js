import icon from '@iconify/icons-ic/twotone-supervised-user-circle';
import React from 'react';
import DirectoryDetail from './DirectoryDetail';
import DirectoryList from './DirectoryList';

const basePath = {
  icon,
  label: 'Directory',
  path: 'directory',
};

const routes = {
  detail: {
    element: <DirectoryDetail />,
    path: basePath.path,
  },
  list: {
    element: <DirectoryList />,
    label: 'Directory',
    path: basePath.path,
  },
};

export { DirectoryDetail, DirectoryList, routes, basePath };
