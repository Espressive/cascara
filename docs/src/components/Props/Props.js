import pt from 'prop-types';

const propTypes = {
  children: pt.oneOfType([pt.element(), pt.arrayOf(pt.element)]),
};

const Props = ({ children }) => <div className='Props'>{children}</div>;

Props.propTypes = propTypes;

export default Props;
