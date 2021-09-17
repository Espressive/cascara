const getAccessibleLabelSetters = (isLabeled, label) => {
  const setAriaLabel = isLabeled ? undefined : label;
  const setHtmlFor = isLabeled ? label : undefined;
  return {
    setAriaLabel,
    setHtmlFor,
  };
};

export default getAccessibleLabelSetters;
