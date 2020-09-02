# customProptypes

We should be able to define custom prop-types here and use them in propType validations. It is possible this should become a package to make it easier to use.

```javascript
import pt from 'prop-types';
import cpt from '../lib/customPropTypes';

const propTypes = {
  /** This cool prop should be special */
  cool: cpt.special,
  /** This is a regular prop */
  isRegular: pt.bool,
  /** This prop has a custom prop-type and is also required */
  xtraCool: cpt.rad.isRequired,
};

MyComponent.propTypes = propTypes;
```
