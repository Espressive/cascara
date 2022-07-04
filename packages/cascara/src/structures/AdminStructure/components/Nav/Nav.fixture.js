import React from 'react';
import Nav from './Nav';
import house from '@iconify-icons/ic/twotone-house';
import clock from '@iconify-icons/ic/twotone-lock-clock';
import settings from '@iconify-icons/ic/twotone-settings';
import dashboard from '@iconify-icons/ic/twotone-dashboard';
import list from '@iconify-icons/ic/list';

const sectionLinks = [
  {
    icon: house,
    label: 'Home',
    linkComponentProps: {
      href: '#',
    },
  },
  {
    icon: clock,
    label: 'Alarms Long Name To Test Our Styles With Ellipsis',
    linkComponentProps: {
      href: '#',
    },
  },
  {
    icon: settings,
    label: 'Settings',
    linkComponentProps: {
      href: '#',
    },
    post: 'post',
  },
];

const links = [
  {
    label: 'Dashboard',
    icon: dashboard,
    linkComponentProps: {
      href: '#',
    },
  },
  {
    label: 'Section A',
    links: sectionLinks,
  },
  {
    label: 'Section B',
    links: sectionLinks,
  },
  ...sectionLinks,
  {
    label: 'Section C',
    links: sectionLinks,
  },
  {
    icon: list,
    label: 'Activites',
    links: sectionLinks,
  },
];

export { links };

export default {
  default: <Nav links={links} />,
};
