/**
 * Sets a safe rel value based on html link properties.
 * @param {object} props - All props for the component (must include target and rel)
 * @see {@link https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/}
 */
const getSafeLinkRel = props => {
  // Always use the supplied 'rel' if it is defined.
  // Otherwise, check if a target is defined supply a safe rel value.
  return props.rel || props.target ? 'noopener noreferrer' : undefined;
};

export { getSafeLinkRel };
