import { iconClassNames } from '@fluentui/react-icons-northstar';

const getIconFillOrOutlineStyles = ({ outline }) => ({
  [`& .${iconClassNames.filled}`]: {
    display: outline ? 'none' : 'block',
  },

  [`& .${iconClassNames.outline}`]: {
    display: outline ? 'block' : 'none',
  },
});

export default getIconFillOrOutlineStyles;
