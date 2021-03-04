import pt from 'prop-types';

const propTypes = {
  children: pt.oneOfType([pt.element, pt.arrayOf(pt.element)]),
};

const Playground = ({ children }) => (
  <div className='Playground'>{children}</div>
);

Playground.propTypes = propTypes;

export default Playground;
