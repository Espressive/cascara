import pt from 'prop-types';

// We are manually triggering prop-type checks on any object properties needed
// in this object. We could validate the whole thing in one place, but that could
// make design engineering work more difficult with no checks on the component.
const validateMessageObj = (propTypes, messageObject, displayName) => {
  pt.checkPropTypes(
    propTypes,
    messageObject,
    'Chat `message` property',
    `${displayName} [${messageObject.message.id}]`
  );
};

export { validateMessageObj };
