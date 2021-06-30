// This hook will take a theme object and apply some CSS custom properties to the document.
// These properties will be removed when the component unmounts.

import { useEffect } from 'react';
import Color from 'color';
import colorString from 'color-string';

const STYLE_IDENTIFIER = 'theme-custom-properties';

// These functions are used to check if colors are valid strings or
// color functions and if not return null so we and define fallbacks with ||.
// Without these functions, a user could define an invalid color string and
// pass to the component. That string will cause Color() to throw an error
// for an invalid color string. It uses color-string under the hood, so we use
// it here as well to check if a string is valid before trying to process anything.
const getColor = (string) => (colorString.get(string) ? Color(string) : null);
const getAccessibleTextColor = (colorFunc) =>
  colorFunc ? (colorFunc.isLight() ? '#000' : '#FFF') : null;

// This function will process an object and convert them into a
// pretty CSS custom properties string that we will use in another function.
const customProperties = (color) => {
  const { primary, secondary } = color;
  const primaryColor = getColor(primary);
  const secondaryColor = getColor(secondary) || getColor(primary);

  // These properties will be converted to CSS custom properties format
  const properties = {
    brandColor: primaryColor,
    brandTextColor: getAccessibleTextColor(primaryColor),
    secondaryColor: secondaryColor,
    secondaryTextColor: getAccessibleTextColor(secondaryColor),
  };

  // Here we take every property, change the camel case to snake case and add
  // the custom property dash to the beginning of each key.
  // Values remain unchanged
  const convertProperties = () =>
    Object.entries(properties)
      .map(
        ([key, value]) =>
          `\t--${key.replace(
            /[A-Z]/g,
            (match) => `-${match.toLowerCase()}`
          )}: ${value}`
      )
      .join(';\n');

  return `\n:root {\n${convertProperties()};\n}\n`;
};

// This function is for creating the style tag and setting our
// custom properties inside of it. This is being done with vanilla JS
// inside the document head and outside of our React tree.
const addCustomProperties = (color) => {
  // Create a style tag
  const styleTag = document.createElement('style');
  // Add an ID identifier to it
  styleTag.setAttribute('id', STYLE_IDENTIFIER);
  styleTag.innerHTML = customProperties(color);

  document.head.appendChild(styleTag);
};

// This function is for removing the style tag that we added when
// the component using this hook mounted.
const removeCustomProperties = () =>
  document.getElementById(STYLE_IDENTIFIER).remove();

const useThemeCustomProperties = ({ color }) => {
  useEffect(() => {
    // Set our custom properties on mount or change of dependencies
    addCustomProperties(color);

    // Remove our custom properties on unmount
    return () => {
      removeCustomProperties();
    };
  }, [color]);
};

export default useThemeCustomProperties;
