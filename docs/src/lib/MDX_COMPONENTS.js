/* eslint-disable react/no-multi-comp */

// All components that we intend to use in our MDX files _must_ be defined here
// or else they will not be rendered in our MDX files. This includes
// all components in Cascara. Our implementation of MDX in these docs does
// not allow imports in the MDX file itself. This is an unfortunate limitation
// until there is a better way to import static data dynamically in Nextjs

import { Admin, Button, JsonDisplay, Pagination } from '@espressive/cascara';
import { Code, Placeholder } from '../components';

const MDX_COMPONENTS = {
  Admin: (props) => <Admin {...props} />,
  Button: (props) => <Button {...props} />,
  JsonDisplay: (props) => <JsonDisplay {...props} />,
  Pagination: (props) => <Pagination {...props} />,
  Playground: (props) => <Placeholder {...props} componentName='Playground' />,
  Props: (props) => <Placeholder {...props} componentName='Props' />,
  code: (props) => <Code {...props} />,
};

export default MDX_COMPONENTS;
