import React, { forwardRef, useEffect, useState, useCallback, Suspense, createContext, useContext } from 'react';
import maxSize from 'popper-max-size-modifier';
import _extends from '@babel/runtime/helpers/esm/extends';
import pt$1 from 'prop-types';
import { teamsDarkTheme, teamsHighContrastTheme, teamsTheme, attachmentActionClassName, loaderSlotClassNames, chatMessageSlotClassNames, dropdownSlotClassNames, dropdownSelectedItemSlotClassNames, dropdownItemSlotClassNames, radioGroupItemSlotClassNames, Provider, Flex, Dropdown } from '@fluentui/react-northstar';
import { mergeComponentStyles, createTheme } from '@fluentui/styles';
import { iconClassNames, svgIconClassName } from '@fluentui/react-icons-northstar';
import { isNil, pathOr } from 'ramda';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import classNames$1 from 'classnames/bind';
import { Button as Button$1 } from 'reakit';
import { InlineIcon } from '@iconify/react';
import { pencilIcon, closeIcon, checkIcon } from '@espressive/icons';
import { Input } from 'reakit/Input';
import { useCheckboxState, Checkbox } from 'reakit/Checkbox';
import TextareaAutosize from 'react-textarea-autosize';
import { useRadioState, RadioGroup, Radio } from 'reakit/Radio';
import { ErrorBoundary } from 'react-error-boundary';
import { isValidElementType } from 'react-is';
import classNames from 'classnames';
import pt from '@espressive/prop-types';

/**
 * Sets a safe rel value based on html link properties.
 * @param {object} props - All props for the component (must include target and rel)
 * @see {@link https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/}
 */
var getSafeLinkRel = function getSafeLinkRel(props) {
  // Always use the supplied 'rel' if it is defined.
  // Otherwise, check if a target is defined supply a safe rel value.
  return props.rel || props.target ? 'noopener noreferrer' : undefined;
};

var _excluded$n = ["as", "content", "fluid", "icon", "isBrandColor", "outcome", "size"];

var cx$1 = classNames;
var propTypes$s = {
  /** Can render as a different tag or component */
  as: pt.oneOfType([pt.string, pt.elementType]),

  /** Main content of the button */
  content: pt.string,

  /** Makes the button take the width of the parent container */
  fluid: pt.bool,
  // An SVG Object, which will override the content
  icon: pt.shape({}),

  /** Sets the color type of the button to follow the theme brand color */
  isBrandColor: pt.bool,

  /** Indicates the outcome of clicking the button ('positive', 'negative') */
  outcome: pt.oneOf(['positive', 'negative']),

  /** A button can have multiple sizes */
  size: pt.oneOf(['small', 'regular', 'large'])
}; // We are going to need a utility to help us dealing with refs. When a composable `as`
// prop is being used with a React component, we need to pass the ref directly to
// Reakit. Otherwise, we need to use React.forwardRef()

var Button = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      as = _ref$as === void 0 ? 'button' : _ref$as,
      _ref$content = _ref.content,
      content = _ref$content === void 0 ? 'Default Content' : _ref$content,
      _ref$fluid = _ref.fluid,
      fluid = _ref$fluid === void 0 ? false : _ref$fluid,
      icon = _ref.icon;
      _ref.isBrandColor;
      var outcome = _ref.outcome,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'regular' : _ref$size,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$n);

  // Leaving this here for when we decide to run our own styles
  // const internalClassName = cx(rest.className, {
  //   _: true,
  //   basic: !outcome,
  //   fluid: fluid,
  //   large: size === 'large',
  //   negative: outcome === 'negative',
  //   positive: outcome === 'positive',
  //   small: size === 'small',
  // });
  var legacyClassname = cx$1(rest.className, {
    basic: !outcome,
    fluid: fluid,
    icon: icon,
    large: size === 'large',
    negative: outcome === 'negative',
    positive: outcome === 'positive',
    small: size === 'small',
    'ui button': true
  }); // FDS-137: use action name for button name if no content is specified

  var buttonText = content || rest.name;
  return /*#__PURE__*/React.createElement(Button$1, _extends({}, rest, {
    as: as,
    className: legacyClassname,
    ref: ref,
    rel: getSafeLinkRel(rest)
  }), icon ? /*#__PURE__*/React.createElement(InlineIcon, {
    icon: icon
  }) : buttonText);
});
Button.propTypes = propTypes$s;

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

// This function is for prefixing all developer messsages. We are exporting it
// so it can also be used in testing.
var prefixDevMessage = function prefixDevMessage(msg) {
  return "[Cascara] " + msg;
};

var useDeveloperMessage = function useDeveloperMessage(isMessageShown, message) {
  // Wrap in useEffect so we do run this on the next render unless our dependencies have changed.
  useEffect(function () {
    // We do not want to spam the console with these messages so we only alert developers if state hook values have changed.
    if (process.env.NODE_ENV === 'development' && isMessageShown) {
      // eslint-disable-next-line no-console -- We want to alert developers of missing state hooks
      console.warn(prefixDevMessage(message));
    }
  }, [isMessageShown, message]);
}; // Not sure if this is a good idea but it does keep this function
// grouped with the hook itself and limits the number of overall
// exports from the library.


useDeveloperMessage.prefix = prefixDevMessage;

var isDOM = Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);

// It would be good if this could just reference known media queries in design tokens

var useMediaQuery = function useMediaQuery(query, ifTrueFunc, ifFalseFunc) {
  var _window;

  var mediaQuery = isDOM ? (_window = window) === null || _window === void 0 ? void 0 : _window.matchMedia(query) : null; // We need to set state here so that the hook will return the new value

  var _useState = useState(Boolean(mediaQuery === null || mediaQuery === void 0 ? void 0 : mediaQuery.matches)),
      match = _useState[0],
      setMatch = _useState[1];

  useEffect(function () {
    if (isDOM) {
      var handler = function handler() {
        setMatch(Boolean(mediaQuery === null || mediaQuery === void 0 ? void 0 : mediaQuery.matches));
        mediaQuery.matches ? ifTrueFunc === null || ifTrueFunc === void 0 ? void 0 : ifTrueFunc() : ifFalseFunc === null || ifFalseFunc === void 0 ? void 0 : ifFalseFunc();
      }; // Setup


      mediaQuery === null || mediaQuery === void 0 ? void 0 : mediaQuery.addEventListener('change', handler); // Teardown

      return function () {
        return mediaQuery.removeEventListener('change', handler);
      };
    } else {
      return null;
    }
  }, [mediaQuery, ifTrueFunc, ifFalseFunc]);
  return match;
};

var useToggle = function useToggle(defaultValue) {
  if (defaultValue === void 0) {
    defaultValue = false;
  }

  var _useState = useState(defaultValue),
      value = _useState[0],
      setValue = _useState[1];

  var toggle = useCallback(function () {
    setValue(function (v) {
      return !v;
    });
  }, []);
  return [value, toggle];
};

var propTypes$r = {
  // eslint-disable-next-line react/forbid-prop-types -- error objects
  error: pt$1.object,
  resetErrorBoundary: pt$1.func
};

var ErrorFallback = function ErrorFallback(_ref) {
  var error = _ref.error,
      resetErrorBoundary = _ref.resetErrorBoundary;
  var showError = process.env.NODE_ENV === 'development';
  var handleTryAgain = useCallback(function () {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    }
  }, [resetErrorBoundary]);
  return /*#__PURE__*/React.createElement("div", {
    className: "ui tiny error message",
    role: "alert"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header"
  }, "Something went wrong:"), showError && /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("pre", null, error === null || error === void 0 ? void 0 : error.message)), /*#__PURE__*/React.createElement(Button, {
    onClick: handleTryAgain,
    outcome: "negative",
    type: "button"
  }, "Try again"));
};

ErrorFallback.propTypes = propTypes$r;

var css_248z$3 = ".☕️_SuspenseFallback____1osnh{align-items:center;display:flex;height:100%;justify-content:center;padding:1em}.☕️_SuspenseFallback_Ripple__1osnh{display:inline-block;position:relative;width:64px;height:64px}.☕️_SuspenseFallback_Ripple__1osnh div{position:absolute;border:4px solid #000;opacity:1;border-radius:50%;animation:☕️_SuspenseFallback_Ripple__1osnh 1s cubic-bezier(0,.2,.8,1) infinite}.☕️_SuspenseFallback_Ripple__1osnh div:nth-child(2){animation-delay:-.5s}@keyframes ☕️_SuspenseFallback_Ripple__1osnh{0%{top:28px;left:28px;width:0;height:0;opacity:1}to{top:-1px;left:-1px;width:58px;height:58px;opacity:0}}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN1c3BlbnNlRmFsbGJhY2subW9kdWxlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOEJBQ0Usa0JBQW1CLENBQ25CLFlBQWEsQ0FDYixXQUFZLENBQ1osc0JBQXVCLENBQ3ZCLFdBQ0YsQ0FFQSxtQ0FDRSxvQkFBcUIsQ0FDckIsaUJBQWtCLENBQ2xCLFVBQVcsQ0FDWCxXQUNGLENBRUEsdUNBQ0UsaUJBQWtCLENBQ2xCLHFCQUFzQixDQUN0QixTQUFVLENBQ1YsaUJBQWtCLENBQ2xCLCtFQUNGLENBRUEsb0RBQ0Usb0JBQ0YsQ0FFQSw2Q0FDRSxHQUNFLFFBQVMsQ0FDVCxTQUFVLENBQ1YsT0FBUSxDQUNSLFFBQVMsQ0FDVCxTQUNGLENBQ0EsR0FDRSxRQUFTLENBQ1QsU0FBVSxDQUNWLFVBQVcsQ0FDWCxXQUFZLENBQ1osU0FDRixDQUNGIiwiZmlsZSI6IlN1c3BlbnNlRmFsbGJhY2subW9kdWxlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuXyB7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogMTAwJTtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHBhZGRpbmc6IDFlbTtcbn1cblxuLlJpcHBsZSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogNjRweDtcbiAgaGVpZ2h0OiA2NHB4O1xufVxuXG4uUmlwcGxlIGRpdiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm9yZGVyOiA0cHggc29saWQgIzAwMDtcbiAgb3BhY2l0eTogMTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBhbmltYXRpb246IFJpcHBsZSAxcyBjdWJpYy1iZXppZXIoMCwgMC4yLCAwLjgsIDEpIGluZmluaXRlO1xufVxuXG4uUmlwcGxlIGRpdjpudGgtY2hpbGQoMikge1xuICBhbmltYXRpb24tZGVsYXk6IC0wLjVzO1xufVxuXG5Aa2V5ZnJhbWVzIFJpcHBsZSB7XG4gIDAlIHtcbiAgICB0b3A6IDI4cHg7XG4gICAgbGVmdDogMjhweDtcbiAgICB3aWR0aDogMDtcbiAgICBoZWlnaHQ6IDA7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuICAxMDAlIHtcbiAgICB0b3A6IC0xcHg7XG4gICAgbGVmdDogLTFweDtcbiAgICB3aWR0aDogNThweDtcbiAgICBoZWlnaHQ6IDU4cHg7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxufSJdfQ== */";
var styles$3 = {"_":"☕️_SuspenseFallback____1osnh","Ripple":"☕️_SuspenseFallback_Ripple__1osnh"};
styleInject(css_248z$3);

var SuspenseFallback = function SuspenseFallback() {
  return /*#__PURE__*/React.createElement("div", {
    className: styles$3._
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$3.Ripple
  }, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null)));
};

var isReactComponent = function isReactComponent(props, propName, componentName) {
  if (props[propName] && !isValidElementType(props[propName])) {
    return new Error("Invalid prop '" + propName + "' supplied to '" + componentName + "': the prop is not a valid React component");
  } else {
    return null;
  }
};

var propTypes$q = {
  ErrorComponent: isReactComponent,
  SuspenseComponent: isReactComponent,
  children: pt$1.oneOfType([pt$1.arrayOf(pt$1.node), pt$1.node])
};

var Boundaries = function Boundaries(_ref) {
  var _ref$ErrorComponent = _ref.ErrorComponent,
      ErrorComponent = _ref$ErrorComponent === void 0 ? ErrorFallback : _ref$ErrorComponent,
      _ref$SuspenseComponen = _ref.SuspenseComponent,
      SuspenseComponent = _ref$SuspenseComponen === void 0 ? SuspenseFallback : _ref$SuspenseComponen,
      children = _ref.children;

  // Currently ReactDOMServer does not support Suspense, but we are using it here.
  // This is a temporary check to make sure that we check to see if we are in a browser,
  // and if we are, then we are safe to render the boundaries. If we are not, we are on
  // a server (like Vercel) we an render nothing because the app will render as normal.
  // once it loads in the client browser and the app hydrates.
  if (isDOM) {
    return /*#__PURE__*/React.createElement(Suspense, {
      fallback: /*#__PURE__*/React.createElement(SuspenseComponent, null)
    }, /*#__PURE__*/React.createElement(ErrorBoundary, {
      FallbackComponent: ErrorComponent
    }, children));
  } else {
    return null;
  }
};

Boundaries.propTypes = propTypes$q;

var css_248z$2 = "@keyframes ☕️_Loader_loader-ping__1abbb{0%{top:36px;left:36px;width:0;height:0;opacity:1}to{top:0;left:0;width:72px;height:72px;opacity:0}}.☕️_Loader____1abbb{display:inline-block;position:relative;width:80px;height:80px}.☕️_Loader____1abbb>div{position:absolute;border:4px solid rgba(0,0,0,.5);opacity:1;border-radius:50%;animation:☕️_Loader_loader-ping__1abbb 1s cubic-bezier(0,.2,.8,1) infinite}.☕️_Loader____1abbb>div:nth-child(2){animation-delay:-.5s}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvYWRlci5tb2R1bGUuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx3Q0FDRSxHQUNFLFFBQVMsQ0FDVCxTQUFVLENBQ1YsT0FBUSxDQUNSLFFBQVMsQ0FDVCxTQUNGLENBQ0EsR0FDRSxLQUFRLENBQ1IsTUFBUyxDQUNULFVBQVcsQ0FDWCxXQUFZLENBQ1osU0FDRixDQUNGLENBQ0Esb0JBQ0Usb0JBQXFCLENBQ3JCLGlCQUFrQixDQUNsQixVQUFXLENBQ1gsV0FDRixDQUNBLHdCQUNFLGlCQUFrQixDQUNsQiwrQkFBb0MsQ0FDcEMsU0FBVSxDQUNWLGlCQUFrQixDQUNsQiwwRUFDRixDQUNBLHFDQUNFLG9CQUNGIiwiZmlsZSI6IkxvYWRlci5tb2R1bGUuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBrZXlmcmFtZXMgbG9hZGVyLXBpbmcge1xuICAwJSB7XG4gICAgdG9wOiAzNnB4O1xuICAgIGxlZnQ6IDM2cHg7XG4gICAgd2lkdGg6IDA7XG4gICAgaGVpZ2h0OiAwO1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbiAgMTAwJSB7XG4gICAgdG9wOiAwcHg7XG4gICAgbGVmdDogMHB4O1xuICAgIHdpZHRoOiA3MnB4O1xuICAgIGhlaWdodDogNzJweDtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG59XG4uXyB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogODBweDtcbiAgaGVpZ2h0OiA4MHB4O1xufVxuLl8gPiBkaXYge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvcmRlcjogNHB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgb3BhY2l0eTogMTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBhbmltYXRpb246IGxvYWRlci1waW5nIDFzIGN1YmljLWJlemllcigwLCAwLjIsIDAuOCwgMSkgaW5maW5pdGU7XG59XG4uXyA+IGRpdjpudGgtY2hpbGQoMikge1xuICBhbmltYXRpb24tZGVsYXk6IC0wLjVzO1xufSJdfQ== */";
var styles$2 = {"_":"☕️_Loader____1abbb","loader-ping":"☕️_Loader_loader-ping__1abbb"};
styleInject(css_248z$2);

var Loader = function Loader() {
  return /*#__PURE__*/React.createElement("div", {
    className: styles$2._
  }, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null));
};

var getStatusFromDataLength = function getStatusFromDataLength(length) {
  var isLoading = Boolean(!length && length !== 0);
  var isEmpty = Boolean(!isLoading && length === 0);
  return {
    isEmpty: isEmpty,
    isLoading: isLoading
  };
};

var css_248z$1 = ".☕️_TempTriggerButton____1e4ef>svg{margin-top:-.125em}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRlbXBUcmlnZ2VyQnV0dG9uLm1vZHVsZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1DQUNFLGtCQUNGIiwiZmlsZSI6IlRlbXBUcmlnZ2VyQnV0dG9uLm1vZHVsZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLl8gPiBzdmcge1xuICBtYXJnaW4tdG9wOiAtMC4xMjVlbTtcbn0iXX0= */";
var styles$1 = {"_":"☕️_TempTriggerButton____1e4ef"};
styleInject(css_248z$1);

var popperOverTrigger = {
  name: 'offset',
  options: {
    offset: function offset(_ref) {
      var placement = _ref.placement,
          reference = _ref.reference;
          _ref.popper;

      if (['bottom', 'bottom-end', 'bottom-start'].includes(placement)) {
        return [0, -reference.height];
      } else {
        return [];
      }
    }
  }
}; // This modifier will make the popper take the same width as the trigger

var applyMaxSize = {
  enabled: true,
  fn: function fn(_ref4) {
    var state = _ref4.state;
    var height = state.modifiersData.maxSize.height;
    state.styles.popper.maxHeight = height + "px";
  },
  name: 'applyMaxSize',
  phase: 'beforeWrite',
  requires: ['maxSize']
};
var DEFAULT_CASCARA_MODIFIERS = [popperOverTrigger, maxSize, applyMaxSize];

var chatStyles$2 = {
  root: function root(_ref) {
    _ref.variables;
        var siteVariables = _ref.theme.siteVariables;
    return {
      fontFamily: siteVariables.bodyFontFamily
    };
  }
};

var TEAMS_THEMES = {
  teamsDarkTheme: teamsDarkTheme,
  teamsHighContrastTheme: teamsHighContrastTheme,
  teamsTheme: teamsTheme
};

var teamsThemeOverrides = function teamsThemeOverrides(teamsThemeName) {
  // Check to make sure we are using an actual Teams theme
  if (!Object.keys(TEAMS_THEMES).includes(teamsThemeName)) {
    throw new Error(teamsThemeName + " is invalid. Must be one of: " + Object.keys(TEAMS_THEMES).join(', '));
  }

  var theme = _extends({}, TEAMS_THEMES[teamsThemeName], {
    componentStyles: _extends({}, TEAMS_THEMES[teamsThemeName].componentStyles, {
      Chat: mergeComponentStyles(TEAMS_THEMES[teamsThemeName].componentStyles.Chat, chatStyles$2)
    }),
    staticStyles: [] // Remove static styles from Teams themes.

  }); // console.log(theme.componentStyles.Chat);
  // Return the theme, but override a few things


  return theme;
};

// import { FontFaces } from '@fluentui/styles';
var fontFaces$1 = [{
  name: 'Slack-Lato',
  paths: ['https://cdnjs.cloudflare.com/ajax/libs/lato-font/3.0.0/fonts/lato-normal/lato-normal.woff2'],
  props: {
    fontStyle: 'normal',
    fontWeight: 400
  }
}, {
  name: 'Slack-Lato',
  paths: ['https://cdnjs.cloudflare.com/ajax/libs/lato-font/3.0.0/fonts/lato-bold/lato-bold.woff2'],
  props: {
    fontStyle: 'normal',
    fontWeight: 700
  }
}, {
  name: 'Slack-Lato',
  paths: ['https://cdnjs.cloudflare.com/ajax/libs/lato-font/3.0.0/fonts/lato-normal-italic/lato-normal-italic.woff2'],
  props: {
    fontStyle: 'italic',
    fontWeight: 400
  }
}];

var fontFaces = [].concat(teamsTheme.fontFaces, fontFaces$1);

var siteVariables$1 = _extends({}, teamsTheme.siteVariables, {
  bodyFontFamily: "Inter, \"Helvetica Neue\", Arial, Helvetica, sans-serif"
});
// import { colors } from './colors';
// //
// // COLORS
// //
// export { categoryColors, categoryColorScheme } from './categoryColors';
// export {
//   colors,
//   contextualColors,
//   naturalColors,
//   primitiveColors,
//   colorScheme,
//   transparentColors,
// } from './colors';
// //
// // BORDER STYLES
// //
// export const borderWidth = '1px';
// export const borderRadiusSmall = '2px'; // input focus states
// export const borderRadiusMedium = '4px'; // default border radius
// export const focusInnerBorderColor = colors.white;
// export const focusOuterBorderColor = colors.black;
// //
// // SHADOW LEVELS
// //
// export const shadowLevel1 = '0 .2rem .4rem -.075rem rgba(0, 0, 0, .1)';
// export const shadowLevel2 = '0 .4rem .7rem -.1rem rgba(0, 0, 0, .1)';
// export const shadowLevel3 = '0 .8rem 1rem -.2rem rgba(0, 0, 0, .1)';
// export const shadowLevel4 = '0 1.6rem 1.8rem -.4rem rgba(0, 0, 0, .1)';
// export const shadowLevel1Dark = '0 .2rem .4rem -.075rem rgba(0, 0, 0, .25)';
// //
// // FONT SIZES
// //
// export const fontSizes = {
//   smaller: pxToRem(10),
//   small: pxToRem(12),
//   medium: pxToRem(14),
//   large: pxToRem(18),
//   larger: pxToRem(24),
//   largest: pxToRem(28),
// };
// //
// // FONT WEIGHTS
// //
// export const fontWeightLight = 200;
// export const fontWeightSemilight = 300;
// export const fontWeightRegular = 400;
// export const fontWeightSemibold = 600;
// export const fontWeightBold = 700;
// //
// // LINE HEIGHTS
// //
// export const lineHeightDefault = 1;
// export const lineHeightSmaller = 1.2;
// export const lineHeightSmall = 1.3333;
// export const lineHeightMedium = 1.4286;
// export const lineHeightLarge = 1.3333;
// export const lineHeightLarger = 1.3333;
// export const lineHeightLargest = 1.3333;
// //
// // Z-INDEX
// // Used to maintain proper stack order of components
// //
// export const zIndexes: Record<string, number> = {
//   background: 0, // Default value
//   foreground: 1, // Put a component in front
//   menuItem: 2, // Currently used only for menu item beak element
//   overlay: 1000, // Dialog/popup/menu overlays
//   overlayPriority: 1001, // for nested overlays, like tooltip in dialog.
//   debug: 999999999, // for debug purposes
// };
// //
// // SEMANTIC ASSIGNMENTS
// //
// export const bodyPadding = 0;
// export const bodyMargin = 0;
// export const bodyFontFamily =
//   '"Segoe UI", system-ui, "Apple Color Emoji", "Segoe UI Emoji", sans-serif';
// export const bodyFontSize = fontSizes.medium;
// export const bodyBackground = colors.white;
// export const bodyColor = colors.grey[750];
// export const bodyLineHeight = lineHeightMedium;

// type CSSBorderStyles = Pick<React.CSSProperties, 'borderWidth' | 'borderRadius'>;
// type BorderPadding = Record<'top' | 'bottom' | 'left' | 'right', string>;
// type BorderFocusStyles = CSSBorderStyles & {
//   variables?:
//     | SiteVariablesPrepared
//     | {
//         borderWidth: string;
//         borderRadius: string;
//         focusInnerBorderColor: string;
//         focusOuterBorderColor: string;
//         zIndexes: { foreground: string };
//       };
//   focusInnerBorderColor?: string;
//   focusOuterBorderColor?: string;
//   borderPadding?: string | BorderPadding;
// };
var defaultColor = 'transparent';
/**
 * Returns style object that can be used for styling components on focus state.
 * NOTE: the element where this is used needs to have relative positioning so that the
 * pseudo elements created on focus can be properly positioned.
 */

var getBorderFocusStyles = function getBorderFocusStyles(args) {
  var sv = args.variables;
  var _args$borderWidth = args.borderWidth,
      borderWidth = _args$borderWidth === void 0 ? sv.borderWidth : _args$borderWidth,
      _args$borderRadius = args.borderRadius,
      borderRadius = _args$borderRadius === void 0 ? sv.borderRadius : _args$borderRadius,
      _args$focusInnerBorde = args.focusInnerBorderColor,
      focusInnerBorderColor = _args$focusInnerBorde === void 0 ? sv.focusInnerBorderColor || defaultColor : _args$focusInnerBorde,
      _args$focusOuterBorde = args.focusOuterBorderColor,
      focusOuterBorderColor = _args$focusOuterBorde === void 0 ? sv.focusOuterBorderColor || defaultColor : _args$focusOuterBorde,
      borderPadding = args.borderPadding;
  var defaultPreudoStyles = {
    borderRadius: borderRadius,
    borderStyle: 'solid',
    borderWidth: borderWidth,
    content: '""',
    pointerEvents: 'none',
    position: 'absolute'
  };
  var borderPaddingTop = (borderPadding === null || borderPadding === void 0 ? void 0 : borderPadding.top) || borderPadding;
  var borderPaddingBottom = (borderPadding === null || borderPadding === void 0 ? void 0 : borderPadding.bottom) || borderPadding;
  var borderPaddingLeft = (borderPadding === null || borderPadding === void 0 ? void 0 : borderPadding.left) || borderPadding;
  var borderPaddingRight = (borderPadding === null || borderPadding === void 0 ? void 0 : borderPadding.right) || borderPadding;
  return {
    ':focus': {
      outline: 'none'
    },
    ':focus-visible': {
      borderColor: 'transparent',
      ':before': _extends({}, defaultPreudoStyles, {
        zIndex: sv.zIndexes.foreground,
        borderColor: focusInnerBorderColor,
        top: borderPadding == null ? '0' : "-" + borderPaddingTop,
        bottom: borderPadding == null ? '0' : "-" + borderPaddingBottom,
        left: borderPadding == null ? '0' : "-" + borderPaddingLeft,
        right: borderPadding == null ? '0' : "-" + borderPaddingRight
      }),
      ':after': _extends({}, defaultPreudoStyles, {
        zIndex: sv.zIndexes.foreground,
        borderColor: focusOuterBorderColor,
        top: borderPadding == null ? "-" + borderWidth : "calc(0px - " + borderPaddingTop + " - " + borderWidth + ")",
        bottom: borderPadding == null ? "-" + borderWidth : "calc(0px - " + borderPaddingBottom + " - " + borderWidth + ")",
        left: borderPadding == null ? "-" + borderWidth : "calc(0px - " + borderPaddingLeft + " - " + borderWidth + ")",
        right: borderPadding == null ? "-" + borderWidth : "calc(0px - " + borderPaddingRight + " - " + borderWidth + ")"
      })
    }
  };
};

var getIconFillOrOutlineStyles = function getIconFillOrOutlineStyles(_ref) {
  var _ref2;

  var outline = _ref.outline;
  return _ref2 = {}, _ref2["& ." + iconClassNames.filled] = {
    display: outline ? 'none' : 'block'
  }, _ref2["& ." + iconClassNames.outline] = {
    display: outline ? 'block' : 'none'
  }, _ref2;
};

var DEFAULT_REM_SIZE_IN_PX = 16;
var _documentRemSize = null; // A replacement for a Lodash's one, way more faster on our cases as handles specific scenario

var round = function round(n) {
  return (n * 10000 + (n > 0 ? 0.5 : -0.5) << 0) / 10000;
};
/**
 * Converts the provided px size to rem based on the default font size of 16px unless
 * the HTML font size has been previously defined with setHTMLFontSize().
 * @param valueInPx - The px value to convert to rem.
 * @param baseRemSize - Rem size to use for conversions. Optional - document's font size will be taken otherwise.
 * @example
 * ```
 * // Returns '1rem' for default document font size (16px).
 * pxToRem(16)
 *
 * // Returns '2rem'.
 * pxToRem(32, 16)
 * ```
 * @returns The value converted to the rem.
 */


var pxToRem = function pxToRem(valueInPx, baseRemSize) {
  if (!baseRemSize && !_documentRemSize) {
    // there is no way how to reset the cached value
    // invalidating the cache is not possible as resetting cached value won't trigger recalculation of site variables,
    // for which originally computed values will stay unchanged
    _documentRemSize = DEFAULT_REM_SIZE_IN_PX;
  }

  var remSize = baseRemSize || _documentRemSize || DEFAULT_REM_SIZE_IN_PX;
  var convertedValueInRems = valueInPx / remSize;
  return round(convertedValueInRems) + "rem";
};

// Visually hides elements which remain visible for screen reader
var screenReaderContainerStyles = {
  border: '0',
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: '0',
  position: 'absolute',
  width: '1px'
};

var stringLiteralsArray = function stringLiteralsArray() {
  var tuple = function tuple() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return args;
  };

  return tuple.apply(void 0, arguments);
};

var pickValuesFromColorScheme = function pickValuesFromColorScheme(colorScheme, componentAreas) {
  var result = {};
  Object.keys(colorScheme).forEach(function (color) {
    var _extends4;

    var colorValues = componentAreas.reduce(function (accumulator, area) {
      var _extends3;

      return _extends({}, accumulator, (_extends3 = {}, _extends3[area] = colorScheme[color][area], _extends3));
    }, {});
    result = _extends({}, result, (_extends4 = {}, _extends4[color] = colorValues, _extends4));
  });
  return result;
};

var attachmentStyles$1 = {
  root: function root(_ref) {
    var _extends2, _hover;

    var p = _ref.props,
        v = _ref.variables,
        siteVariables = _ref.theme.siteVariables;
    var borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      borderRadius: v.borderRadius
    });
    return _extends({
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      width: '100%',
      maxWidth: pxToRem(440),
      minHeight: pxToRem(48),
      padding: v.padding,
      marginBottom: pxToRem(2),
      marginRight: pxToRem(2),
      background: v.backgroundColor,
      color: v.textColor,
      // boxShadow: v.boxShadow,
      border: pxToRem(2) + " solid " + v.borderColor,
      borderRadius: v.borderRadius
    }, borderFocusStyles, {
      '& .ui-attachment__progress': {
        transition: 'width 0.2s',
        position: 'absolute',
        display: 'block',
        bottom: 0,
        left: 0,
        maxWidth: '100%',
        height: v.progressHeight,
        background: v.progressColor
      }
    }, p.actionable && {
      cursor: 'pointer',
      ':focus-visible': _extends({}, borderFocusStyles[':focus-visible'], (_extends2 = {
        backgroundColor: v.focusBackgroundColor,
        color: v.focusColor
      }, _extends2["& ." + attachmentActionClassName] = {
        color: v.focusColor
      }, _extends2["& ." + svgIconClassName] = {
        color: v.focusColor
      }, _extends2)),
      ':hover': (_hover = {
        backgroundColor: v.backgroundColorHover,
        color: v.textColorHover
      }, _hover["& ." + attachmentActionClassName] = {
        color: v.textColorHover
      }, _hover["& ." + svgIconClassName] = {
        color: v.textColorHover
      }, _hover)
    });
  }
};

var attachmentActionStyles$1 = {
  root: function root(_ref) {
    var p = _ref.props,
        v = _ref.variables,
        theme = _ref.theme;
    var siteVariables = theme.siteVariables;
    var iconFilledStyles = getIconFillOrOutlineStyles({
      outline: false
    });
    var borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      borderRadius: v.actionFocusBorderRadius
    });
    return _extends({
      height: v.actionHeight,
      maxWidth: v.actionMaxWidth,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      verticalAlign: 'middle',
      cursor: 'pointer',
      // text button defaults
      color: v.actionColor,
      // textColor
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      padding: 0
    }, getIconFillOrOutlineStyles({
      outline: true
    }), {
      ':focus': _extends({
        boxShadow: 'none'
      }, borderFocusStyles[':focus']),
      ':focus-visible': _extends({}, iconFilledStyles, borderFocusStyles[':focus-visible'])
    }, p.primary && {
      color: v.actionPrimaryColor
    }, p.disabled && {
      cursor: 'default',
      boxShadow: 'none',
      pointerEvents: 'none',
      color: v.actionColorDisabled,
      backgroundColor: 'transparent',
      ':hover': {
        color: v.actionColorDisabled
      }
    }, {
      minWidth: v.actionHeight,
      ':hover': _extends({}, getIconFillOrOutlineStyles({
        outline: false
      }))
    });
  },
  icon: function icon(_ref2) {
    var p = _ref2.props,
        v = _ref2.variables;
    return _extends({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: v.actionIconSize,
      height: v.actionIconSize
    }, p.loading && {
      margin: 0,
      opacity: 0,
      width: 0
    }, p.hasContent && _extends({
      margin: "0 " + pxToRem(10) + " 0 0"
    }, p.iconPosition === 'after' && {
      margin: "0 0 0 " + pxToRem(10)
    }));
  },
  loader: function loader(_ref3) {
    var _extends2;

    var p = _ref3.props,
        v = _ref3.variables;
    return _extends((_extends2 = {}, _extends2["& ." + loaderSlotClassNames.indicator] = {
      width: v.actionLoaderSize,
      height: v.actionLoaderSize
    }, _extends2["& ." + loaderSlotClassNames.svg] = {
      ':before': {
        animationName: {
          to: {
            transform: "translate3d(0, " + v.actionLoaderSvgAnimationHeight + ", 0)"
          }
        },
        borderWidth: v.actionLoaderBorderSize,
        width: v.actionLoaderSize,
        height: v.actionLoaderSvgHeight
      }
    }, _extends2), p.hasContent && {
      marginRight: pxToRem(4)
    });
  }
};

var attachmentBodyStyles$1 = {
  root: function root() {
    return {
      flex: 1
    };
  }
};

var attachmentDescriptionStyles$1 = {
  root: function root(_ref) {
    var v = _ref.variables;
    return {
      display: 'block',
      fontSize: v.descriptionFontSize,
      fontWeight: v.descriptionFontWeight,
      lineHeight: v.descriptionLineHeight
    };
  }
};

var attachmentHeaderStyles$1 = {
  root: function root(_ref) {
    var v = _ref.variables;
    return {
      display: 'block',
      fontSize: v.headerFontSize,
      fontWeight: v.headerFontWeight,
      lineHeight: v.headerLineHeight
    };
  }
};

var attachmentIconStyles$1 = {
  root: function root(_ref) {
    var _ref2;

    var v = _ref.variables;
    return _ref2 = {
      height: v.iconSize,
      width: v.iconSize,
      marginRight: v.iconSpace
    }, _ref2["& ." + svgIconClassName] = {
      height: '100%',
      width: '100%',
      '& svg': {
        height: '100%',
        width: '100%'
      }
    }, _ref2;
  }
};

var sizeToPxValue$6 = {
  smallest: 20,
  smaller: 24,
  small: 28,
  medium: 32,
  large: 44,
  larger: 64,
  largest: 96
};
var avatarStyles$1 = {
  root: function root(_ref) {
    var size = _ref.props.size;
    var sizeInRem = pxToRem(sizeToPxValue$6[size]);
    return {
      position: 'relative',
      backgroundColor: 'inherit',
      display: 'inline-block',
      verticalAlign: 'middle',
      height: sizeInRem,
      width: sizeInRem
    };
  }
};

var sizeToPxValue$5 = {
  smallest: 6,
  smaller: 10,
  small: 10,
  medium: 10,
  large: 10,
  larger: 16,
  largest: 0
};
var getSizeStyles$1 = function getSizeStyles(sizeInPx) {
  var sizeInRem = pxToRem(sizeInPx);
  return {
    height: sizeInRem,
    width: sizeInRem
  };
};
var avatarStatusStyles$1 = {
  root: function root(_ref) {
    var v = _ref.variables,
        _ref$props = _ref.props,
        color = _ref$props.color,
        size = _ref$props.size,
        state = _ref$props.state;
    return _extends({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }, getSizeStyles$1(sizeToPxValue$5[size]), {
      verticalAlign: 'middle',
      borderRadius: '9999px',
      position: 'absolute',
      bottom: 0,
      right: 0,
      boxShadow: "0 0 0 " + v.statusBorderWidth + " " + v.statusBorderColor
    }, state === 'success' && {
      backgroundColor: v.statusSuccessBackgroundColor
    }, state === 'info' && {
      backgroundColor: v.statusInfoBackgroundColor
    }, state === 'warning' && {
      backgroundColor: v.statusWarningBackgroundColor
    }, state === 'error' && {
      backgroundColor: v.statusErrorBackgroundColor
    }, state === 'unknown' && {
      backgroundColor: v.statusBackgroundColor
    }, Boolean(color) && {
      backgroundColor: color
    });
  }
};

var avatarStatusIconStyles$1 = {
  root: function root(_ref) {
    var state = _ref.props.state,
        v = _ref.variables;
    return _extends({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: v.statusIconSize,
      height: v.statusIconSize,
      color: v.statusColor
    }, state === 'success' && {
      color: v.statusSuccessColor
    }, state === 'info' && {
      color: v.statusInfoColor
    }, state === 'error' && {
      color: v.statusErrorColor
    }, state === 'warning' && {
      color: v.statusWarningColor
    }, {
      '& > :first-child': {
        height: '100%',
        width: '100%',
        '& svg': {
          height: '100%',
          width: '100%'
        }
      }
    });
  }
};

var avatarImageStyles$1 = {
  root: function root(_ref) {
    var v = _ref.variables,
        p = _ref.props;
    return _extends({
      boxSizing: 'border-box',
      display: 'inline-block'
    }, p.circular && {
      borderRadius: v.imageCircularRadius
    }, p.avatar && {
      width: p.fluid && '100%' || v.imageAvatarSize,
      borderRadius: v.imageAvatarRadius
    }, {
      borderColor: v.avatarBorderColor,
      borderStyle: 'solid',
      borderWidth: v.avatarBorderWidth,
      height: '100%',
      objectFit: 'cover',
      verticalAlign: 'top',
      width: '100%'
    }, !p.avatar && {
      borderRadius: v.squareAvatarBorderRadius
    });
  }
};

var sizeToPxValue$4 = {
  smallest: 20,
  smaller: 24,
  small: 28,
  medium: 32,
  large: 44,
  larger: 64,
  largest: 96
};
var iconSizeToPxValue$1 = {
  smallest: 10,
  smaller: 12,
  small: 16,
  medium: 16,
  large: 20,
  larger: 32,
  largest: 40
};
var avatarIconStyles$1 = {
  root: function root(_ref) {
    var v = _ref.variables,
        p = _ref.props;
    var sizeInRem = pxToRem(sizeToPxValue$4[p.size]);
    var iconsizeInRem = pxToRem(iconSizeToPxValue$1[p.size]);
    return _extends({
      color: v.iconColor,
      background: v.iconBackgroundColor,
      width: sizeInRem,
      height: sizeInRem,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center'
    }, p.square && {
      borderRadius: v.squareAvatarBorderRadius
    }, {
      '& > :first-child': {
        margin: '0 auto',
        width: iconsizeInRem,
        height: iconsizeInRem,
        '& svg': {
          width: '100%',
          height: '100%'
        }
      }
    });
  }
};

var sizeToPxValue$3 = {
  smallest: 20,
  smaller: 24,
  small: 28,
  medium: 32,
  large: 44,
  larger: 64,
  largest: 96
};
var avatarLabelStyles$1 = {
  root: function root(_ref) {
    var p = _ref.props,
        v = _ref.variables;
    var sizeInRem = pxToRem(sizeToPxValue$3[p.size]);
    return _extends({
      alignItems: 'center',
      overflow: 'hidden',
      color: v.labelColor,
      backgroundColor: v.labelBackground,
      borderRadius: '50%',
      display: 'inline-block',
      width: sizeInRem,
      height: sizeInRem,
      lineHeight: sizeInRem,
      fontSize: pxToRem(sizeToPxValue$3[p.size] / 2.333),
      verticalAlign: 'top',
      textAlign: 'center',
      padding: '0'
    }, p.square && {
      borderRadius: v.squareAvatarBorderRadius
    }, p.circular && {
      borderRadius: v.labelCircularRadius
    });
  }
};

var ultraFast = '50ms';
var faster = '100ms';

var buttonStyles$1 = {
  root: function root(_ref) {
    var p = _ref.props,
        v = _ref.variables,
        siteVariables = _ref.theme.siteVariables;
    var borderWidth = siteVariables.borderWidth;
    var borderFocusStyles = getBorderFocusStyles(_extends({
      variables: siteVariables,
      borderPadding: borderWidth
    }, p.circular && {
      borderPadding: pxToRem(4)
    }));
    return _extends({
      height: v.height,
      minWidth: isNil(p.loading) ? v.minWidth : v.loadingMinWidth,
      maxWidth: v.maxWidth,
      color: v.color,
      backgroundColor: v.backgroundColor,
      borderRadius: v.borderRadius,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      padding: v.padding,
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: faster,
      textTransform: 'uppercase'
    }, p.size === 'small' && {
      padding: v.sizeSmallPadding,
      height: v.sizeSmallHeight,
      minWidth: v.sizeSmallMinWidth
    }, !p.text && _extends({
      outline: 0,
      borderWidth: pxToRem(2),
      borderStyle: 'solid',
      borderColor: v.borderColor,
      ':hover': {
        color: v.colorHover,
        backgroundColor: v.backgroundColorHover,
        borderColor: v.borderColorHover
      }
    }, !p.disabledFocusable && {
      ':active': {
        transition: ultraFast,
        color: v.colorActive,
        backgroundColor: v.backgroundColorActive,
        borderColor: v.borderColorActive,
        boxShadow: 'none'
      }
    }, {
      ':focus': borderFocusStyles[':focus'],
      ':focus-visible': _extends({}, borderFocusStyles[':focus-visible'], {
        backgroundColor: v.backgroundColorFocus,
        borderColor: v.borderColorFocus,
        color: v.colorFocus,
        borderWidth: borderWidth,
        ':hover': {
          borderColor: v.borderColorHover
        }
      })
    }, p.size === 'small' && {
      boxShadow: 'none'
    }), p.circular && !p.text && _extends({
      minWidth: v.height,
      padding: 0,
      borderRadius: v.circularBorderRadius
    }, p.size === 'small' && {
      minWidth: v.sizeSmallHeight
    }), p.text && _extends({
      color: v.textColor,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      padding: "0 " + pxToRem(8)
    }, getIconFillOrOutlineStyles({
      outline: true
    }), {
      ':hover': _extends({
        color: v.textColorHover
      }, getIconFillOrOutlineStyles({
        outline: false
      })),
      ':focus': _extends({
        boxShadow: 'none'
      }, borderFocusStyles[':focus']),
      ':focus-visible': borderFocusStyles[':focus-visible']
    }, p.primary && {
      color: v.textPrimaryColor
    }), p.primary && !p.text && _extends({
      color: v.primaryColor,
      backgroundColor: v.primaryBackgroundColor,
      borderColor: v.primaryBorderColor,
      boxShadow: v.primaryBoxShadow
    }, !p.disabledFocusable && {
      ':active': {
        transition: ultraFast,
        backgroundColor: v.primaryBackgroundColorActive,
        boxShadow: 'none'
      }
    }, {
      ':focus': borderFocusStyles[':focus'],
      ':focus-visible': _extends({}, borderFocusStyles[':focus-visible'], {
        backgroundColor: v.primaryBackgroundColorFocus
      }),
      ':hover': {
        color: v.primaryColorHover,
        backgroundColor: v.primaryBackgroundColorHover
      }
    }), p.inverted && _extends({
      backgroundColor: siteVariables.colorScheme.silver.background,
      borderColor: siteVariables.colorScheme.silver.border,
      color: siteVariables.colorScheme.silver.foreground
    }, !p.disabledFocusable && {
      ':active': {
        transition: ultraFast,
        backgroundColor: siteVariables.colorScheme.silver.backgroundPressed,
        color: siteVariables.colorScheme.silver.foregroundHover
      }
    }, {
      ':hover': {
        backgroundColor: siteVariables.colorScheme.silver.backgroundHover,
        color: siteVariables.colorScheme.silver.foregroundHover
      },
      ':focus': _extends({}, borderFocusStyles[':focus'], {
        boxShadow: 'none'
      }),
      ':focus-visible': _extends({}, borderFocusStyles[':focus-visible'], !p.disabledFocusable && {
        backgroundColor: siteVariables.colorScheme.silver.backgroundPressed,
        color: siteVariables.colorScheme.silver.foregroundHover
      })
    }), p.tinted && _extends({
      backgroundColor: v.tintedBackgroundColor,
      borderColor: v.tintedBorderColor,
      color: v.tintedColor
    }, !p.disabledFocusable && {
      ':active': {
        transition: ultraFast,
        backgroundColor: v.tintedBackgroundColorActive
      }
    }, {
      ':hover': {
        backgroundColor: v.tintedBackgroundColorHover
      },
      ':focus': {
        boxShadow: 'none'
      }
    }), p.disabled && {
      // pointer events intentionally not disabled for focusable disabled buttons
      // so that hover events work
      pointerEvents: 'none'
    }, (p.disabled || p.disabledFocusable) && _extends({
      cursor: 'default',
      color: v.colorDisabled,
      boxShadow: 'none',
      ':hover': {
        color: v.colorDisabled
      }
    }, p.text && {
      color: v.textColorDisabled,
      backgroundColor: 'transparent',
      ':hover': {
        color: v.textColorDisabled
      }
    }, !p.text && {
      backgroundColor: v.backgroundColorDisabled,
      borderColor: v.borderColorDisabled
    }), p.fluid && {
      width: '100%',
      maxWidth: '100%'
    }, p.iconOnly && _extends({
      minWidth: v.height,
      padding: 0
    }, !p.inverted && {
      ':hover': _extends({}, getIconFillOrOutlineStyles({
        outline: false
      }), {
        color: v.textColorIconOnlyHover,
        background: v.backgroundColorIconOnlyHover
      })
    }, p.size === 'small' && {
      minWidth: v.sizeSmallHeight
    }));
  },
  icon: function icon(_ref2) {
    var p = _ref2.props,
        v = _ref2.variables;
    return _extends({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: v.iconSize,
      height: v.iconSize
    }, p.loading && {
      margin: 0,
      opacity: 0,
      width: 0
    }, p.hasContent && _extends({
      margin: "0 " + pxToRem(10) + " 0 0"
    }, p.iconPosition === 'after' && {
      margin: "0 0 0 " + pxToRem(10)
    }));
  },
  loader: function loader(_ref3) {
    var _extends2;

    var p = _ref3.props,
        v = _ref3.variables;
    return _extends((_extends2 = {}, _extends2["& ." + loaderSlotClassNames.indicator] = {
      width: p.size === 'small' ? v.sizeSmallLoaderSize : v.loaderSize,
      height: p.size === 'small' ? v.sizeSmallLoaderSize : v.loaderSize
    }, _extends2["& ." + loaderSlotClassNames.svg] = {
      ':before': {
        animationName: {
          to: {
            transform: "translate3d(0, " + (p.size === 'small' ? v.sizeSmallLoaderSvgAnimationHeight : v.loaderSvgAnimationHeight) + ", 0)"
          }
        },
        borderWidth: p.size === 'small' ? v.sizeSmallLoaderBorderSize : v.loaderBorderSize,
        width: p.size === 'small' ? v.sizeSmallLoaderSize : v.loaderSize,
        height: p.size === 'small' ? v.sizeSmallLoaderSvgHeight : v.loaderSvgHeight
      }
    }, _extends2), p.hasContent && {
      marginRight: pxToRem(4)
    });
  }
};

var commonButtonsStyles$1 = function commonButtonsStyles(circular) {
  return circular ? {
    marginRight: pxToRem(8)
  } : {
    borderRadius: 0
  };
};

var buttonGroupStyles$1 = {
  root: function root() {
    return {};
  },
  middleButton: function middleButton(_ref) {
    var p = _ref.props;
    return _extends({}, commonButtonsStyles$1(p.circular));
  },
  firstButton: function firstButton(_ref2) {
    var p = _ref2.props,
        v = _ref2.variables;
    return _extends({}, commonButtonsStyles$1(p.circular), !p.circular && {
      borderTopLeftRadius: v.borderRadius,
      borderBottomLeftRadius: v.borderRadius
    });
  },
  lastButton: function lastButton(_ref3) {
    var p = _ref3.props,
        v = _ref3.variables;
    return _extends({}, commonButtonsStyles$1(p.circular), !p.circular && {
      borderTopRightRadius: v.borderRadius,
      borderBottomRightRadius: v.borderRadius
    });
  }
};

var buttonContentStyles$1 = {
  root: function root(_ref) {
    var p = _ref.props,
        v = _ref.variables;
    return _extends({
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: v.contentFontSize,
      lineHeight: v.contentLineHeight
    }, p.size === 'small' && {
      fontSize: v.sizeSmallContentFontSize,
      lineHeight: v.sizeSmallContentLineHeight
    });
  }
};

var chatStyles$1 = {
  root: function root(_ref) {
    var v = _ref.variables,
        siteVariables = _ref.theme.siteVariables;
    return {
      backgroundColor: v.backgroundColor,
      border: "1px solid " + v.backgroundColor,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: siteVariables.bodyFontFamily,
      listStyle: 'none',
      padding: "0 " + pxToRem(10) + " 0 " + pxToRem(10),
      margin: 0
    };
  }
};

var chatItemStyles$1 = {
  root: function root(_ref) {
    var p = _ref.props;
        _ref.variables;
    return _extends({
      position: 'relative'
    }, (!p.attached || p.attached === 'top') && {
      paddingTop: pxToRem(16)
    }, (p.attached === 'bottom' || p.attached === true) && {
      paddingTop: pxToRem(2)
    }, {
      paddingBottom: 0
    });
  },
  gutter: function gutter(_ref2) {
    var _extends2;

    var p = _ref2.props,
        v = _ref2.variables;
    return _extends((_extends2 = {
      position: 'absolute',
      marginTop: v.gutterMargin
    }, _extends2[p.contentPosition === 'end' ? 'right' : 'left'] = 0, _extends2), (p.attached === 'bottom' || p.attached === true) && {
      display: 'none'
    });
  },
  message: function message(_ref3) {
    var p = _ref3.props,
        v = _ref3.variables;
    return {
      position: 'relative',
      "float": p.contentPosition === 'end' ? 'right' : 'left',
      marginLeft: v.messageMargin,
      marginRight: v.messageMargin
    };
  }
};

var messageRadiusStyles = function messageRadiusStyles(_ref) {
  var _ref2, _ref3, _ref4;

  var p = _ref.p,
      v = _ref.v;
  return _extends({
    borderTopRightRadius: v.borderRadius,
    borderTopLeftRadius: v.borderRadius,
    borderBottomRightRadius: v.borderRadius,
    borderBottomLeftRadius: v.borderRadius
  }, p.attached === true && (_ref2 = {}, _ref2[p.mine ? 'borderTopRightRadius' : 'borderTopLeftRadius'] = 0, _ref2[p.mine ? 'borderBottomRightRadius' : 'borderBottomLeftRadius'] = 0, _ref2), p.attached === 'top' && (_ref3 = {}, _ref3[p.mine ? 'borderBottomRightRadius' : 'borderBottomLeftRadius'] = 0, _ref3), p.attached === 'bottom' && (_ref4 = {}, _ref4[p.mine ? 'borderTopRightRadius' : 'borderTopLeftRadius'] = 0, _ref4));
};

var chatMessageStyles$1 = {
  root: function root(_ref5) {
    var _hover;

    var p = _ref5.props,
        v = _ref5.variables,
        siteVariables = _ref5.theme.siteVariables;
    return _extends({
      display: 'inline-block',
      position: 'relative',
      marginLeft: p.mine ? v.offset : 0,
      marginRight: !p.mine ? v.offset : 0,
      maxWidth: "calc(100% - " + v.offset + ")",
      minWidth: v.offset
    }, messageRadiusStyles({
      p: p,
      v: v
    }), {
      border: v.border,
      outline: 0,
      color: v.color,
      backgroundColor: p.mine ? v.backgroundColorMine : v.backgroundColor,
      wordBreak: 'break-word',
      wordWrap: 'break-word'
    }, (v.hasMention || v.isImportant) && {
      '::before': {
        content: '""',
        backgroundColor: v.hasMention ? v.hasMentionColor : v.isImportantColor,
        height: '100%',
        left: '0',
        position: 'absolute',
        top: '0',
        width: pxToRem(3),
        borderBottomLeftRadius: 'inherit',
        borderTopLeftRadius: 'inherit'
      }
    }, getBorderFocusStyles({
      variables: siteVariables
    }), isNil(v.showActionMenu) && {
      ':hover': (_hover = {}, _hover["> ." + chatMessageSlotClassNames.actionMenu] = {
        opacity: 1,
        zIndex: v.overlayZIndex,
        '[data-popper-escaped]': {
          opacity: 0
        }
      }, _hover)
    });
  },
  actionMenu: function actionMenu(_ref6) {
    var p = _ref6.props,
        v = _ref6.variables;
    return _extends({
      backgroundColor: v.backgroundColor,
      border: '1px solid',
      borderColor: v.reactionGroupBorderColor,
      borderRadius: v.borderRadius,
      boxShadow: v.actionMenuBoxShadow,
      // we need higher zIndex for the action menu in order to be displayed above the focus border of the chat message
      zIndex: p.focused || !isNil(v.showActionMenu) ? v.overlayZIndex : -1
    }, isNil(v.showActionMenu) && {
      overflow: p.focused ? 'visible' : 'hidden',
      // hide and squash actions menu to prevent accidental hovers over its invisible area
      opacity: p.focused ? 1 : 0,
      width: 'auto'
    }, !isNil(v.showActionMenu) && {
      overflow: v.showActionMenu ? 'visible' : 'hidden',
      // opacity should always be preferred over visibility in order to avoid accessibility bugs in
      // JAWS behavior on Windows
      opacity: v.showActionMenu ? 1 : 0,
      width: v.showActionMenu ? 'auto' : 0
    }, {
      '[data-popper-escaped]': {
        opacity: 0
      }
    });
  },
  author: function author(_ref7) {
    var p = _ref7.props,
        v = _ref7.variables;
    return _extends({}, (p.mine || p.attached === 'bottom' || p.attached === true) && screenReaderContainerStyles, {
      color: v.authorColor,
      borderRadius: pxToRem(12),
      marginRight: v.authorMarginRight,
      // marginBottom: v.headerMarginBottom,
      fontWeight: v.authorFontWeight,
      '&:not(:empty)': {
        display: 'inline-block',
        paddingTop: v.padding,
        paddingLeft: v.padding
      }
    });
  },
  timestamp: function timestamp(_ref8) {
    var _after;

    var p = _ref8.props,
        v = _ref8.variables;
    return _extends({
      marginBottom: v.headerMarginBottom
    }, p.mine && {
      color: v.timestampColorMine
    }, (p.attached === 'bottom' || p.attached === true) && !p.hasReactionGroup && screenReaderContainerStyles, {
      '&:not(:empty)': {
        display: 'inline-block',
        paddingTop: v.padding,
        paddingLeft: v.padding,
        paddingRight: v.padding
      },
      // This is our message caret, which should only show on messages with a timestamp
      // as these are also messages that have avatars
      '::after': (_after = {
        content: '""'
      }, _after[p.mine ? 'right' : 'left'] = pxToRem(-6), _after[p.mine ? 'borderLeft' : 'borderRight'] = pxToRem(6) + " solid " + (p.mine ? v.backgroundColorMine : v.backgroundColor), _after.display = 'block', _after.position = 'absolute', _after.top = pxToRem(14), _after.width = 0, _after.height = 0, _after.borderTop = pxToRem(6) + " solid transparent", _after.borderBottom = pxToRem(6) + " solid transparent", _after)
    });
  },
  content: function content(_ref9) {
    var p = _ref9.props,
        v = _ref9.variables;
    return _extends({
      color: p.mine ? v.contentColorMine : v.contentColor,
      // color: v.contentColor,
      padding: v.padding,
      display: 'block',
      '& > img': _extends({
        marginTop: !p.attached ? "-" + pxToRem(4) : "-" + v.padding,
        marginLeft: "-" + v.padding,
        marginRight: "-" + v.padding,
        marginBottom: "-" + v.padding,
        width: "calc(100% + 2*" + v.padding + ")"
      }, messageRadiusStyles({
        p: p,
        v: v
      }), !p.attached && {
        borderTopLeftRadius: pxToRem(4),
        borderTopRightRadius: pxToRem(4)
      }),
      '& a': {
        outline: 'none',
        color: p.mine ? v.linkColorMine : v.linkColor,
        ':focus': {
          textDecoration: 'underline'
        }
      }
    }, p.hasBadge && p.badgePosition === 'end' && {
      marginRight: pxToRem(4)
    });
  },
  badge: function badge(_ref10) {
    var _ref11;

    var p = _ref10.props,
        v = _ref10.variables;
    var sidePosition = p.badgePosition === 'start' ? 'left' : 'right';
    return _ref11 = {
      backgroundColor: v.hasMention ? v.hasMentionNubbinColor : v.isImportantColor,
      color: v.badgeTextColor,
      boxShadow: v.badgeShadow,
      position: 'absolute',
      padding: pxToRem(4),
      height: 'auto',
      width: 'auto',
      borderRadius: '50%',
      top: pxToRem(4),
      zIndex: v.zIndex
    }, _ref11[sidePosition] = 0, _ref11.transform = p.badgePosition === 'start' ? 'translateX(-50%)' : 'translateX(50%)', _ref11['& > :first-child'] = {
      display: 'inline-flex'
    }, _ref11;
  },
  reactionGroup: function reactionGroup(_ref12) {
    var p = _ref12.props,
        v = _ref12.variables;
    return _extends({
      marginLeft: v.reactionGroupMarginLeft
    }, p.hasBadge && p.badgePosition === 'end' && {
      marginRight: pxToRem(2)
    }, {
      "float": 'right'
    });
  }
};

var chatMessageDetailsStyles$1 = {
  root: function root(_ref) {
    var p = _ref.props,
        v = _ref.variables;
    return _extends({
      marginLeft: v.detailsMargin,
      fontSize: v.detailsFontSize,
      display: 'inline-block',
      color: v.detailsColor,
      ':hover': {
        color: v.detailsHoverColor
      }
    }, p.mine && {
      color: v.detailsColorMine,
      ':hover': {
        color: v.detailsHoverColorMine
      }
    });
  }
};

var chatMessageReadStatusStyles$1 = {
  root: function root(_ref) {
    var p = _ref.props,
        v = _ref.variables;
    return {
      position: 'absolute',
      right: v.rightPoistion,
      bottom: v.bottomPoistion,
      ':after': _extends({
        content: "\"" + p.title + "\""
      }, screenReaderContainerStyles)
    };
  }
};

var beforeAndAfter$1 = function beforeAndAfter(size, variables, colors, props) {
  return _extends({
    content: '""',
    flex: 1
  }, props.vertical ? {
    width: size + 1 + "px",
    height: '100%'
  } : {
    height: size + 1 + "px"
  }, {
    background: pathOr(variables.dividerColor, 'foreground', colors)
  });
};

var dividerStyles$1 = {
  root: function root(_ref) {
    var props = _ref.props,
        variables = _ref.variables;
    var color = props.color,
        fitted = props.fitted,
        size = props.size,
        important = props.important,
        hasContent = props.hasContent,
        vertical = props.vertical;
    var colors = variables.colorScheme[color];
    return _extends({
      color: pathOr(variables.textColor, 'foreground', colors),
      display: 'flex',
      alignItems: 'center'
    }, !fitted && {
      padding: vertical ? "0 " + variables.dividerPadding : variables.dividerPadding + " 0"
    }, important && {
      fontWeight: variables.importantFontWeight
    }, vertical && {
      height: '100%'
    }, hasContent ? {
      textAlign: 'center',
      fontSize: pxToRem(12 + size),
      lineHeight: variables.textLineHeight,
      '::before': _extends({}, beforeAndAfter$1(size, variables, colors, props)),
      '::after': _extends({}, beforeAndAfter$1(size, variables, colors, props))
    } : {
      '::before': _extends({}, beforeAndAfter$1(size, variables, colors, props))
    });
  }
};

var dividerContentStyles$1 = {
  root: function root() {
    return {
      marginLeft: pxToRem(20),
      marginRight: pxToRem(20)
    };
  }
};

var transparentColorStyle$1 = {
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  borderBottomColor: 'transparent'
};

var transparentColorStyleObj$1 = _extends({}, transparentColorStyle$1, {
  ':hover': transparentColorStyle$1,
  ':active': transparentColorStyle$1,
  ':focus': _extends({}, transparentColorStyle$1, {
    ':active': transparentColorStyle$1
  })
});

var getWidth$1 = function getWidth(p, v) {
  if (p.fluid) {
    return '100%';
  }

  if (p.inline) {
    return 'initial';
  }

  return v.width;
};

var dropdownStyles$1 = {
  root: function root(_ref) {
    var p = _ref.props;
    return _extends({}, p.inline && {
      display: 'inline-flex'
    });
  },
  clearIndicator: function clearIndicator(_ref2) {
    var v = _ref2.variables,
        siteVariables = _ref2.theme.siteVariables;
    return _extends({
      alignItems: 'center',
      alignSelf: 'center',
      display: 'flex',
      justifyContent: 'center',
      cursor: 'pointer',
      userSelect: 'none',
      margin: 0,
      position: 'absolute',
      right: pxToRem(6),
      padding: pxToRem(2),
      color: v.color
    }, getBorderFocusStyles({
      variables: siteVariables
    }));
  },
  container: function container(_ref3) {
    var _extends2;

    var p = _ref3.props,
        v = _ref3.variables,
        siteVariables = _ref3.theme.siteVariables;
    return _extends({
      display: 'flex',
      flexWrap: 'wrap',
      position: 'relative',
      borderStyle: 'solid',
      borderColor: v.borderColor,
      outline: 0,
      width: getWidth$1(p, v),
      borderWidth: p.search ? "0 0 " + v.searchBorderBottomWidth + " 0" : v.borderWidth,
      color: v.color,
      backgroundColor: v.backgroundColor,
      borderRadius: v.containerBorderRadius
    }, p.open && p.position === 'above' && {
      borderRadius: v.openAboveContainerBorderRadius
    }, p.open && p.position === 'below' && {
      borderRadius: v.openBelowContainerBorderRadius
    }, {
      ':hover': _extends({
        backgroundColor: v.backgroundColorHover,
        borderColor: v.borderColorHover
      }, p.open && {
        borderColor: v.openBorderColorHover
      })
    }, p.error && {
      border: pxToRem(1) + " solid " + v.borderError,
      ':hover': {
        border: pxToRem(1) + " solid " + v.borderError
      }
    }, {
      ':active': {
        backgroundColor: v.backgroundColor
      },
      ':focus-within': {
        // when dropdown's selected items are focused
        // keep the focus border style
        borderBottomColor: v.borderColorFocus
      }
    }, p.focused && _extends({
      backgroundColor: v.backgroundColor
    }, p.search && {
      borderBottomColor: v.borderColorFocus
    }, !p.search && !p.open && p.isFromKeyboard && getBorderFocusStyles({
      variables: siteVariables
    })[':focus-visible']), p.inline && _extends({}, transparentColorStyleObj$1, {
      alignItems: 'center'
    }), p.inverted && {
      backgroundColor: v.invertedBackgroundColor,
      ':hover': {
        backgroundColor: v.invertedBackgroundColorHover
      },
      ':active': {
        backgroundColor: v.invertedBackgroundColorHover
      },
      ':focus': {
        backgroundColor: v.invertedBackgroundColorHover
      }
    }, p.disabled && {
      backgroundColor: siteVariables.colorScheme["default"].backgroundDisabled,
      borderColor: siteVariables.colorScheme["default"].borderDisabled,
      userSelect: 'none',
      ':hover': {
        backgroundColor: siteVariables.colorScheme["default"].backgroundDisabled
      },
      ':active': {
        backgroundColor: siteVariables.colorScheme["default"].backgroundDisabled
      }
    }, (_extends2 = {}, _extends2["& ." + dropdownSlotClassNames.triggerButton] = _extends({}, p.disabled && {
      color: siteVariables.colorScheme["default"].foregroundDisabled
    }), _extends2));
  },
  selectedItems: function selectedItems(_ref4) {
    var p = _ref4.props,
        v = _ref4.variables;
    return _extends({
      display: 'flex',
      flexWrap: 'wrap',
      overflowY: 'auto',
      maxHeight: v.selectedItemsMaxHeight,
      '& .ui-button': {
        textTransform: 'none'
      },
      width: '100%'
    }, p.hasToggleIndicator && {
      paddingRight: v.toggleIndicatorSize
    }, p.multiple && p.hasItemsSelected && {
      paddingTop: pxToRem(1),
      paddingBottom: pxToRem(4)
    });
  },
  triggerButton: function triggerButton(_ref5) {
    var p = _ref5.props,
        v = _ref5.variables;
    return _extends({
      overflow: 'hidden',
      boxShadow: 'none',
      minHeight: pxToRem(32)
    }, transparentColorStyleObj$1, {
      margin: '0',
      justifyContent: 'left',
      padding: v.comboboxPaddingButton
    }, p.multiple && _extends({
      minWidth: 0,
      flex: 1
    }, p.hasItemsSelected && {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      height: '100%'
    }), transparentColorStyleObj$1, {
      ':focus': _extends({
        color: v.color
      }, transparentColorStyleObj$1),
      ':focus-visible': _extends({
        color: v.color
      }, transparentColorStyle$1, {
        ':after': {
          borderColor: 'transparent',
          borderRightWidth: 0
        },
        ':before': {
          borderColor: 'transparent',
          borderRightWidth: 0
        }
      }),
      ':active': _extends({
        color: v.color
      }, transparentColorStyle$1, {
        animationName: 'unset',
        animationDuration: 'unset'
      }),
      ':hover': _extends({}, transparentColorStyle$1, {
        color: v.color // required for HC theme

      })
    }, p.inline && {
      paddingLeft: 0,
      paddingRight: 0,
      width: 'initial'
    });
  },
  list: function list(_ref6) {
    var p = _ref6.props,
        v = _ref6.variables;
    return _extends({
      outline: 0,
      borderStyle: 'solid',
      borderWidth: p.open ? v.listBorderWidth : '0px',
      borderColor: v.listBorderColor,
      zIndex: v.overlayZIndex,
      maxHeight: v.listMaxHeight,
      overflowY: 'auto',
      width: getWidth$1(p, v),
      background: v.listBackgroundColor
    }, p.position === 'above' && {
      borderRadius: v.aboveListBorderRadius
    }, p.position === 'below' && {
      borderRadius: v.belowListBorderRadius
    }, p.open && {
      boxShadow: v.listBoxShadow,
      padding: v.listPadding
    });
  },
  loadingMessage: function loadingMessage(_ref7) {
    var v = _ref7.variables;
    return {
      backgroundColor: v.loadingMessageBackgroundColor
    };
  },
  noResultsMessage: function noResultsMessage(_ref8) {
    var v = _ref8.variables;
    return {
      backgroundColor: v.noResultsMessageBackgroundColor
    };
  },
  headerMessage: function headerMessage(_ref9) {
    var v = _ref9.variables;
    return {
      backgroundColor: v.headerMessageBackgroundColor
    };
  },
  toggleIndicator: function toggleIndicator(_ref10) {
    var p = _ref10.props,
        v = _ref10.variables;
    return _extends({
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignSelf: 'center',
      cursor: 'pointer'
    }, p.disabled && {
      cursor: 'default'
    }, {
      userSelect: 'none',
      margin: 0,
      position: 'absolute',
      right: pxToRem(8)
    }, p.multiple && p.hasItemsSelected && {
      top: pxToRem(8)
    }, {
      color: v.color
    }, p.disabled && {
      color: v.disabledColor
    });
  }
};

var dropdownSearchInputStyles$1 = {
  root: function root(_ref) {
    var v = _ref.variables;
    return {
      flexBasis: v.comboboxFlexBasis,
      flexGrow: 1
    };
  },
  input: function input(_ref2) {
    var p = _ref2.props;
    return _extends({
      width: '100%',
      backgroundColor: 'transparent',
      borderWidth: 0
    }, p.inline && {
      padding: 0,
      lineHeight: 'initial'
    });
  }
};

var dropdownSelectedItemStyles$1 = {
  root: function root(_ref) {
    var _hover;

    var p = _ref.props,
        v = _ref.variables,
        siteVariables = _ref.theme.siteVariables;
    var borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables
    });
    return _extends({
      maxWidth: v.selectedItemsMaxWidth,
      display: 'inline-flex',
      alignItems: 'center',
      padding: "0 " + pxToRem(8),
      startPaddingLeft: '0px',
      lineHeight: pxToRem(20),
      borderRadius: pxToRem(9999),
      fontSize: pxToRem(14)
    }, p.hasImage && {
      paddingLeft: '0px'
    }, {
      cursor: 'pointer',
      margin: '.25rem 0 0 .4rem',
      color: v.selectedItemColor,
      position: 'relative',
      border: v.selectedItemBorder,
      height: pxToRem(24),
      overflow: 'visible',
      outline: 0,
      fontWeight: siteVariables.fontWeightSemibold
    }, v.selectedItemBackgroundColor && {
      backgroundColor: v.selectedItemBackgroundColor
    }, {
      ':focus': {
        color: v.selectedItemColorFocus
      },
      ':hover': (_hover = {
        color: v.selectedItemColorHover,
        backgroundColor: v.selectedItemBackgroundColorHover
      }, _hover["& ." + dropdownSelectedItemSlotClassNames.icon] = {
        color: v.selectedItemIconColorHover
      }, _hover),
      ':focus-visible': {
        ':after': borderFocusStyles[':focus-visible'][':after']
      }
    });
  },
  image: function image() {
    return {
      height: pxToRem(20),
      width: pxToRem(20)
    };
  },
  header: function header(_ref2) {
    var p = _ref2.props;
        _ref2.variables;
    return _extends({}, p.hasImage && {
      marginLeft: pxToRem(3)
    }, {
      marginRight: pxToRem(3),
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    });
  },
  icon: function icon(_ref3) {
    var v = _ref3.variables;
    return _extends({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: pxToRem(16),
      minWidth: pxToRem(16),
      height: pxToRem(16),
      '& > :first-child': {
        width: pxToRem(16),
        height: pxToRem(16),
        '& svg': {
          width: pxToRem(16),
          height: pxToRem(16)
        }
      },
      cursor: 'pointer',
      color: v.selectedItemIconColor
    }, getIconFillOrOutlineStyles({
      outline: true
    }), {
      ':hover': _extends({
        color: v.selectedItemIconColorHover
      }, getIconFillOrOutlineStyles({
        outline: false
      }))
    });
  }
};

var checkableIndicatorUrl$1 = function checkableIndicatorUrl(color) {
  return "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' fill='" + encodeURIComponent(color) + "' focusable='false' view-box='8 8 16 16'%3E%3Cg%3E%3Cpath d='M23.5 11.875a.968.968 0 0 1-.289.711l-8.25 8.25c-.192.193-.43.289-.711.289s-.519-.096-.711-.289l-4.75-4.75a.965.965 0 0 1-.289-.711c0-.125.027-.25.082-.375s.129-.234.223-.328a.953.953 0 0 1 .695-.297c.135 0 .266.025.391.074.125.05.231.121.32.215l4.039 4.047 7.539-7.547a.886.886 0 0 1 .32-.215c.125-.049.255-.074.391-.074a1.004 1.004 0 0 1 .922.625.97.97 0 0 1 .078.375z' /%3E%3C/g%3E%3C/svg%3E\")";
};

//   hasContent?: boolean;
//   hasHeader?: boolean;
// };

var dropdownItemStyles$1 = {
  root: function root(_ref) {
    var _ref2, _ref3;

    var p = _ref.props,
        v = _ref.variables,
        siteVariables = _ref.theme.siteVariables;
    return _extends({
      display: 'flex',
      alignItems: 'center',
      minHeight: 0,
      padding: pxToRem(4) + " " + pxToRem(11),
      whiteSpace: 'nowrap',
      border: v.listItemFocusBorderWidth + " solid transparent",
      backgroundColor: v.listItemBackgroundColor
    }, p.selected && {
      fontWeight: v.listItemSelectedFontWeight,
      color: v.listItemSelectedColor
    }, {
      position: 'relative'
    }, p.active && _extends({}, p.isFromKeyboard && getBorderFocusStyles({
      variables: siteVariables,
      borderRadius: 0
    })[':focus-visible'], !p.isFromKeyboard && _extends({
      color: v.listItemColorHover,
      backgroundColor: v.listItemBackgroundColorHover
    }, p.hasHeader && (_ref2 = {}, _ref2["& ." + dropdownItemSlotClassNames.header] = {
      color: v.listItemColorHover
    }, _ref2), p.hasContent && (_ref3 = {}, _ref3["& ." + dropdownItemSlotClassNames.content] = {
      color: v.listItemColorHover
    }, _ref3))));
  },
  image: function image() {
    return {
      margin: pxToRem(3) + " " + pxToRem(12) + " " + pxToRem(3) + " " + pxToRem(4)
    };
  },
  header: function header(_ref4) {
    var p = _ref4.props,
        v = _ref4.variables;
    return _extends({
      flexGrow: 1,
      lineHeight: v.listItemHeaderLineHeight,
      fontSize: v.listItemHeaderFontSize,
      // if the item doesn't have content - i.e. it is header only - then it should use the content color
      color: v.listItemContentColor
    }, p.hasContent && {
      // if there is content it needs to be "tightened up" to the header
      marginBottom: pxToRem(-1),
      color: v.listItemHeaderColor
    }, p.selected && {
      fontWeight: v.listItemSelectedFontWeight,
      color: v.listItemSelectedColor
    }, {
      whiteSpace: 'normal'
    });
  },
  content: function content(_ref5) {
    var v = _ref5.variables;
    return {
      flexGrow: 1,
      lineHeight: v.listItemContentLineHeight,
      fontSize: v.listItemContentFontSize,
      color: v.listItemContentColor
    };
  },
  checkableIndicator: function checkableIndicator(_ref6) {
    var v = _ref6.variables;
    return {
      backgroundImage: checkableIndicatorUrl$1(v.listItemSelectedColor),
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'absolute',
      width: pxToRem(24),
      height: pxToRem(24),
      right: pxToRem(7),
      top: pxToRem(-3)
    };
  },
  endMedia: function endMedia() {
    return {
      flexShrink: 0,
      lineHeight: pxToRem(16)
    };
  },
  main: function main() {
    return {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      minWidth: 0 // needed for the truncate styles to work

    };
  }
};

var inputStyles$1 = {
  root: function root(_ref) {
    var p = _ref.props;
        _ref.variables;
    return _extends({
      flexDirection: 'column',
      justifyContent: 'center',
      display: 'inline-flex',
      position: 'relative',
      outline: 0,
      verticalAlign: 'middle'
    }, p.fluid && {
      width: '100%'
    }, p.labelPosition === 'inline' && {
      flexDirection: 'row',
      alignItems: 'center'
    });
  },
  input: function input(_ref2) {
    var p = _ref2.props,
        v = _ref2.variables;
    return _extends({
      backgroundColor: v.backgroundColor
    }, p.inverted && {
      backgroundColor: v.backgroundColorInverted
    }, {
      lineHeight: 'unset',
      color: v.fontColor,
      borderColor: v.borderColor,
      borderRadius: v.borderRadius,
      borderStyle: 'solid',
      borderWidth: v.borderWidth,
      outline: 'none',
      padding: v.inputPadding,
      position: 'relative'
    }, p.fluid && {
      width: '100%'
    }, p.inline && {
      "float": 'left'
    }, p.disabled && {
      color: v.colorDisabled,
      boxShadow: 'none'
    }, {
      '::placeholder': _extends({
        color: v.placeholderColor,
        opacity: 1
      }, p.disabled && {
        color: v.colorDisabled
      }),
      ':focus': _extends({}, !p.error && {
        borderColor: v.inputFocusBorderColor,
        borderRadius: v.inputFocusBorderRadius
      })
    }, !p.hasValue && {
      ':-webkit-autofill:focus': {
        '-webkit-text-fill-color': 'transparent'
      }
    }, p.clearable && {
      padding: v.inputPaddingWithIconAtEnd
    }, p.hasIcon && {
      padding: p.iconPosition === 'start' ? v.inputPaddingWithIconAtStart : v.inputPaddingWithIconAtEnd
    }, p.labelPosition === 'inside' && {
      paddingTop: v.inputInsideLabelPaddingTop
    }, p.error && {
      border: pxToRem(1) + " solid " + v.borderColorError
    }, {
      '::-ms-clear': {
        display: 'none'
      }
    });
  },
  icon: function icon(_ref3) {
    var p = _ref3.props,
        v = _ref3.variables;
    return _extends({
      color: v.iconColor,
      outline: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: v.iconPosition,
      top: 0,
      bottom: 0
    }, p.error && {
      color: v.colorError
    }, p.requiredAndSuccessful && {
      color: v.successfulColor
    }, p.disabled && {
      color: v.colorDisabled
    }, p.iconPosition === 'start' && {
      left: v.iconLeft
    }, p.iconPosition === 'end' && {
      right: v.iconRight
    }, p.clearable && p.hasValue && _extends({
      height: '100%',
      width: pxToRem(16),
      color: v.iconColor
    }, p.disabled && {
      color: v.colorDisabled
    }));
  },
  inputContainer: function inputContainer() {
    return {
      position: 'relative'
    };
  }
};

var inputLabelStyles$1 = {
  root: function root(_ref) {
    var p = _ref.props,
        v = _ref.variables;
    return _extends({
      display: 'block',
      transition: 'all .2s',
      lineHeight: v.lineHeight,
      marginBottom: v.marginBottom
    }, p.labelPosition === 'inside' && _extends({
      bottom: v.insideLabelBottom,
      top: 0,
      left: 0,
      margin: 0,
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      zIndex: 100,
      paddingLeft: v.insideLabelPaddingLeft
    }, p.hasValue && {
      transform: 'translateY(-16px)',
      fontSize: v.insideLabelActiveFontSize
    }), p.labelPosition === 'inline' && {
      paddingRight: v.inlineLabelPaddingRight
    }, p.required && {
      '::after': {
        content: '"*"'
      }
    });
  }
};

var radioGroupStyles$1 = {
  root: function root(_ref) {
    var p = _ref.props;
    return {
      display: 'flex',
      flexDirection: p.vertical ? 'column' : 'row'
    };
  }
};

var restHoverFocusTextColor$1 = function restHoverFocusTextColor(textColor) {
  return {
    color: textColor,
    ':hover': {
      color: textColor
    },
    ':focus': {
      color: textColor
    }
  };
};

var radioGroupItemStyles$1 = {
  root: function root(_ref) {
    var _hover;

    var p = _ref.props,
        v = _ref.variables,
        siteVariables = _ref.theme.siteVariables;
    return _extends({
      position: 'relative',
      alignItems: 'center',
      borderStyle: 'solid',
      borderWidth: "" + pxToRem(1),
      borderColor: 'transparent',
      borderRadius: siteVariables.borderRadiusMedium,
      color: v.textColorDefault,
      cursor: 'pointer',
      display: p.vertical ? 'flex' : 'inline-flex',
      fontSize: v.textFontSize,
      padding: v.padding,
      margin: v.margin,
      ':hover': (_hover = {
        color: v.textColorDefaultHoverFocus
      }, _hover["& ." + radioGroupItemSlotClassNames.indicator] = _extends({
        borderColor: v.textColorDefaultHoverFocus
      }, !p.disabled && !p.checked && {
        borderColor: v.indicatorBorderColorDefaultHover
      }), _hover),
      ':focus': {
        color: v.textColorDefaultHoverFocus
      }
    }, p.checked && _extends({}, restHoverFocusTextColor$1(v.textColorChecked)), p.disabled && _extends({}, restHoverFocusTextColor$1(v.colorDisabled)), getBorderFocusStyles({
      variables: siteVariables
    }));
  },
  indicator: function indicator(_ref2) {
    var p = _ref2.props,
        v = _ref2.variables;
    return _extends({
      margin: pxToRem(2) + " 0",
      outline: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: pxToRem(16),
      height: pxToRem(16),
      verticalAlign: 'midddle',
      color: v.indicatorColorDefault
    }, p.checked && {
      color: v.indicatorBackgroundColorChecked
    }, p.disabled && {
      color: v.colorDisabled
    });
  },
  label: function label() {
    return {
      margin: "0 0 0 " + pxToRem(12)
    };
  }
};

var textAreaStyles$1 = {
  root: function root(_ref) {
    var p = _ref.props,
        v = _ref.variables;
    return _extends({
      margin: v.margin,
      height: v.height,
      backgroundColor: v.backgroundColor
    }, p.inverted && {
      backgroundColor: v.invertedBackgroundColor
    }, {
      color: v.fontColor,
      borderColor: v.borderColor,
      borderRadius: v.borderRadius,
      borderStyle: 'solid',
      borderWidth: v.borderWidth,
      outline: 0,
      padding: v.padding,
      resize: p.resize || 'none'
    }, p.fluid && {
      width: '100%'
    }, p.disabled && {
      pointerEvents: 'none',
      color: v.disabledColor,
      boxShadow: 'none'
    }, p.error && {
      border: pxToRem(1) + " solid " + v.borderColorError
    }, {
      '::placeholder': _extends({
        color: v.placeholderColor,
        opacity: 1
      }, p.disabled && {
        color: v.disabledColor
      }),
      ':focus': {
        borderColor: v.borderColorFocus
      }
    });
  }
};

var componentStyles$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Attachment: attachmentStyles$1,
  AttachmentAction: attachmentActionStyles$1,
  AttachmentBody: attachmentBodyStyles$1,
  AttachmentDescription: attachmentDescriptionStyles$1,
  AttachmentHeader: attachmentHeaderStyles$1,
  AttachmentIcon: attachmentIconStyles$1,
  Avatar: avatarStyles$1,
  AvatarStatus: avatarStatusStyles$1,
  AvatarStatusIcon: avatarStatusIconStyles$1,
  AvatarImage: avatarImageStyles$1,
  AvatarIcon: avatarIconStyles$1,
  AvatarLabel: avatarLabelStyles$1,
  Button: buttonStyles$1,
  ButtonGroup: buttonGroupStyles$1,
  ButtonContent: buttonContentStyles$1,
  Chat: chatStyles$1,
  ChatItem: chatItemStyles$1,
  ChatMessage: chatMessageStyles$1,
  ChatMessageDetails: chatMessageDetailsStyles$1,
  ChatMessageReadStatus: chatMessageReadStatusStyles$1,
  Divider: dividerStyles$1,
  DividerContent: dividerContentStyles$1,
  Dropdown: dropdownStyles$1,
  DropdownSearchInput: dropdownSearchInputStyles$1,
  DropdownSelectedItem: dropdownSelectedItemStyles$1,
  DropdownItem: dropdownItemStyles$1,
  Input: inputStyles$1,
  InputLabel: inputLabelStyles$1,
  RadioGroup: radioGroupStyles$1,
  RadioGroupItem: radioGroupItemStyles$1,
  TextArea: textAreaStyles$1
});

//   padding: string;
//   iconSpace: string;
//   iconSize: string;
//   borderColor: string;
//   borderRadius: string;
//   backgroundColor: string;
//   backgroundColorHover: string;
//   textColor: string;
//   textColorHover: string;
//   boxShadow: string;
//   focusBackgroundColor: string;
//   focusColor: string;
//   progressColor: string;
//   progressHeight: string;
//   headerFontSize: string;
//   headerFontWeight: number;
//   headerLineHeight: number;
//   descriptionFontSize: string;
//   descriptionFontWeight: number;
//   descriptionLineHeight: number;
//   actionHeight: string;
//   actionMaxWidth: string;
//   actionColor: string;
//   actionPrimaryColor: string;
//   actionColorDisabled: string;
//   actionIconSize: string;
//   actionLoaderBorderSize: string;
//   actionLoaderSize: string;
//   actionLoaderSvgHeight: string;
//   actionLoaderSvgAnimationHeight: string;
//   actionFocusBorderRadius: string;
// };

var attachmentVariables$1 = function attachmentVariables(siteVariables) {
  return {
    padding: pxToRem(6) + " " + pxToRem(6) + " " + pxToRem(6) + " " + pxToRem(8),
    iconSpace: pxToRem(12),
    iconSize: pxToRem(32),
    borderColor: siteVariables.colors.grey[250],
    borderRadius: siteVariables.borderRadiusMedium,
    backgroundColor: siteVariables.colors.grey[100],
    backgroundColorHover: siteVariables.colorScheme["default"].backgroundHover1,
    textColor: siteVariables.colorScheme["default"].foreground,
    textColorHover: siteVariables.colorScheme["default"].foregroundHover,
    boxShadow: siteVariables.shadowLevel1,
    focusBackgroundColor: undefined,
    focusColor: undefined,
    progressColor: siteVariables.colorScheme.green.background,
    progressHeight: pxToRem(4),
    headerFontSize: siteVariables.fontSizes.medium,
    headerFontWeight: siteVariables.fontWeightSemibold,
    headerLineHeight: siteVariables.lineHeightMedium,
    descriptionFontSize: siteVariables.fontSizes.small,
    descriptionFontWeight: siteVariables.fontWeightRegular,
    descriptionLineHeight: siteVariables.lineHeightDefault,
    // action variables
    actionHeight: pxToRem(32),
    actionMaxWidth: pxToRem(280),
    actionColor: siteVariables.colorScheme["default"].foreground,
    actionPrimaryColor: siteVariables.colorScheme.brand.foreground,
    actionColorDisabled: siteVariables.colorScheme.brand.foregroundDisabled1,
    actionIconSize: pxToRem(16),
    actionLoaderBorderSize: pxToRem(2),
    actionLoaderSize: pxToRem(20),
    actionLoaderSvgHeight: pxToRem(1220),
    actionLoaderSvgAnimationHeight: pxToRem(-1200),
    actionFocusBorderRadius: siteVariables.borderRadiusMedium
  };
};

stringLiteralsArray('foreground', 'background'); // export type LabelColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof labelColorAreas>>;
// export interface AvatarVariables {
//   avatarBorderColor: string;
//   avatarBorderWidth: string;
//   squareAvatarBorderRadius: string;
//   iconColor: string;
//   iconBackgroundColor: string;
//   // Status
//   statusBorderColor: string;
//   statusBorderWidth: string;
//   statusIconSize: string;
//   statusSuccessBackgroundColor: string;
//   statusSuccessColor: string;
//   statusInfoBackgroundColor: string;
//   statusInfoColor: string;
//   statusWarningBackgroundColor: string;
//   statusWarningColor: string;
//   statusErrorBackgroundColor: string;
//   statusErrorColor: string;
//   statusBackgroundColor: string;
//   statusColor: string;
//   // Image
//   imageWidth: string;
//   imageHeight: string;
//   imageAvatarRadius: string;
//   imageAvatarSize: string;
//   imageCircularRadius: string;
//   // Label
//   labelCircularRadius: string;
//   labelColor: string;
//   labelBackground: string;
// }

var avatarVariables$1 = function avatarVariables(siteVariables) {
  return {
    avatarBorderColor: '',
    avatarBorderWidth: '0',
    squareAvatarBorderRadius: siteVariables.borderRadiusMedium,
    iconColor: siteVariables.colors.white,
    iconBackgroundColor: siteVariables.colors.brand[600],
    statusBorderWidth: '2px',
    statusIconSize: pxToRem(7),
    statusBorderColor: siteVariables.bodyBackground,
    statusSuccessBackgroundColor: siteVariables.colorScheme.green.background,
    statusSuccessColor: siteVariables.colorScheme.green.foreground1,
    statusInfoBackgroundColor: siteVariables.colorScheme.brand.background,
    statusInfoColor: siteVariables.colorScheme["default"].foreground2,
    statusWarningBackgroundColor: siteVariables.colorScheme.yellow.background,
    statusWarningColor: siteVariables.colorScheme.yellow.foreground2,
    statusErrorBackgroundColor: siteVariables.colorScheme.red.background,
    statusErrorColor: siteVariables.colorScheme.red.foreground2,
    statusBackgroundColor: siteVariables.colorScheme["default"].background5,
    statusColor: siteVariables.colorScheme["default"].foreground4,
    imageWidth: undefined,
    imageHeight: undefined,
    imageAvatarRadius: pxToRem(9999),
    imageAvatarSize: pxToRem(32),
    imageCircularRadius: pxToRem(9999),
    labelCircularRadius: pxToRem(9999),
    labelColor: 'rgba(0, 0, 0, 0.6)',
    labelBackground: 'rgb(232, 232, 232)'
  };
};

//   padding: string;
//   height: string;
//   minWidth: string;
//   loadingMinWidth: string;
//   maxWidth: string;
//   borderRadius: string;
//   contentFontWeight: FontWeightProperty;
//   contentFontSize: string;
//   contentLineHeight: string;
//   color: string;
//   colorHover: string;
//   colorActive: string;
//   colorDisabled: string;
//   colorFocus: string;
//   backgroundColor: string;
//   backgroundColorActive: string;
//   backgroundColorHover: string;
//   backgroundColorIconOnlyHover: string;
//   backgroundColorDisabled: string;
//   borderColor: string;
//   borderColorHover: string;
//   borderColorActive: string;
//   borderColorDisabled: string;
//   borderColorFocus: string;
//   backgroundColorFocus: string;
//   iconSize: string;
//   primaryColor: string;
//   primaryColorHover: string;
//   primaryBackgroundColor: string;
//   primaryBackgroundColorActive: string;
//   primaryBackgroundColorHover: string;
//   primaryBackgroundColorFocus: string;
//   primaryBackgroundColorDisabled: string;
//   primaryBorderColor: string;
//   tintedColor: string;
//   tintedColorHover: string;
//   tintedBackgroundColor: string;
//   tintedBackgroundColorActive: string;
//   tintedBackgroundColorHover: string;
//   tintedBorderColor: string;
//   tintedBorderColorHover: string;
//   circularBorderRadius: string;
//   textColor: string;
//   textColorHover: string;
//   textPrimaryColor: string;
//   textPrimaryColorHover: string;
//   textColorDisabled: string;
//   textColorIconOnlyHover: string;
//   primaryBoxShadow: string;
//   boxShadow: string;
//   loaderBorderSize: string;
//   loaderSize: string;
//   loaderSvgHeight: string;
//   loaderSvgAnimationHeight: string;
//   sizeSmallContentFontSize: string;
//   sizeSmallContentLineHeight: string;
//   sizeSmallHeight: string;
//   sizeSmallMinWidth: string;
//   sizeSmallPadding: string;
//   sizeSmallLoaderBorderSize: string;
//   sizeSmallLoaderSize: string;
//   sizeSmallLoaderSvgHeight: string;
//   sizeSmallLoaderSvgAnimationHeight: string;
// }

var buttonVariables$1 = function buttonVariables(siteVars) {
  return {
    padding: "0 " + pxToRem(20),
    height: pxToRem(32),
    minWidth: pxToRem(96),
    loadingMinWidth: pxToRem(118),
    maxWidth: pxToRem(280),
    borderRadius: pxToRem(2),
    contentFontSize: siteVars.fontSizes.medium,
    contentLineHeight: siteVars.lineHeightMedium,
    color: siteVars.colorScheme["default"].foreground,
    colorHover: siteVars.colorScheme["default"].foregroundHover,
    colorActive: siteVars.colorScheme["default"].foregroundPressed,
    colorDisabled: siteVars.colorScheme.brand.foregroundDisabled,
    colorFocus: undefined,
    iconSize: pxToRem(16),
    backgroundColor: siteVars.colorScheme["default"].background,
    backgroundColorActive: siteVars.colorScheme["default"].backgroundPressed,
    backgroundColorHover: siteVars.colorScheme["default"].backgroundHover1,
    backgroundColorFocus: undefined,
    backgroundColorDisabled: siteVars.colorScheme["default"].backgroundDisabled,
    borderColor: siteVars.colorScheme["default"].border,
    borderColorHover: siteVars.colorScheme["default"].borderHover,
    borderColorFocus: undefined,
    borderColorActive: siteVars.colorScheme["default"].borderPressed,
    borderColorDisabled: 'transparent',
    backgroundColorIconOnlyHover: siteVars.colorScheme["default"].backgroundHover2,
    primaryColor: siteVars.colorScheme.brand.foreground4,
    primaryColorHover: siteVars.colorScheme.brand.foreground4,
    primaryBackgroundColor: siteVars.colorScheme.brand.background,
    primaryBackgroundColorActive: siteVars.colorScheme.brand.backgroundPressed,
    primaryBackgroundColorHover: siteVars.colorScheme.brand.backgroundHover,
    primaryBackgroundColorDisabled: siteVars.colorScheme["default"].backgroundDisabled,
    primaryBackgroundColorFocus: undefined,
    primaryBorderColor: 'transparent',
    tintedColor: siteVars.colorScheme.brand.foreground,
    tintedColorHover: siteVars.colorScheme.brand.foreground,
    tintedBackgroundColor: siteVars.colorScheme["default"].background,
    tintedBackgroundColorActive: siteVars.colorScheme.brand.backgroundHover1,
    tintedBackgroundColorHover: siteVars.colorScheme.brand.backgroundHover1,
    tintedBorderColor: siteVars.colorScheme.brand.border1,
    tintedBorderColorHover: siteVars.colorScheme.brand.borderHover,
    circularBorderRadius: pxToRem(999),
    textColor: siteVars.colorScheme["default"].foreground1,
    textColorHover: siteVars.colorScheme.brand.foreground1,
    textPrimaryColor: siteVars.colorScheme.brand.foreground,
    textPrimaryColorHover: siteVars.colorScheme.brand.foreground1,
    textColorDisabled: siteVars.colorScheme.brand.foregroundDisabled1,
    textColorIconOnlyHover: siteVars.colorScheme.brand.foregroundHover,
    primaryBoxShadow: siteVars.shadowLevel1Dark,
    boxShadow: siteVars.shadowLevel1,
    loaderBorderSize: pxToRem(2),
    loaderSize: pxToRem(20),
    loaderSvgHeight: pxToRem(1220),
    loaderSvgAnimationHeight: pxToRem(-1200),
    sizeSmallContentFontSize: siteVars.fontSizes.small,
    sizeSmallContentLineHeight: siteVars.lineHeightSmall,
    sizeSmallHeight: pxToRem(24),
    sizeSmallMinWidth: pxToRem(72),
    sizeSmallPadding: "0 " + pxToRem(8),
    sizeSmallLoaderBorderSize: pxToRem(2),
    sizeSmallLoaderSize: pxToRem(15),
    sizeSmallLoaderSvgHeight: pxToRem(895),
    sizeSmallLoaderSvgAnimationHeight: pxToRem(-880)
  };
};

// export interface ChatVariables {
//   backgroundColor: string;
// }
var chatVariables$1 = function chatVariables(_ref) {
  var colors = _ref.colors;
  return {
    backgroundColor: colors.white
  };
};

//   margin: string;
//   gutterMargin: string;
//   messageMargin: string;
// }

var chatItemVariables$1 = function chatItemVariables() {
  return {
    gutterMargin: pxToRem(4),
    margin: pxToRem(8),
    messageMargin: pxToRem(40)
  };
};

//   actionMenuBoxShadow: string;
//   actionMenuPositionRight: string;
//   actionMenuPositionTop: string;
//   backgroundColor: string;
//   backgroundColorMine: string;
//   borderRadius: string;
//   color: string;
//   offset: string;
//   padding: string;
//   authorMarginRight: string;
//   authorColor: string;
//   authorFontWeight: number;
//   headerMarginBottom: string;
//   contentColor: string;
//   linkColor: string;
//   linkColorMine: string;
//   border: string;
//   badgeShadow: string;
//   isImportant: boolean;
//   hasMention: boolean;
//   hasMentionColor: string;
//   hasMentionNubbinColor: string;
//   isImportantColor: string;
//   badgeTextColor: string;
//   reactionGroupMarginLeft: string;
//   reactionGroupBorderColor: string;
//   showActionMenu?: boolean;
//   timestampColorMine: string;
//   zIndex: number;
//   overlayZIndex: number;
// }

var chatMessageVariables$1 = function chatMessageVariables(_ref) {
  _ref.borderRadiusMedium;
      var colors = _ref.colors,
      colorScheme = _ref.colorScheme,
      fontWeightSemibold = _ref.fontWeightSemibold,
      shadowLevel1 = _ref.shadowLevel1,
      shadowLevel1Dark = _ref.shadowLevel1Dark,
      zIndexes = _ref.zIndexes;
  return {
    actionMenuBoxShadow: shadowLevel1,
    actionMenuPositionRight: pxToRem(5),
    actionMenuPositionTop: pxToRem(-30),
    authorColor: colorScheme["default"].foreground,
    authorFontWeight: fontWeightSemibold,
    authorMarginRight: pxToRem(12),
    backgroundColor: colors.grey[150],
    backgroundColorMine: "var(--brand-color, " + colors.brand[200] + ")",
    badgeShadow: shadowLevel1Dark,
    badgeTextColor: colors.white,
    border: 'none',
    borderRadius: pxToRem(8),
    color: 'rgb(64, 64, 64)',
    contentColor: colors.grey[750],
    contentColorMine: "var(--brand-text-color, " + colors.grey[750] + ")",
    hasMention: false,
    hasMentionColor: colors.orange[300],
    hasMentionNubbinColor: colors.orange[400],
    headerMarginBottom: pxToRem(2),
    isImportant: false,
    isImportantColor: colors.red[400],
    linkColor: colorScheme.brand.foreground1,
    linkColorMine: colorScheme.brand.foreground2,
    offset: pxToRem(-42),
    overlayZIndex: zIndexes.overlay,
    padding: pxToRem(12),
    reactionGroupBorderColor: 'transparent',
    reactionGroupMarginLeft: pxToRem(12),
    showActionMenu: undefined,
    timestampColorMine: "var(--brand-text-color, " + colorScheme["default"].foreground1 + ")",
    zIndex: zIndexes.foreground
  };
};

//   detailsColor: string;
//   detailsHoverColor: string;
//   detailsColorMine: string;
//   detailsHoverColorMine: string;
//   detailsFontSize: string;
//   detailsMargin: string;
// }

var chatMessageDetailsVariables$1 = function chatMessageDetailsVariables(_ref) {
  var colors = _ref.colors,
      fontSizes = _ref.fontSizes;
  return {
    detailsColor: colors.grey[350],
    detailsColorMine: colors.grey[500],
    detailsFontSize: fontSizes.small,
    detailsHoverColor: colors.grey[500],
    detailsHoverColorMine: colors.grey[500],
    detailsMargin: pxToRem(12)
  };
};

//   rightPoistion?: string;
//   bottomPoistion?: string;
// }

var chatMessageReadStatusVariables$1 = function chatMessageReadStatusVariables() {
  return {
    bottomPoistion: pxToRem(0),
    rightPoistion: pxToRem(-24)
  };
};

var dividerColorAreas$1 = stringLiteralsArray('foreground'); // export type DividerColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof dividerColorAreas>>;
// export interface DividerVariables {
//   colorScheme: DividerColorSchemeMapping;
//   dividerColor: string;
//   textColor: string;
//   textFontSize: string;
//   textLineHeight: string;
//   importantFontWeight: FontWeightProperty;
//   dividerPadding: string;
// }

var dividerVariables$1 = function dividerVariables(siteVars) {
  return {
    colorScheme: pickValuesFromColorScheme(siteVars.colorScheme, dividerColorAreas$1),
    dividerColor: siteVars.colors.grey[150],
    textColor: siteVars.colors.grey[450],
    textFontSize: siteVars.fontSizeSmall,
    textLineHeight: siteVars.lineHeightSmall,
    importantFontWeight: siteVars.fontWeightBold,
    dividerPadding: pxToRem(4)
  };
};

//   backgroundColor: string;
//   backgroundColorHover: string;
//   invertedBackgroundColor: string;
//   invertedBackgroundColorHover: string;
//   borderColor: string;
//   borderColorHover: string;
//   borderColorFocus: string;
//   borderError: string;
//   borderWidth: string;
//   openBorderColorHover: string;
//   containerBorderRadius: string;
//   disabledColor: string;
//   openAboveContainerBorderRadius: string;
//   openBelowContainerBorderRadius: string;
//   searchBorderBottomWidth: string;
//   color: string;
//   comboboxPaddingButton: string;
//   comboboxFlexBasis: string;
//   aboveListBorderRadius: string;
//   belowListBorderRadius: string;
//   listBackgroundColor: string;
//   listBorderColor: string;
//   listBorderWidth: string;
//   listPadding: string;
//   listBoxShadow: string;
//   listMaxHeight: string;
//   listItemFocusBorderWidth: string;
//   listItemBackgroundColor: string;
//   listItemBackgroundColorActive: string;
//   listItemBackgroundColorHover: string;
//   listItemColorActive: string;
//   listItemColorHover: string;
//   listItemSelectedColor: string;
//   listItemSelectedFontWeight: number;
//   listItemHeaderLineHeight: string;
//   listItemContentLineHeight: string;
//   selectedItemBackgroundColor: string;
//   selectedItemBackgroundColorHover: string;
//   selectedItemBorder: string;
//   selectedItemColor: string;
//   selectedItemColorHover: string;
//   selectedItemIconColor: string;
//   selectedItemIconColorHover: string;
//   selectedItemColorFocus: string;
//   selectedItemsMaxHeight: string;
//   selectedItemsMaxWidth: string;
//   toggleIndicatorSize: string;
//   triggerButtonColorFocusActive: string;
//   triggerButtonColorHover: string;
//   width: string;
//   overlayZIndex: number;
//   disabledBorderColorHover: string;
//   disabledTriggerColorHover: string;
//   disabledBackgroundColorHover: string;
//   listItemHeaderFontSize: string;
//   listItemHeaderColor: string;
//   listItemContentFontSize: string;
//   listItemContentColor: string;
//   headerMessageBackgroundColor: string;
//   noResultsMessageBackgroundColor: string;
//   loadingMessageBackgroundColor: string;
// }

var dropdownVariables$1 = function dropdownVariables(siteVars) {
  return {
    backgroundColor: siteVars.colorScheme["default"].background2,
    backgroundColorHover: siteVars.colorScheme["default"].backgroundHover3,
    invertedBackgroundColor: siteVars.colorScheme["default"].background,
    invertedBackgroundColorHover: siteVars.colorScheme["default"].backgroundHover4,
    borderColor: 'transparent',
    borderColorHover: 'transparent',
    borderColorFocus: siteVars.colorScheme.brand.borderFocus1,
    borderError: siteVars.colorScheme.red.background,
    borderWidth: '0px',
    openBorderColorHover: undefined,
    containerBorderRadius: siteVars.borderRadiusMedium,
    disabledColor: siteVars.colorScheme["default"].foregroundDisabled,
    openAboveContainerBorderRadius: "0 0 " + siteVars.borderRadiusMedium + " " + siteVars.borderRadiusMedium,
    openBelowContainerBorderRadius: siteVars.borderRadiusMedium + " " + siteVars.borderRadiusMedium + " 0 0",
    searchBorderBottomWidth: pxToRem(2),
    color: siteVars.colorScheme["default"].foreground1,
    comboboxPaddingButton: "0 " + pxToRem(12),
    comboboxFlexBasis: pxToRem(50),
    aboveListBorderRadius: siteVars.borderRadiusMedium + " " + siteVars.borderRadiusMedium + " 0 0",
    belowListBorderRadius: "0 0 " + siteVars.borderRadiusMedium + " " + siteVars.borderRadiusMedium,
    listBackgroundColor: siteVars.colorScheme["default"].background,
    listBorderColor: 'transparent',
    listBorderWidth: '0px',
    listPadding: pxToRem(8) + " 0 " + pxToRem(6),
    listBoxShadow: siteVars.shadowLevel3,
    listMaxHeight: pxToRem(296),
    listItemFocusBorderWidth: pxToRem(1),
    listItemBackgroundColor: 'transparent',
    listItemBackgroundColorActive: siteVars.colorScheme["default"].backgroundActive,
    listItemBackgroundColorHover: siteVars.colorScheme["default"].backgroundHover,
    listItemColorActive: siteVars.colorScheme["default"].backgroundFocus3,
    listItemColorHover: siteVars.colorScheme["default"].foregroundHover,
    listItemSelectedColor: siteVars.colorScheme["default"].foreground,
    listItemSelectedFontWeight: siteVars.fontWeightSemibold,
    // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
    listItemHeaderLineHeight: siteVars.lineHeightSmall,
    listItemContentLineHeight: siteVars.lineHeightSmall,
    selectedItemBackgroundColor: siteVars.colorScheme["default"].background,
    selectedItemBackgroundColorHover: siteVars.colorScheme.brand.backgroundHover2,
    selectedItemBorder: 'none',
    selectedItemColor: siteVars.colorScheme["default"].foreground,
    selectedItemColorHover: siteVars.colorScheme["default"].foregroundHover,
    selectedItemIconColor: siteVars.colorScheme["default"].foreground1,
    selectedItemIconColorHover: siteVars.colorScheme.brand.foregroundHover,
    selectedItemsMaxWidth: pxToRem(140),
    selectedItemColorFocus: siteVars.bodyColor,
    selectedItemsMaxHeight: pxToRem(82),
    toggleIndicatorSize: pxToRem(32),
    triggerButtonColorFocusActive: undefined,
    triggerButtonColorHover: siteVars.bodyColor,
    width: pxToRem(356),
    overlayZIndex: siteVars.zIndexes.overlay,
    // disabled state
    disabledBorderColorHover: 'transparent',
    disabledTriggerColorHover: siteVars.colorScheme.brand.foregroundDisabled,
    disabledBackgroundColorHover: siteVars.colorScheme.brand.backgroundDisabled,
    // these should only apply when there is content in the image/media slot:
    listItemHeaderFontSize: siteVars.fontSizes.medium,
    listItemHeaderColor: siteVars.colorScheme["default"].foreground1,
    listItemContentFontSize: siteVars.fontSizes.small,
    listItemContentColor: siteVars.colorScheme["default"].foreground2,
    headerMessageBackgroundColor: siteVars.colors.white,
    noResultsMessageBackgroundColor: 'transparent',
    loadingMessageBackgroundColor: 'transparent'
  };
};

//   backgroundColor: string;
//   backgroundColorInverted: string;
//   borderColor: string;
//   borderRadius: string;
//   borderWidth: string;
//   colorDisabled: string;
//   fontColor: string;
//   fontSize: string;
//   iconColor: string;
//   iconPosition: string;
//   iconRight: string;
//   iconLeft: string;
//   inputPaddingWithIconAtStart: string;
//   inputPaddingWithIconAtEnd: string;
//   inputPadding: string;
//   inputFocusBorderColor: string;
//   inputFocusBorderRadius: string;
//   inputInsideLabelPaddingTop: string;
//   placeholderColor: string;
//   successfulColor: string;
//   borderColorError: string;
//   colorError: string;
// }

var inputVariables$1 = function inputVariables(siteVars) {
  return {
    colorDisabled: siteVars.colorScheme.brand.foregroundDisabled,
    colorError: siteVars.colorScheme.red.foreground,
    borderColorError: siteVars.colorScheme.red.background,
    iconPosition: 'absolute',
    iconRight: pxToRem(10),
    iconLeft: pxToRem(9),
    inputPaddingWithIconAtStart: pxToRem(5) + " " + pxToRem(12) + " " + pxToRem(5) + " " + pxToRem(34),
    inputPaddingWithIconAtEnd: pxToRem(5) + " " + pxToRem(35) + " " + pxToRem(5) + " " + pxToRem(12),
    inputPadding: pxToRem(5) + " " + pxToRem(12),
    inputInsideLabelPaddingTop: pxToRem(14),
    borderColor: 'transparent',
    borderRadius: siteVars.borderRadiusMedium,
    borderWidth: "0 0 " + pxToRem(2) + " 0",
    backgroundColor: siteVars.colorScheme["default"].background2,
    backgroundColorInverted: siteVars.colorScheme["default"].background,
    fontColor: siteVars.colorScheme["default"].foreground,
    fontSize: siteVars.fontSizes.medium,
    iconColor: siteVars.colorScheme["default"].foreground,
    successfulColor: siteVars.colorScheme.green.foreground,
    inputFocusBorderColor: "transparent transparent " + siteVars.colorScheme.brand.borderFocus1 + " transparent",
    inputFocusBorderRadius: siteVars.borderRadiusMedium + " " + siteVars.borderRadiusMedium + " " + siteVars.borderRadiusSmall + " " + siteVars.borderRadiusSmall,
    placeholderColor: siteVars.colorScheme["default"].foreground1
  };
};

//   insideLabelBottom: string;
//   insideLabelPaddingLeft: string;
//   insideLabelActiveFontSize: string;
//   inlineLabelPaddingRight: string;
//   lineHeight: string;
//   marginBottom: string;
// }

var inputLabelVariables$1 = function inputLabelVariables(siteVars) {
  return {
    insideLabelBottom: pxToRem(-8),
    insideLabelPaddingLeft: pxToRem(12),
    insideLabelActiveFontSize: pxToRem(12),
    inlineLabelPaddingRight: pxToRem(10),
    lineHeight: pxToRem(16),
    marginBottom: pxToRem(4)
  };
};

//   colorDisabled: string,
//   textFontSize: string,
//   textColorDefault: string,
//   textColorDefaultHoverFocus: string,
//   textColorChecked: string,
//   indicatorColorDefault: string,
//   indicatorBorderColorDefaultHover: string,
//   indicatorBorderColorChecked: string,
//   indicatorBackgroundColorChecked: string,
//   padding: string,
//   margin: string,
// };

var radioGroupItemVariables$1 = function radioGroupItemVariables(siteVars) {
  return {
    colorDisabled: siteVars.colors.grey[250],
    textFontSize: siteVars.fontSizes.medium,
    textColorDefault: siteVars.colors.grey[500],
    textColorDefaultHoverFocus: siteVars.colors.grey[750],
    textColorChecked: siteVars.colors.grey[750],
    indicatorColorDefault: siteVars.colors.grey[500],
    indicatorBorderColorDefaultHover: siteVars.colors.grey[750],
    indicatorBorderColorChecked: siteVars.colors.brand[600],
    indicatorBackgroundColorChecked: siteVars.colors.brand[600],
    padding: "0 " + pxToRem(2),
    margin: pxToRem(5) + " " + pxToRem(8) + " " + pxToRem(5) + " " + pxToRem(2)
  };
};

//   backgroundColor: string;
//   invertedBackgroundColor: string;
//   disabledColor: string;
//   borderColor: string;
//   borderRadius: string;
//   borderWidth: string;
//   fontColor: string;
//   fontSize: string;
//   borderColorFocus: string;
//   placeholderColor: string;
//   margin: string;
//   padding: string;
//   height: string;
//   borderColorError: string;
// }

var textAreaVariables$1 = function textAreaVariables(siteVars) {
  return {
    margin: '0',
    padding: pxToRem(7) + " " + pxToRem(12),
    borderColor: 'transparent',
    borderRadius: siteVars.borderRadiusMedium + " " + siteVars.borderRadiusMedium + " " + siteVars.borderRadiusSmall + " " + siteVars.borderRadiusSmall,
    borderWidth: "0 0 " + pxToRem(2) + " 0",
    backgroundColor: siteVars.colorScheme["default"].background2,
    invertedBackgroundColor: siteVars.colorScheme["default"].background,
    placeholderColor: siteVars.colorScheme["default"].foreground1,
    disabledColor: siteVars.colorScheme.brand.foregroundDisabled,
    fontColor: siteVars.colorScheme["default"].foreground,
    fontSize: siteVars.fontSizes.medium,
    borderColorFocus: "transparent transparent " + siteVars.colorScheme.brand.borderFocus1 + " transparent",
    height: 'auto',
    borderColorError: siteVars.colorScheme.red.background
  };
};

var componentVariables$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Attachment: attachmentVariables$1,
  AttachmentAction: attachmentVariables$1,
  AttachmentBody: attachmentVariables$1,
  AttachmentDescription: attachmentVariables$1,
  AttachmentHeader: attachmentVariables$1,
  AttachmentIcon: attachmentVariables$1,
  Avatar: avatarVariables$1,
  AvatarStatus: avatarVariables$1,
  AvatarStatusIcon: avatarVariables$1,
  AvatarImage: avatarVariables$1,
  AvatarIcon: avatarVariables$1,
  AvatarLabel: avatarVariables$1,
  Button: buttonVariables$1,
  ButtonGroup: buttonVariables$1,
  ButtonContent: buttonVariables$1,
  Chat: chatVariables$1,
  ChatItem: chatItemVariables$1,
  ChatMessage: chatMessageVariables$1,
  ChatMessageDetails: chatMessageDetailsVariables$1,
  ChatMessageReadStatus: chatMessageReadStatusVariables$1,
  Divider: dividerVariables$1,
  Dropdown: dropdownVariables$1,
  DropdownItem: dropdownVariables$1,
  DropdownSearchInput: dropdownVariables$1,
  DropdownSelectedItem: dropdownVariables$1,
  Input: inputVariables$1,
  InputLabel: inputLabelVariables$1,
  RadioGroupItem: radioGroupItemVariables$1,
  TextArea: textAreaVariables$1
});

var COPY_COMPONENTS$1 = ['Flex', 'Image', 'Text', 'Card', 'Layout', 'List']; // Temporarily merging

var mergedComponentStyles$1 = _extends({}, Object.fromEntries(COPY_COMPONENTS$1.map(function (component) {
  return [component, teamsTheme.componentStyles[component]];
})), componentStyles$1); // console.log(mergedComponentStyles);


var mergedComponentVariables$1 = _extends({}, Object.fromEntries(COPY_COMPONENTS$1.map(function (component) {
  return [component, teamsTheme.componentVariables[component]];
})), componentVariables$1); // console.log(mergedComponentVariables);


var barista$1 = createTheme({
  componentStyles: mergedComponentStyles$1,
  componentVariables: mergedComponentVariables$1,
  fontFaces: fontFaces,
  siteVariables: siteVariables$1
}, 'barista');

var siteVariables = _extends({}, teamsTheme.siteVariables, {
  bodyFontFamily: 'Slack-Lato,appleLogo,sans-serif',
  bodyFontSize: pxToRem(15)
});

var attachmentStyles = {
  root: function root(_ref) {
    var _extends2, _hover;

    var p = _ref.props,
        v = _ref.variables,
        siteVariables = _ref.theme.siteVariables;
    var borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      borderRadius: v.borderRadius
    });
    return _extends({
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      width: '100%',
      maxWidth: pxToRem(440),
      minHeight: pxToRem(48),
      padding: v.padding,
      marginBottom: pxToRem(2),
      marginRight: pxToRem(2),
      background: v.backgroundColor,
      color: v.textColor,
      // boxShadow: v.boxShadow,
      border: pxToRem(2) + " solid " + v.borderColor,
      borderRadius: v.borderRadius
    }, borderFocusStyles, {
      '& .ui-attachment__progress': {
        transition: 'width 0.2s',
        position: 'absolute',
        display: 'block',
        bottom: 0,
        left: 0,
        maxWidth: '100%',
        height: v.progressHeight,
        background: v.progressColor
      }
    }, p.actionable && {
      cursor: 'pointer',
      ':focus-visible': _extends({}, borderFocusStyles[':focus-visible'], (_extends2 = {
        backgroundColor: v.focusBackgroundColor,
        color: v.focusColor
      }, _extends2["& ." + attachmentActionClassName] = {
        color: v.focusColor
      }, _extends2["& ." + svgIconClassName] = {
        color: v.focusColor
      }, _extends2)),
      ':hover': (_hover = {
        backgroundColor: v.backgroundColorHover,
        color: v.textColorHover
      }, _hover["& ." + attachmentActionClassName] = {
        color: v.textColorHover
      }, _hover["& ." + svgIconClassName] = {
        color: v.textColorHover
      }, _hover)
    });
  }
};

var attachmentActionStyles = {
  root: function root(_ref) {
    var p = _ref.props,
        v = _ref.variables,
        theme = _ref.theme;
    var siteVariables = theme.siteVariables;
    var iconFilledStyles = getIconFillOrOutlineStyles({
      outline: false
    });
    var borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      borderRadius: v.actionFocusBorderRadius
    });
    return _extends({
      height: v.actionHeight,
      maxWidth: v.actionMaxWidth,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      verticalAlign: 'middle',
      cursor: 'pointer',
      // text button defaults
      color: v.actionColor,
      // textColor
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      padding: 0
    }, getIconFillOrOutlineStyles({
      outline: true
    }), {
      ':focus': _extends({
        boxShadow: 'none'
      }, borderFocusStyles[':focus']),
      ':focus-visible': _extends({}, iconFilledStyles, borderFocusStyles[':focus-visible'])
    }, p.primary && {
      color: v.actionPrimaryColor
    }, p.disabled && {
      cursor: 'default',
      boxShadow: 'none',
      pointerEvents: 'none',
      color: v.actionColorDisabled,
      backgroundColor: 'transparent',
      ':hover': {
        color: v.actionColorDisabled
      }
    }, {
      minWidth: v.actionHeight,
      ':hover': _extends({}, getIconFillOrOutlineStyles({
        outline: false
      }))
    });
  },
  icon: function icon(_ref2) {
    var p = _ref2.props,
        v = _ref2.variables;
    return _extends({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: v.actionIconSize,
      height: v.actionIconSize
    }, p.loading && {
      margin: 0,
      opacity: 0,
      width: 0
    }, p.hasContent && _extends({
      margin: "0 " + pxToRem(10) + " 0 0"
    }, p.iconPosition === 'after' && {
      margin: "0 0 0 " + pxToRem(10)
    }));
  },
  loader: function loader(_ref3) {
    var _extends2;

    var p = _ref3.props,
        v = _ref3.variables;
    return _extends((_extends2 = {}, _extends2["& ." + loaderSlotClassNames.indicator] = {
      width: v.actionLoaderSize,
      height: v.actionLoaderSize
    }, _extends2["& ." + loaderSlotClassNames.svg] = {
      ':before': {
        animationName: {
          to: {
            transform: "translate3d(0, " + v.actionLoaderSvgAnimationHeight + ", 0)"
          }
        },
        borderWidth: v.actionLoaderBorderSize,
        width: v.actionLoaderSize,
        height: v.actionLoaderSvgHeight
      }
    }, _extends2), p.hasContent && {
      marginRight: pxToRem(4)
    });
  }
};

var attachmentBodyStyles = {
  root: function root() {
    return {
      flex: 1
    };
  }
};

var attachmentDescriptionStyles = {
  root: function root(_ref) {
    var v = _ref.variables;
    return {
      display: 'block',
      fontSize: v.descriptionFontSize,
      fontWeight: v.descriptionFontWeight,
      lineHeight: v.descriptionLineHeight
    };
  }
};

var attachmentHeaderStyles = {
  root: function root(_ref) {
    var v = _ref.variables;
    return {
      display: 'block',
      fontSize: v.headerFontSize,
      fontWeight: v.headerFontWeight,
      lineHeight: v.headerLineHeight
    };
  }
};

var attachmentIconStyles = {
  root: function root(_ref) {
    var _ref2;

    var v = _ref.variables;
    return _ref2 = {
      height: v.iconSize,
      width: v.iconSize,
      marginRight: v.iconSpace
    }, _ref2["& ." + svgIconClassName] = {
      height: '100%',
      width: '100%',
      '& svg': {
        height: '100%',
        width: '100%'
      }
    }, _ref2;
  }
};

// import { pxToRem } from '../../../utils';
// const sizeToPxValue = {
//   smallest: 20,
//   smaller: 24,
//   small: 28,
//   medium: 32,
//   large: 44,
//   larger: 64,
//   largest: 96,
// };
var avatarStyles = {
  root: function root(_ref) {
    _ref.props.size;
        var v = _ref.variables;
    // const sizeInRem = pxToRem(sizeToPxValue[size]);
    return {
      position: 'relative',
      backgroundColor: 'inherit',
      display: 'inline-block',
      verticalAlign: 'middle',
      height: v.imageAvatarSize,
      width: v.imageAvatarSize
    };
  }
};

var sizeToPxValue$2 = {
  smallest: 6,
  smaller: 10,
  small: 10,
  medium: 10,
  large: 10,
  larger: 16,
  largest: 0
};
var getSizeStyles = function getSizeStyles(sizeInPx) {
  var sizeInRem = pxToRem(sizeInPx);
  return {
    height: sizeInRem,
    width: sizeInRem
  };
};
var avatarStatusStyles = {
  root: function root(_ref) {
    var v = _ref.variables,
        _ref$props = _ref.props,
        color = _ref$props.color,
        size = _ref$props.size,
        state = _ref$props.state;
    return _extends({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }, getSizeStyles(sizeToPxValue$2[size]), {
      verticalAlign: 'middle',
      borderRadius: '9999px',
      position: 'absolute',
      bottom: 0,
      right: 0,
      boxShadow: "0 0 0 " + v.statusBorderWidth + " " + v.statusBorderColor
    }, state === 'success' && {
      backgroundColor: v.statusSuccessBackgroundColor
    }, state === 'info' && {
      backgroundColor: v.statusInfoBackgroundColor
    }, state === 'warning' && {
      backgroundColor: v.statusWarningBackgroundColor
    }, state === 'error' && {
      backgroundColor: v.statusErrorBackgroundColor
    }, state === 'unknown' && {
      backgroundColor: v.statusBackgroundColor
    }, Boolean(color) && {
      backgroundColor: color
    });
  }
};

var avatarStatusIconStyles = {
  root: function root(_ref) {
    var state = _ref.props.state,
        v = _ref.variables;
    return _extends({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: v.statusIconSize,
      height: v.statusIconSize,
      color: v.statusColor
    }, state === 'success' && {
      color: v.statusSuccessColor
    }, state === 'info' && {
      color: v.statusInfoColor
    }, state === 'error' && {
      color: v.statusErrorColor
    }, state === 'warning' && {
      color: v.statusWarningColor
    }, {
      '& > :first-child': {
        height: '100%',
        width: '100%',
        '& svg': {
          height: '100%',
          width: '100%'
        }
      }
    });
  }
};

var avatarImageStyles = {
  root: function root(_ref) {
    var v = _ref.variables,
        p = _ref.props;
    return _extends({
      boxSizing: 'border-box',
      display: 'inline-block'
    }, p.circular && {
      borderRadius: v.imageCircularRadius
    }, p.avatar && {
      width: p.fluid && '100%' || v.imageAvatarSize,
      borderRadius: v.imageAvatarRadius
    }, {
      borderColor: v.avatarBorderColor,
      borderStyle: 'solid',
      borderWidth: v.avatarBorderWidth,
      height: '100%',
      objectFit: 'cover',
      verticalAlign: 'top',
      width: '100%'
    }, !p.avatar && {
      borderRadius: v.squareAvatarBorderRadius
    });
  }
};

var sizeToPxValue$1 = {
  smallest: 20,
  smaller: 24,
  small: 28,
  medium: 32,
  large: 44,
  larger: 64,
  largest: 96
};
var iconSizeToPxValue = {
  smallest: 10,
  smaller: 12,
  small: 16,
  medium: 16,
  large: 20,
  larger: 32,
  largest: 40
};
var avatarIconStyles = {
  root: function root(_ref) {
    var v = _ref.variables,
        p = _ref.props;
    var sizeInRem = pxToRem(sizeToPxValue$1[p.size]);
    var iconsizeInRem = pxToRem(iconSizeToPxValue[p.size]);
    return _extends({
      color: v.iconColor,
      background: v.iconBackgroundColor,
      width: sizeInRem,
      height: sizeInRem,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center'
    }, p.square && {
      borderRadius: v.squareAvatarBorderRadius
    }, {
      '& > :first-child': {
        margin: '0 auto',
        width: iconsizeInRem,
        height: iconsizeInRem,
        '& svg': {
          width: '100%',
          height: '100%'
        }
      }
    });
  }
};

var sizeToPxValue = {
  smallest: 20,
  smaller: 24,
  small: 28,
  medium: 32,
  large: 44,
  larger: 64,
  largest: 96
};
var avatarLabelStyles = {
  root: function root(_ref) {
    var p = _ref.props,
        v = _ref.variables;
    var sizeInRem = pxToRem(sizeToPxValue[p.size]);
    return _extends({
      alignItems: 'center',
      overflow: 'hidden',
      color: v.labelColor,
      backgroundColor: v.labelBackground,
      borderRadius: '50%',
      display: 'inline-block',
      width: sizeInRem,
      height: sizeInRem,
      lineHeight: sizeInRem,
      fontSize: pxToRem(sizeToPxValue[p.size] / 2.333),
      verticalAlign: 'top',
      textAlign: 'center',
      padding: '0'
    }, p.square && {
      borderRadius: v.squareAvatarBorderRadius
    }, p.circular && {
      borderRadius: v.labelCircularRadius
    });
  }
};

var buttonStyles = {
  root: function root(_ref) {
    var p = _ref.props,
        v = _ref.variables,
        siteVariables = _ref.theme.siteVariables;
    var borderWidth = siteVariables.borderWidth;
    var borderFocusStyles = getBorderFocusStyles(_extends({
      variables: siteVariables,
      borderPadding: borderWidth
    }, p.circular && {
      borderPadding: pxToRem(4)
    }));
    return _extends({
      height: v.height,
      minWidth: isNil(p.loading) ? v.minWidth : v.loadingMinWidth,
      maxWidth: v.maxWidth,
      color: v.color,
      backgroundColor: v.backgroundColor,
      borderRadius: v.borderRadius,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      padding: v.padding,
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: faster,
      textTransform: 'uppercase'
    }, p.size === 'small' && {
      padding: v.sizeSmallPadding,
      height: v.sizeSmallHeight,
      minWidth: v.sizeSmallMinWidth
    }, !p.text && _extends({
      outline: 0,
      borderWidth: pxToRem(2),
      borderStyle: 'solid',
      borderColor: v.borderColor,
      ':hover': {
        color: v.colorHover,
        backgroundColor: v.backgroundColorHover,
        borderColor: v.borderColorHover
      }
    }, !p.disabledFocusable && {
      ':active': {
        transition: ultraFast,
        color: v.colorActive,
        backgroundColor: v.backgroundColorActive,
        borderColor: v.borderColorActive,
        boxShadow: 'none'
      }
    }, {
      ':focus': borderFocusStyles[':focus'],
      ':focus-visible': _extends({}, borderFocusStyles[':focus-visible'], {
        backgroundColor: v.backgroundColorFocus,
        borderColor: v.borderColorFocus,
        color: v.colorFocus,
        borderWidth: borderWidth,
        ':hover': {
          borderColor: v.borderColorHover
        }
      })
    }, p.size === 'small' && {
      boxShadow: 'none'
    }), p.circular && !p.text && _extends({
      minWidth: v.height,
      padding: 0,
      borderRadius: v.circularBorderRadius
    }, p.size === 'small' && {
      minWidth: v.sizeSmallHeight
    }), p.text && _extends({
      color: v.textColor,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      padding: "0 " + pxToRem(8)
    }, getIconFillOrOutlineStyles({
      outline: true
    }), {
      ':hover': _extends({
        color: v.textColorHover
      }, getIconFillOrOutlineStyles({
        outline: false
      })),
      ':focus': _extends({
        boxShadow: 'none'
      }, borderFocusStyles[':focus']),
      ':focus-visible': borderFocusStyles[':focus-visible']
    }, p.primary && {
      color: v.textPrimaryColor
    }), p.primary && !p.text && _extends({
      color: v.primaryColor,
      backgroundColor: v.primaryBackgroundColor,
      borderColor: v.primaryBorderColor,
      boxShadow: v.primaryBoxShadow
    }, !p.disabledFocusable && {
      ':active': {
        transition: ultraFast,
        backgroundColor: v.primaryBackgroundColorActive,
        boxShadow: 'none'
      }
    }, {
      ':focus': borderFocusStyles[':focus'],
      ':focus-visible': _extends({}, borderFocusStyles[':focus-visible'], {
        backgroundColor: v.primaryBackgroundColorFocus
      }),
      ':hover': {
        color: v.primaryColorHover,
        backgroundColor: v.primaryBackgroundColorHover
      }
    }), p.inverted && _extends({
      backgroundColor: siteVariables.colorScheme.silver.background,
      borderColor: siteVariables.colorScheme.silver.border,
      color: siteVariables.colorScheme.silver.foreground
    }, !p.disabledFocusable && {
      ':active': {
        transition: ultraFast,
        backgroundColor: siteVariables.colorScheme.silver.backgroundPressed,
        color: siteVariables.colorScheme.silver.foregroundHover
      }
    }, {
      ':hover': {
        backgroundColor: siteVariables.colorScheme.silver.backgroundHover,
        color: siteVariables.colorScheme.silver.foregroundHover
      },
      ':focus': _extends({}, borderFocusStyles[':focus'], {
        boxShadow: 'none'
      }),
      ':focus-visible': _extends({}, borderFocusStyles[':focus-visible'], !p.disabledFocusable && {
        backgroundColor: siteVariables.colorScheme.silver.backgroundPressed,
        color: siteVariables.colorScheme.silver.foregroundHover
      })
    }), p.tinted && _extends({
      backgroundColor: v.tintedBackgroundColor,
      borderColor: v.tintedBorderColor,
      color: v.tintedColor
    }, !p.disabledFocusable && {
      ':active': {
        transition: ultraFast,
        backgroundColor: v.tintedBackgroundColorActive
      }
    }, {
      ':hover': {
        backgroundColor: v.tintedBackgroundColorHover
      },
      ':focus': {
        boxShadow: 'none'
      }
    }), p.disabled && {
      // pointer events intentionally not disabled for focusable disabled buttons
      // so that hover events work
      pointerEvents: 'none'
    }, (p.disabled || p.disabledFocusable) && _extends({
      cursor: 'default',
      color: v.colorDisabled,
      boxShadow: 'none',
      ':hover': {
        color: v.colorDisabled
      }
    }, p.text && {
      color: v.textColorDisabled,
      backgroundColor: 'transparent',
      ':hover': {
        color: v.textColorDisabled
      }
    }, !p.text && {
      backgroundColor: v.backgroundColorDisabled,
      borderColor: v.borderColorDisabled
    }), p.fluid && {
      width: '100%',
      maxWidth: '100%'
    }, p.iconOnly && _extends({
      minWidth: v.height,
      padding: 0
    }, !p.inverted && {
      ':hover': _extends({}, getIconFillOrOutlineStyles({
        outline: false
      }), {
        color: v.textColorIconOnlyHover,
        background: v.backgroundColorIconOnlyHover
      })
    }, p.size === 'small' && {
      minWidth: v.sizeSmallHeight
    }));
  },
  icon: function icon(_ref2) {
    var p = _ref2.props,
        v = _ref2.variables;
    return _extends({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: v.iconSize,
      height: v.iconSize
    }, p.loading && {
      margin: 0,
      opacity: 0,
      width: 0
    }, p.hasContent && _extends({
      margin: "0 " + pxToRem(10) + " 0 0"
    }, p.iconPosition === 'after' && {
      margin: "0 0 0 " + pxToRem(10)
    }));
  },
  loader: function loader(_ref3) {
    var _extends2;

    var p = _ref3.props,
        v = _ref3.variables;
    return _extends((_extends2 = {}, _extends2["& ." + loaderSlotClassNames.indicator] = {
      width: p.size === 'small' ? v.sizeSmallLoaderSize : v.loaderSize,
      height: p.size === 'small' ? v.sizeSmallLoaderSize : v.loaderSize
    }, _extends2["& ." + loaderSlotClassNames.svg] = {
      ':before': {
        animationName: {
          to: {
            transform: "translate3d(0, " + (p.size === 'small' ? v.sizeSmallLoaderSvgAnimationHeight : v.loaderSvgAnimationHeight) + ", 0)"
          }
        },
        borderWidth: p.size === 'small' ? v.sizeSmallLoaderBorderSize : v.loaderBorderSize,
        width: p.size === 'small' ? v.sizeSmallLoaderSize : v.loaderSize,
        height: p.size === 'small' ? v.sizeSmallLoaderSvgHeight : v.loaderSvgHeight
      }
    }, _extends2), p.hasContent && {
      marginRight: pxToRem(4)
    });
  }
};

var commonButtonsStyles = function commonButtonsStyles(circular) {
  return circular ? {
    marginRight: pxToRem(8)
  } : {
    borderRadius: 0
  };
};

var buttonGroupStyles = {
  root: function root() {
    return {};
  },
  middleButton: function middleButton(_ref) {
    var p = _ref.props;
    return _extends({}, commonButtonsStyles(p.circular));
  },
  firstButton: function firstButton(_ref2) {
    var p = _ref2.props,
        v = _ref2.variables;
    return _extends({}, commonButtonsStyles(p.circular), !p.circular && {
      borderTopLeftRadius: v.borderRadius,
      borderBottomLeftRadius: v.borderRadius
    });
  },
  lastButton: function lastButton(_ref3) {
    var p = _ref3.props,
        v = _ref3.variables;
    return _extends({}, commonButtonsStyles(p.circular), !p.circular && {
      borderTopRightRadius: v.borderRadius,
      borderBottomRightRadius: v.borderRadius
    });
  }
};

var buttonContentStyles = {
  root: function root(_ref) {
    var p = _ref.props,
        v = _ref.variables;
    return _extends({
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: v.contentFontSize,
      lineHeight: v.contentLineHeight
    }, p.size === 'small' && {
      fontSize: v.sizeSmallContentFontSize,
      lineHeight: v.sizeSmallContentLineHeight
    });
  }
};

var chatStyles = {
  root: function root(_ref) {
    var v = _ref.variables,
        siteVariables = _ref.theme.siteVariables;
    return {
      backgroundColor: v.backgroundColor,
      border: "1px solid " + v.backgroundColor,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: siteVariables.bodyFontFamily,
      fontSize: siteVariables.bodyFontSize,
      listStyle: 'none',
      padding: "0 " + pxToRem(16) + " 0 " + pxToRem(16),
      margin: 0,
      '[hidden]': {
        display: 'none!important'
      }
    };
  }
};

var chatItemStyles = {
  root: function root(_ref) {
    var p = _ref.props;
        _ref.variables;
    return _extends({
      position: 'relative'
    }, (!p.attached || p.attached === 'top') && {
      paddingTop: pxToRem(16)
    }, (p.attached === 'bottom' || p.attached === true) && {
      paddingTop: pxToRem(2)
    }, {
      paddingBottom: 0
    });
  },
  gutter: function gutter(_ref2) {
    var p = _ref2.props,
        v = _ref2.variables;
    return _extends({
      position: 'absolute',
      marginTop: v.gutterMargin,
      left: 0
    }, (p.attached === 'bottom' || p.attached === true) && {
      display: 'none'
    });
  },
  message: function message(_ref3) {
    _ref3.props;
        var v = _ref3.variables;
    return {
      position: 'relative',
      "float": 'left',
      marginLeft: v.messageMargin,
      marginRight: v.messageMargin
    };
  }
};

var chatMessageStyles = {
  root: function root(_ref) {
    var _hover;

    _ref.props;
        var v = _ref.variables,
        siteVariables = _ref.theme.siteVariables;
    return _extends({
      display: 'inline-block',
      position: 'relative',
      marginLeft: 0,
      marginRight: v.offset,
      maxWidth: "calc(100% - " + v.offset + ")",
      minWidth: v.offset,
      border: v.border,
      outline: 0,
      color: v.color,
      wordBreak: 'break-word',
      wordWrap: 'break-word'
    }, (v.hasMention || v.isImportant) && {
      '::before': {
        content: '""',
        backgroundColor: v.hasMention ? v.hasMentionColor : v.isImportantColor,
        height: '100%',
        left: '0',
        position: 'absolute',
        top: '0',
        width: pxToRem(3),
        borderBottomLeftRadius: 'inherit',
        borderTopLeftRadius: 'inherit'
      }
    }, getBorderFocusStyles({
      variables: siteVariables
    }), isNil(v.showActionMenu) && {
      ':hover': (_hover = {}, _hover["> ." + chatMessageSlotClassNames.actionMenu] = {
        opacity: 1,
        zIndex: v.overlayZIndex,
        '[data-popper-escaped]': {
          opacity: 0
        }
      }, _hover)
    });
  },
  actionMenu: function actionMenu(_ref2) {
    var p = _ref2.props,
        v = _ref2.variables;
    return _extends({
      backgroundColor: v.backgroundColor,
      border: '1px solid',
      borderColor: v.reactionGroupBorderColor,
      borderRadius: v.borderRadius,
      boxShadow: v.actionMenuBoxShadow,
      // we need higher zIndex for the action menu in order to be displayed above the focus border of the chat message
      zIndex: p.focused || !isNil(v.showActionMenu) ? v.overlayZIndex : -1
    }, isNil(v.showActionMenu) && {
      overflow: p.focused ? 'visible' : 'hidden',
      // hide and squash actions menu to prevent accidental hovers over its invisible area
      opacity: p.focused ? 1 : 0,
      width: 'auto'
    }, !isNil(v.showActionMenu) && {
      overflow: v.showActionMenu ? 'visible' : 'hidden',
      // opacity should always be preferred over visibility in order to avoid accessibility bugs in
      // JAWS behavior on Windows
      opacity: v.showActionMenu ? 1 : 0,
      width: v.showActionMenu ? 'auto' : 0
    }, {
      '[data-popper-escaped]': {
        opacity: 0
      }
    });
  },
  author: function author(_ref3) {
    var p = _ref3.props,
        v = _ref3.variables;
    return _extends({}, (p.attached === 'bottom' || p.attached === true) && screenReaderContainerStyles, {
      color: v.authorColor,
      marginRight: v.authorMarginRight,
      fontWeight: v.authorFontWeight,
      fontSize: '1rem'
    });
  },
  timestamp: function timestamp(_ref4) {
    var p = _ref4.props,
        v = _ref4.variables;
    return _extends({
      marginBottom: v.headerMarginBottom,
      color: 'rgba(97,96,97,1)'
    }, (p.attached === 'bottom' || p.attached === true) && !p.hasReactionGroup && screenReaderContainerStyles);
  },
  content: function content(_ref5) {
    var p = _ref5.props,
        v = _ref5.variables;
    return _extends({
      color: v.contentColor,
      display: 'block',
      '& a': {
        outline: 'none',
        color: v.linkColor,
        ':focus': {
          textDecoration: 'underline'
        }
      }
    }, p.hasBadge && p.badgePosition === 'end' && {
      marginRight: pxToRem(4)
    });
  },
  badge: function badge(_ref6) {
    var _ref7;

    var p = _ref6.props,
        v = _ref6.variables;
    var sidePosition = p.badgePosition === 'start' ? 'left' : 'right';
    return _ref7 = {
      backgroundColor: v.hasMention ? v.hasMentionNubbinColor : v.isImportantColor,
      color: v.badgeTextColor,
      boxShadow: v.badgeShadow,
      position: 'absolute',
      padding: pxToRem(4),
      height: 'auto',
      width: 'auto',
      borderRadius: '50%',
      top: pxToRem(4),
      zIndex: v.zIndex
    }, _ref7[sidePosition] = 0, _ref7.transform = p.badgePosition === 'start' ? 'translateX(-50%)' : 'translateX(50%)', _ref7['& > :first-child'] = {
      display: 'inline-flex'
    }, _ref7;
  },
  reactionGroup: function reactionGroup(_ref8) {
    var p = _ref8.props,
        v = _ref8.variables;
    return _extends({
      marginLeft: v.reactionGroupMarginLeft
    }, p.hasBadge && p.badgePosition === 'end' && {
      marginRight: pxToRem(2)
    }, {
      "float": 'right'
    });
  }
};

var chatMessageDetailsStyles = {
  root: function root(_ref) {
    var p = _ref.props,
        v = _ref.variables;
    return _extends({
      marginLeft: v.detailsMargin,
      fontSize: v.detailsFontSize,
      display: 'inline-block',
      color: v.detailsColor,
      ':hover': {
        color: v.detailsHoverColor
      }
    }, p.mine && {
      color: v.detailsColorMine,
      ':hover': {
        color: v.detailsHoverColorMine
      }
    });
  }
};

var chatMessageReadStatusStyles = {
  root: function root(_ref) {
    var p = _ref.props,
        v = _ref.variables;
    return {
      position: 'absolute',
      right: v.rightPoistion,
      bottom: v.bottomPoistion,
      ':after': _extends({
        content: "\"" + p.title + "\""
      }, screenReaderContainerStyles)
    };
  }
};

var beforeAndAfter = function beforeAndAfter(size, variables, colors, props) {
  return _extends({
    content: '""',
    flex: 1
  }, props.vertical ? {
    width: size + 1 + "px",
    height: '100%'
  } : {
    height: size + 1 + "px"
  }, {
    background: pathOr(variables.dividerColor, 'foreground', colors)
  });
};

var dividerStyles = {
  root: function root(_ref) {
    var props = _ref.props,
        variables = _ref.variables;
    var color = props.color,
        fitted = props.fitted,
        size = props.size,
        important = props.important,
        hasContent = props.hasContent,
        vertical = props.vertical;
    var colors = variables.colorScheme[color];
    return _extends({
      color: pathOr(variables.textColor, 'foreground', colors),
      display: 'flex',
      alignItems: 'center'
    }, !fitted && {
      padding: vertical ? "0 " + variables.dividerPadding : variables.dividerPadding + " 0"
    }, important && {
      fontWeight: variables.importantFontWeight
    }, vertical && {
      height: '100%'
    }, hasContent ? {
      textAlign: 'center',
      fontSize: pxToRem(12 + size),
      lineHeight: variables.textLineHeight,
      '::before': _extends({}, beforeAndAfter(size, variables, colors, props)),
      '::after': _extends({}, beforeAndAfter(size, variables, colors, props))
    } : {
      '::before': _extends({}, beforeAndAfter(size, variables, colors, props))
    });
  }
};

var dividerContentStyles = {
  root: function root() {
    return {
      marginLeft: pxToRem(20),
      marginRight: pxToRem(20)
    };
  }
};

var transparentColorStyle = {
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  borderBottomColor: 'transparent'
};

var transparentColorStyleObj = _extends({}, transparentColorStyle, {
  ':hover': transparentColorStyle,
  ':active': transparentColorStyle,
  ':focus': _extends({}, transparentColorStyle, {
    ':active': transparentColorStyle
  })
});

var getWidth = function getWidth(p, v) {
  if (p.fluid) {
    return '100%';
  }

  if (p.inline) {
    return 'initial';
  }

  return v.width;
};

var dropdownStyles = {
  root: function root(_ref) {
    var p = _ref.props;
    return _extends({}, p.inline && {
      display: 'inline-flex'
    });
  },
  clearIndicator: function clearIndicator(_ref2) {
    var v = _ref2.variables,
        siteVariables = _ref2.theme.siteVariables;
    return _extends({
      alignItems: 'center',
      alignSelf: 'center',
      display: 'flex',
      justifyContent: 'center',
      cursor: 'pointer',
      userSelect: 'none',
      margin: 0,
      position: 'absolute',
      right: pxToRem(6),
      padding: pxToRem(2),
      color: v.color
    }, getBorderFocusStyles({
      variables: siteVariables
    }));
  },
  container: function container(_ref3) {
    var _extends2;

    var p = _ref3.props,
        v = _ref3.variables,
        siteVariables = _ref3.theme.siteVariables;
    return _extends({
      display: 'flex',
      flexWrap: 'wrap',
      position: 'relative',
      borderStyle: 'solid',
      borderColor: v.borderColor,
      outline: 0,
      width: getWidth(p, v),
      borderWidth: p.search ? "0 0 " + v.searchBorderBottomWidth + " 0" : v.borderWidth,
      color: v.color,
      backgroundColor: v.backgroundColor,
      borderRadius: v.containerBorderRadius
    }, p.open && p.position === 'above' && {
      borderRadius: v.openAboveContainerBorderRadius
    }, p.open && p.position === 'below' && {
      borderRadius: v.openBelowContainerBorderRadius
    }, {
      ':hover': _extends({
        backgroundColor: v.backgroundColorHover,
        borderColor: v.borderColorHover
      }, p.open && {
        borderColor: v.openBorderColorHover
      })
    }, p.error && {
      border: pxToRem(1) + " solid " + v.borderError,
      ':hover': {
        border: pxToRem(1) + " solid " + v.borderError
      }
    }, {
      ':active': {
        backgroundColor: v.backgroundColor
      },
      ':focus-within': {
        // when dropdown's selected items are focused
        // keep the focus border style
        borderBottomColor: v.borderColorFocus
      }
    }, p.focused && _extends({
      backgroundColor: v.backgroundColor
    }, p.search && {
      borderBottomColor: v.borderColorFocus
    }, !p.search && !p.open && p.isFromKeyboard && getBorderFocusStyles({
      variables: siteVariables
    })[':focus-visible']), p.inline && _extends({}, transparentColorStyleObj, {
      alignItems: 'center'
    }), p.inverted && {
      backgroundColor: v.invertedBackgroundColor,
      ':hover': {
        backgroundColor: v.invertedBackgroundColorHover
      },
      ':active': {
        backgroundColor: v.invertedBackgroundColorHover
      },
      ':focus': {
        backgroundColor: v.invertedBackgroundColorHover
      }
    }, p.disabled && {
      backgroundColor: siteVariables.colorScheme["default"].backgroundDisabled,
      borderColor: siteVariables.colorScheme["default"].borderDisabled,
      userSelect: 'none',
      ':hover': {
        backgroundColor: siteVariables.colorScheme["default"].backgroundDisabled
      },
      ':active': {
        backgroundColor: siteVariables.colorScheme["default"].backgroundDisabled
      }
    }, (_extends2 = {}, _extends2["& ." + dropdownSlotClassNames.triggerButton] = _extends({}, p.disabled && {
      color: siteVariables.colorScheme["default"].foregroundDisabled
    }), _extends2));
  },
  selectedItems: function selectedItems(_ref4) {
    var p = _ref4.props,
        v = _ref4.variables;
    return _extends({
      display: 'flex',
      flexWrap: 'wrap',
      overflowY: 'auto',
      maxHeight: v.selectedItemsMaxHeight,
      '& .ui-button': {
        textTransform: 'none'
      },
      width: '100%'
    }, p.hasToggleIndicator && {
      paddingRight: v.toggleIndicatorSize
    }, p.multiple && p.hasItemsSelected && {
      paddingTop: pxToRem(1),
      paddingBottom: pxToRem(4)
    });
  },
  triggerButton: function triggerButton(_ref5) {
    var p = _ref5.props,
        v = _ref5.variables;
    return _extends({
      overflow: 'hidden',
      boxShadow: 'none',
      minHeight: pxToRem(32)
    }, transparentColorStyleObj, {
      margin: '0',
      justifyContent: 'left',
      padding: v.comboboxPaddingButton
    }, p.multiple && _extends({
      minWidth: 0,
      flex: 1
    }, p.hasItemsSelected && {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      height: '100%'
    }), transparentColorStyleObj, {
      ':focus': _extends({
        color: v.color
      }, transparentColorStyleObj),
      ':focus-visible': _extends({
        color: v.color
      }, transparentColorStyle, {
        ':after': {
          borderColor: 'transparent',
          borderRightWidth: 0
        },
        ':before': {
          borderColor: 'transparent',
          borderRightWidth: 0
        }
      }),
      ':active': _extends({
        color: v.color
      }, transparentColorStyle, {
        animationName: 'unset',
        animationDuration: 'unset'
      }),
      ':hover': _extends({}, transparentColorStyle, {
        color: v.color // required for HC theme

      })
    }, p.inline && {
      paddingLeft: 0,
      paddingRight: 0,
      width: 'initial'
    });
  },
  list: function list(_ref6) {
    var p = _ref6.props,
        v = _ref6.variables;
    return _extends({
      outline: 0,
      borderStyle: 'solid',
      borderWidth: p.open ? v.listBorderWidth : '0px',
      borderColor: v.listBorderColor,
      zIndex: v.overlayZIndex,
      maxHeight: v.listMaxHeight,
      overflowY: 'auto',
      width: getWidth(p, v),
      background: v.listBackgroundColor
    }, p.position === 'above' && {
      borderRadius: v.aboveListBorderRadius
    }, p.position === 'below' && {
      borderRadius: v.belowListBorderRadius
    }, p.open && {
      boxShadow: v.listBoxShadow,
      padding: v.listPadding
    });
  },
  loadingMessage: function loadingMessage(_ref7) {
    var v = _ref7.variables;
    return {
      backgroundColor: v.loadingMessageBackgroundColor
    };
  },
  noResultsMessage: function noResultsMessage(_ref8) {
    var v = _ref8.variables;
    return {
      backgroundColor: v.noResultsMessageBackgroundColor
    };
  },
  headerMessage: function headerMessage(_ref9) {
    var v = _ref9.variables;
    return {
      backgroundColor: v.headerMessageBackgroundColor
    };
  },
  toggleIndicator: function toggleIndicator(_ref10) {
    var p = _ref10.props,
        v = _ref10.variables;
    return _extends({
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignSelf: 'center',
      cursor: 'pointer'
    }, p.disabled && {
      cursor: 'default'
    }, {
      userSelect: 'none',
      margin: 0,
      position: 'absolute',
      right: pxToRem(8)
    }, p.multiple && p.hasItemsSelected && {
      top: pxToRem(8)
    }, {
      color: v.color
    }, p.disabled && {
      color: v.disabledColor
    });
  }
};

var dropdownSearchInputStyles = {
  root: function root(_ref) {
    var v = _ref.variables;
    return {
      flexBasis: v.comboboxFlexBasis,
      flexGrow: 1
    };
  },
  input: function input(_ref2) {
    var p = _ref2.props;
    return _extends({
      width: '100%',
      backgroundColor: 'transparent',
      borderWidth: 0
    }, p.inline && {
      padding: 0,
      lineHeight: 'initial'
    });
  }
};

var dropdownSelectedItemStyles = {
  root: function root(_ref) {
    var _hover;

    var p = _ref.props,
        v = _ref.variables,
        siteVariables = _ref.theme.siteVariables;
    var borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables
    });
    return _extends({
      maxWidth: v.selectedItemsMaxWidth,
      display: 'inline-flex',
      alignItems: 'center',
      padding: "0 " + pxToRem(8),
      startPaddingLeft: '0px',
      lineHeight: pxToRem(20),
      borderRadius: pxToRem(9999),
      fontSize: pxToRem(14)
    }, p.hasImage && {
      paddingLeft: '0px'
    }, {
      cursor: 'pointer',
      margin: '.25rem 0 0 .4rem',
      color: v.selectedItemColor,
      position: 'relative',
      border: v.selectedItemBorder,
      height: pxToRem(24),
      overflow: 'visible',
      outline: 0,
      fontWeight: siteVariables.fontWeightSemibold
    }, v.selectedItemBackgroundColor && {
      backgroundColor: v.selectedItemBackgroundColor
    }, {
      ':focus': {
        color: v.selectedItemColorFocus
      },
      ':hover': (_hover = {
        color: v.selectedItemColorHover,
        backgroundColor: v.selectedItemBackgroundColorHover
      }, _hover["& ." + dropdownSelectedItemSlotClassNames.icon] = {
        color: v.selectedItemIconColorHover
      }, _hover),
      ':focus-visible': {
        ':after': borderFocusStyles[':focus-visible'][':after']
      }
    });
  },
  image: function image() {
    return {
      height: pxToRem(20),
      width: pxToRem(20)
    };
  },
  header: function header(_ref2) {
    var p = _ref2.props;
        _ref2.variables;
    return _extends({}, p.hasImage && {
      marginLeft: pxToRem(3)
    }, {
      marginRight: pxToRem(3),
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    });
  },
  icon: function icon(_ref3) {
    var v = _ref3.variables;
    return _extends({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: pxToRem(16),
      minWidth: pxToRem(16),
      height: pxToRem(16),
      '& > :first-child': {
        width: pxToRem(16),
        height: pxToRem(16),
        '& svg': {
          width: pxToRem(16),
          height: pxToRem(16)
        }
      },
      cursor: 'pointer',
      color: v.selectedItemIconColor
    }, getIconFillOrOutlineStyles({
      outline: true
    }), {
      ':hover': _extends({
        color: v.selectedItemIconColorHover
      }, getIconFillOrOutlineStyles({
        outline: false
      }))
    });
  }
};

var checkableIndicatorUrl = function checkableIndicatorUrl(color) {
  return "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' fill='" + encodeURIComponent(color) + "' focusable='false' view-box='8 8 16 16'%3E%3Cg%3E%3Cpath d='M23.5 11.875a.968.968 0 0 1-.289.711l-8.25 8.25c-.192.193-.43.289-.711.289s-.519-.096-.711-.289l-4.75-4.75a.965.965 0 0 1-.289-.711c0-.125.027-.25.082-.375s.129-.234.223-.328a.953.953 0 0 1 .695-.297c.135 0 .266.025.391.074.125.05.231.121.32.215l4.039 4.047 7.539-7.547a.886.886 0 0 1 .32-.215c.125-.049.255-.074.391-.074a1.004 1.004 0 0 1 .922.625.97.97 0 0 1 .078.375z' /%3E%3C/g%3E%3C/svg%3E\")";
};

//   hasContent?: boolean;
//   hasHeader?: boolean;
// };

var dropdownItemStyles = {
  root: function root(_ref) {
    var _ref2, _ref3;

    var p = _ref.props,
        v = _ref.variables,
        siteVariables = _ref.theme.siteVariables;
    return _extends({
      display: 'flex',
      alignItems: 'center',
      minHeight: 0,
      padding: pxToRem(4) + " " + pxToRem(11),
      whiteSpace: 'nowrap',
      border: v.listItemFocusBorderWidth + " solid transparent",
      backgroundColor: v.listItemBackgroundColor
    }, p.selected && {
      fontWeight: v.listItemSelectedFontWeight,
      color: v.listItemSelectedColor
    }, {
      position: 'relative'
    }, p.active && _extends({}, p.isFromKeyboard && getBorderFocusStyles({
      variables: siteVariables,
      borderRadius: 0
    })[':focus-visible'], !p.isFromKeyboard && _extends({
      color: v.listItemColorHover,
      backgroundColor: v.listItemBackgroundColorHover
    }, p.hasHeader && (_ref2 = {}, _ref2["& ." + dropdownItemSlotClassNames.header] = {
      color: v.listItemColorHover
    }, _ref2), p.hasContent && (_ref3 = {}, _ref3["& ." + dropdownItemSlotClassNames.content] = {
      color: v.listItemColorHover
    }, _ref3))));
  },
  image: function image() {
    return {
      margin: pxToRem(3) + " " + pxToRem(12) + " " + pxToRem(3) + " " + pxToRem(4)
    };
  },
  header: function header(_ref4) {
    var p = _ref4.props,
        v = _ref4.variables;
    return _extends({
      flexGrow: 1,
      lineHeight: v.listItemHeaderLineHeight,
      fontSize: v.listItemHeaderFontSize,
      // if the item doesn't have content - i.e. it is header only - then it should use the content color
      color: v.listItemContentColor
    }, p.hasContent && {
      // if there is content it needs to be "tightened up" to the header
      marginBottom: pxToRem(-1),
      color: v.listItemHeaderColor
    }, p.selected && {
      fontWeight: v.listItemSelectedFontWeight,
      color: v.listItemSelectedColor
    }, {
      whiteSpace: 'normal'
    });
  },
  content: function content(_ref5) {
    var v = _ref5.variables;
    return {
      flexGrow: 1,
      lineHeight: v.listItemContentLineHeight,
      fontSize: v.listItemContentFontSize,
      color: v.listItemContentColor
    };
  },
  checkableIndicator: function checkableIndicator(_ref6) {
    var v = _ref6.variables;
    return {
      backgroundImage: checkableIndicatorUrl(v.listItemSelectedColor),
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'absolute',
      width: pxToRem(24),
      height: pxToRem(24),
      right: pxToRem(7),
      top: pxToRem(-3)
    };
  },
  endMedia: function endMedia() {
    return {
      flexShrink: 0,
      lineHeight: pxToRem(16)
    };
  },
  main: function main() {
    return {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      minWidth: 0 // needed for the truncate styles to work

    };
  }
};

var inputStyles = {
  root: function root(_ref) {
    var p = _ref.props;
        _ref.variables;
    return _extends({
      flexDirection: 'column',
      justifyContent: 'center',
      display: 'inline-flex',
      position: 'relative',
      outline: 0,
      verticalAlign: 'middle'
    }, p.fluid && {
      width: '100%'
    }, p.labelPosition === 'inline' && {
      flexDirection: 'row',
      alignItems: 'center'
    });
  },
  input: function input(_ref2) {
    var p = _ref2.props,
        v = _ref2.variables;
    return _extends({
      backgroundColor: v.backgroundColor
    }, p.inverted && {
      backgroundColor: v.backgroundColorInverted
    }, {
      lineHeight: 'unset',
      color: v.fontColor,
      borderColor: v.borderColor,
      borderRadius: v.borderRadius,
      borderStyle: 'solid',
      borderWidth: v.borderWidth,
      outline: 'none',
      padding: v.inputPadding,
      position: 'relative'
    }, p.fluid && {
      width: '100%'
    }, p.inline && {
      "float": 'left'
    }, p.disabled && {
      color: v.colorDisabled,
      boxShadow: 'none'
    }, {
      '::placeholder': _extends({
        color: v.placeholderColor,
        opacity: 1
      }, p.disabled && {
        color: v.colorDisabled
      }),
      ':focus': _extends({}, !p.error && {
        borderColor: v.inputFocusBorderColor,
        borderRadius: v.inputFocusBorderRadius
      })
    }, !p.hasValue && {
      ':-webkit-autofill:focus': {
        '-webkit-text-fill-color': 'transparent'
      }
    }, p.clearable && {
      padding: v.inputPaddingWithIconAtEnd
    }, p.hasIcon && {
      padding: p.iconPosition === 'start' ? v.inputPaddingWithIconAtStart : v.inputPaddingWithIconAtEnd
    }, p.labelPosition === 'inside' && {
      paddingTop: v.inputInsideLabelPaddingTop
    }, p.error && {
      border: pxToRem(1) + " solid " + v.borderColorError
    }, {
      '::-ms-clear': {
        display: 'none'
      }
    });
  },
  icon: function icon(_ref3) {
    var p = _ref3.props,
        v = _ref3.variables;
    return _extends({
      color: v.iconColor,
      outline: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: v.iconPosition,
      top: 0,
      bottom: 0
    }, p.error && {
      color: v.colorError
    }, p.requiredAndSuccessful && {
      color: v.successfulColor
    }, p.disabled && {
      color: v.colorDisabled
    }, p.iconPosition === 'start' && {
      left: v.iconLeft
    }, p.iconPosition === 'end' && {
      right: v.iconRight
    }, p.clearable && p.hasValue && _extends({
      height: '100%',
      width: pxToRem(16),
      color: v.iconColor
    }, p.disabled && {
      color: v.colorDisabled
    }));
  },
  inputContainer: function inputContainer() {
    return {
      position: 'relative'
    };
  }
};

var inputLabelStyles = {
  root: function root(_ref) {
    var p = _ref.props,
        v = _ref.variables;
    return _extends({
      display: 'block',
      transition: 'all .2s',
      lineHeight: v.lineHeight,
      marginBottom: v.marginBottom
    }, p.labelPosition === 'inside' && _extends({
      bottom: v.insideLabelBottom,
      top: 0,
      left: 0,
      margin: 0,
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      zIndex: 100,
      paddingLeft: v.insideLabelPaddingLeft
    }, p.hasValue && {
      transform: 'translateY(-16px)',
      fontSize: v.insideLabelActiveFontSize
    }), p.labelPosition === 'inline' && {
      paddingRight: v.inlineLabelPaddingRight
    }, p.required && {
      '::after': {
        content: '"*"'
      }
    });
  }
};

var radioGroupStyles = {
  root: function root(_ref) {
    var p = _ref.props;
    return {
      display: 'flex',
      flexDirection: p.vertical ? 'column' : 'row'
    };
  }
};

var restHoverFocusTextColor = function restHoverFocusTextColor(textColor) {
  return {
    color: textColor,
    ':hover': {
      color: textColor
    },
    ':focus': {
      color: textColor
    }
  };
};

var radioGroupItemStyles = {
  root: function root(_ref) {
    var _hover;

    var p = _ref.props,
        v = _ref.variables,
        siteVariables = _ref.theme.siteVariables;
    return _extends({
      position: 'relative',
      alignItems: 'center',
      borderStyle: 'solid',
      borderWidth: "" + pxToRem(1),
      borderColor: 'transparent',
      borderRadius: siteVariables.borderRadiusMedium,
      color: v.textColorDefault,
      cursor: 'pointer',
      display: p.vertical ? 'flex' : 'inline-flex',
      fontSize: v.textFontSize,
      padding: v.padding,
      margin: v.margin,
      ':hover': (_hover = {
        color: v.textColorDefaultHoverFocus
      }, _hover["& ." + radioGroupItemSlotClassNames.indicator] = _extends({
        borderColor: v.textColorDefaultHoverFocus
      }, !p.disabled && !p.checked && {
        borderColor: v.indicatorBorderColorDefaultHover
      }), _hover),
      ':focus': {
        color: v.textColorDefaultHoverFocus
      }
    }, p.checked && _extends({}, restHoverFocusTextColor(v.textColorChecked)), p.disabled && _extends({}, restHoverFocusTextColor(v.colorDisabled)), getBorderFocusStyles({
      variables: siteVariables
    }));
  },
  indicator: function indicator(_ref2) {
    var p = _ref2.props,
        v = _ref2.variables;
    return _extends({
      margin: pxToRem(2) + " 0",
      outline: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: pxToRem(16),
      height: pxToRem(16),
      verticalAlign: 'midddle',
      color: v.indicatorColorDefault
    }, p.checked && {
      color: v.indicatorBackgroundColorChecked
    }, p.disabled && {
      color: v.colorDisabled
    });
  },
  label: function label() {
    return {
      margin: "0 0 0 " + pxToRem(12)
    };
  }
};

var textAreaStyles = {
  root: function root(_ref) {
    var p = _ref.props,
        v = _ref.variables;
    return _extends({
      margin: v.margin,
      height: v.height,
      backgroundColor: v.backgroundColor
    }, p.inverted && {
      backgroundColor: v.invertedBackgroundColor
    }, {
      color: v.fontColor,
      borderColor: v.borderColor,
      borderRadius: v.borderRadius,
      borderStyle: 'solid',
      borderWidth: v.borderWidth,
      outline: 0,
      padding: v.padding,
      resize: p.resize || 'none'
    }, p.fluid && {
      width: '100%'
    }, p.disabled && {
      pointerEvents: 'none',
      color: v.disabledColor,
      boxShadow: 'none'
    }, p.error && {
      border: pxToRem(1) + " solid " + v.borderColorError
    }, {
      '::placeholder': _extends({
        color: v.placeholderColor,
        opacity: 1
      }, p.disabled && {
        color: v.disabledColor
      }),
      ':focus': {
        borderColor: v.borderColorFocus
      }
    });
  }
};

var componentStyles = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Attachment: attachmentStyles,
  AttachmentAction: attachmentActionStyles,
  AttachmentBody: attachmentBodyStyles,
  AttachmentDescription: attachmentDescriptionStyles,
  AttachmentHeader: attachmentHeaderStyles,
  AttachmentIcon: attachmentIconStyles,
  Avatar: avatarStyles,
  AvatarStatus: avatarStatusStyles,
  AvatarStatusIcon: avatarStatusIconStyles,
  AvatarImage: avatarImageStyles,
  AvatarIcon: avatarIconStyles,
  AvatarLabel: avatarLabelStyles,
  Button: buttonStyles,
  ButtonGroup: buttonGroupStyles,
  ButtonContent: buttonContentStyles,
  Chat: chatStyles,
  ChatItem: chatItemStyles,
  ChatMessage: chatMessageStyles,
  ChatMessageDetails: chatMessageDetailsStyles,
  ChatMessageReadStatus: chatMessageReadStatusStyles,
  Divider: dividerStyles,
  DividerContent: dividerContentStyles,
  Dropdown: dropdownStyles,
  DropdownSearchInput: dropdownSearchInputStyles,
  DropdownSelectedItem: dropdownSelectedItemStyles,
  DropdownItem: dropdownItemStyles,
  Input: inputStyles,
  InputLabel: inputLabelStyles,
  RadioGroup: radioGroupStyles,
  RadioGroupItem: radioGroupItemStyles,
  TextArea: textAreaStyles
});

//   padding: string;
//   iconSpace: string;
//   iconSize: string;
//   borderColor: string;
//   borderRadius: string;
//   backgroundColor: string;
//   backgroundColorHover: string;
//   textColor: string;
//   textColorHover: string;
//   boxShadow: string;
//   focusBackgroundColor: string;
//   focusColor: string;
//   progressColor: string;
//   progressHeight: string;
//   headerFontSize: string;
//   headerFontWeight: number;
//   headerLineHeight: number;
//   descriptionFontSize: string;
//   descriptionFontWeight: number;
//   descriptionLineHeight: number;
//   actionHeight: string;
//   actionMaxWidth: string;
//   actionColor: string;
//   actionPrimaryColor: string;
//   actionColorDisabled: string;
//   actionIconSize: string;
//   actionLoaderBorderSize: string;
//   actionLoaderSize: string;
//   actionLoaderSvgHeight: string;
//   actionLoaderSvgAnimationHeight: string;
//   actionFocusBorderRadius: string;
// };

var attachmentVariables = function attachmentVariables(siteVariables) {
  return {
    padding: pxToRem(6) + " " + pxToRem(6) + " " + pxToRem(6) + " " + pxToRem(8),
    iconSpace: pxToRem(12),
    iconSize: pxToRem(32),
    borderColor: siteVariables.colors.grey[250],
    borderRadius: siteVariables.borderRadiusMedium,
    backgroundColor: siteVariables.colors.grey[100],
    backgroundColorHover: siteVariables.colorScheme["default"].backgroundHover1,
    textColor: siteVariables.colorScheme["default"].foreground,
    textColorHover: siteVariables.colorScheme["default"].foregroundHover,
    boxShadow: siteVariables.shadowLevel1,
    focusBackgroundColor: undefined,
    focusColor: undefined,
    progressColor: siteVariables.colorScheme.green.background,
    progressHeight: pxToRem(4),
    headerFontSize: siteVariables.fontSizes.medium,
    headerFontWeight: siteVariables.fontWeightSemibold,
    headerLineHeight: siteVariables.lineHeightMedium,
    descriptionFontSize: siteVariables.fontSizes.small,
    descriptionFontWeight: siteVariables.fontWeightRegular,
    descriptionLineHeight: siteVariables.lineHeightDefault,
    // action variables
    actionHeight: pxToRem(32),
    actionMaxWidth: pxToRem(280),
    actionColor: siteVariables.colorScheme["default"].foreground,
    actionPrimaryColor: siteVariables.colorScheme.brand.foreground,
    actionColorDisabled: siteVariables.colorScheme.brand.foregroundDisabled1,
    actionIconSize: pxToRem(16),
    actionLoaderBorderSize: pxToRem(2),
    actionLoaderSize: pxToRem(20),
    actionLoaderSvgHeight: pxToRem(1220),
    actionLoaderSvgAnimationHeight: pxToRem(-1200),
    actionFocusBorderRadius: siteVariables.borderRadiusMedium
  };
};

stringLiteralsArray('foreground', 'background'); // export type LabelColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof labelColorAreas>>;
// export interface AvatarVariables {
//   avatarBorderColor: string;
//   avatarBorderWidth: string;
//   squareAvatarBorderRadius: string;
//   iconColor: string;
//   iconBackgroundColor: string;
//   // Status
//   statusBorderColor: string;
//   statusBorderWidth: string;
//   statusIconSize: string;
//   statusSuccessBackgroundColor: string;
//   statusSuccessColor: string;
//   statusInfoBackgroundColor: string;
//   statusInfoColor: string;
//   statusWarningBackgroundColor: string;
//   statusWarningColor: string;
//   statusErrorBackgroundColor: string;
//   statusErrorColor: string;
//   statusBackgroundColor: string;
//   statusColor: string;
//   // Image
//   imageWidth: string;
//   imageHeight: string;
//   imageAvatarRadius: string;
//   imageAvatarSize: string;
//   imageCircularRadius: string;
//   // Label
//   labelCircularRadius: string;
//   labelColor: string;
//   labelBackground: string;
// }

var avatarVariables = function avatarVariables(siteVariables) {
  return {
    avatarBorderColor: '',
    avatarBorderWidth: '0',
    squareAvatarBorderRadius: siteVariables.borderRadiusMedium,
    iconColor: siteVariables.colors.white,
    iconBackgroundColor: siteVariables.colors.brand[600],
    statusBorderWidth: '2px',
    statusIconSize: pxToRem(7),
    statusBorderColor: siteVariables.bodyBackground,
    statusSuccessBackgroundColor: siteVariables.colorScheme.green.background,
    statusSuccessColor: siteVariables.colorScheme.green.foreground1,
    statusInfoBackgroundColor: siteVariables.colorScheme.brand.background,
    statusInfoColor: siteVariables.colorScheme["default"].foreground2,
    statusWarningBackgroundColor: siteVariables.colorScheme.yellow.background,
    statusWarningColor: siteVariables.colorScheme.yellow.foreground2,
    statusErrorBackgroundColor: siteVariables.colorScheme.red.background,
    statusErrorColor: siteVariables.colorScheme.red.foreground2,
    statusBackgroundColor: siteVariables.colorScheme["default"].background5,
    statusColor: siteVariables.colorScheme["default"].foreground4,
    imageWidth: undefined,
    imageHeight: undefined,
    imageAvatarRadius: pxToRem(4),
    imageAvatarSize: pxToRem(36),
    imageCircularRadius: pxToRem(1),
    labelCircularRadius: pxToRem(9999),
    labelColor: 'rgba(0, 0, 0, 0.6)',
    labelBackground: 'rgb(232, 232, 232)'
  };
};

//   padding: string;
//   height: string;
//   minWidth: string;
//   loadingMinWidth: string;
//   maxWidth: string;
//   borderRadius: string;
//   contentFontWeight: FontWeightProperty;
//   contentFontSize: string;
//   contentLineHeight: string;
//   color: string;
//   colorHover: string;
//   colorActive: string;
//   colorDisabled: string;
//   colorFocus: string;
//   backgroundColor: string;
//   backgroundColorActive: string;
//   backgroundColorHover: string;
//   backgroundColorIconOnlyHover: string;
//   backgroundColorDisabled: string;
//   borderColor: string;
//   borderColorHover: string;
//   borderColorActive: string;
//   borderColorDisabled: string;
//   borderColorFocus: string;
//   backgroundColorFocus: string;
//   iconSize: string;
//   primaryColor: string;
//   primaryColorHover: string;
//   primaryBackgroundColor: string;
//   primaryBackgroundColorActive: string;
//   primaryBackgroundColorHover: string;
//   primaryBackgroundColorFocus: string;
//   primaryBackgroundColorDisabled: string;
//   primaryBorderColor: string;
//   tintedColor: string;
//   tintedColorHover: string;
//   tintedBackgroundColor: string;
//   tintedBackgroundColorActive: string;
//   tintedBackgroundColorHover: string;
//   tintedBorderColor: string;
//   tintedBorderColorHover: string;
//   circularBorderRadius: string;
//   textColor: string;
//   textColorHover: string;
//   textPrimaryColor: string;
//   textPrimaryColorHover: string;
//   textColorDisabled: string;
//   textColorIconOnlyHover: string;
//   primaryBoxShadow: string;
//   boxShadow: string;
//   loaderBorderSize: string;
//   loaderSize: string;
//   loaderSvgHeight: string;
//   loaderSvgAnimationHeight: string;
//   sizeSmallContentFontSize: string;
//   sizeSmallContentLineHeight: string;
//   sizeSmallHeight: string;
//   sizeSmallMinWidth: string;
//   sizeSmallPadding: string;
//   sizeSmallLoaderBorderSize: string;
//   sizeSmallLoaderSize: string;
//   sizeSmallLoaderSvgHeight: string;
//   sizeSmallLoaderSvgAnimationHeight: string;
// }

var buttonVariables = function buttonVariables(siteVars) {
  return {
    padding: "0 " + pxToRem(20),
    height: pxToRem(32),
    minWidth: pxToRem(96),
    loadingMinWidth: pxToRem(118),
    maxWidth: pxToRem(280),
    borderRadius: pxToRem(2),
    contentFontSize: siteVars.fontSizes.medium,
    contentLineHeight: siteVars.lineHeightMedium,
    color: siteVars.colorScheme["default"].foreground,
    colorHover: siteVars.colorScheme["default"].foregroundHover,
    colorActive: siteVars.colorScheme["default"].foregroundPressed,
    colorDisabled: siteVars.colorScheme.brand.foregroundDisabled,
    colorFocus: undefined,
    iconSize: pxToRem(16),
    backgroundColor: siteVars.colorScheme["default"].background,
    backgroundColorActive: siteVars.colorScheme["default"].backgroundPressed,
    backgroundColorHover: siteVars.colorScheme["default"].backgroundHover1,
    backgroundColorFocus: undefined,
    backgroundColorDisabled: siteVars.colorScheme["default"].backgroundDisabled,
    borderColor: siteVars.colorScheme["default"].border,
    borderColorHover: siteVars.colorScheme["default"].borderHover,
    borderColorFocus: undefined,
    borderColorActive: siteVars.colorScheme["default"].borderPressed,
    borderColorDisabled: 'transparent',
    backgroundColorIconOnlyHover: siteVars.colorScheme["default"].backgroundHover2,
    primaryColor: siteVars.colorScheme.brand.foreground4,
    primaryColorHover: siteVars.colorScheme.brand.foreground4,
    primaryBackgroundColor: siteVars.colorScheme.brand.background,
    primaryBackgroundColorActive: siteVars.colorScheme.brand.backgroundPressed,
    primaryBackgroundColorHover: siteVars.colorScheme.brand.backgroundHover,
    primaryBackgroundColorDisabled: siteVars.colorScheme["default"].backgroundDisabled,
    primaryBackgroundColorFocus: undefined,
    primaryBorderColor: 'transparent',
    tintedColor: siteVars.colorScheme.brand.foreground,
    tintedColorHover: siteVars.colorScheme.brand.foreground,
    tintedBackgroundColor: siteVars.colorScheme["default"].background,
    tintedBackgroundColorActive: siteVars.colorScheme.brand.backgroundHover1,
    tintedBackgroundColorHover: siteVars.colorScheme.brand.backgroundHover1,
    tintedBorderColor: siteVars.colorScheme.brand.border1,
    tintedBorderColorHover: siteVars.colorScheme.brand.borderHover,
    circularBorderRadius: pxToRem(999),
    textColor: siteVars.colorScheme["default"].foreground1,
    textColorHover: siteVars.colorScheme.brand.foreground1,
    textPrimaryColor: siteVars.colorScheme.brand.foreground,
    textPrimaryColorHover: siteVars.colorScheme.brand.foreground1,
    textColorDisabled: siteVars.colorScheme.brand.foregroundDisabled1,
    textColorIconOnlyHover: siteVars.colorScheme.brand.foregroundHover,
    primaryBoxShadow: siteVars.shadowLevel1Dark,
    boxShadow: siteVars.shadowLevel1,
    loaderBorderSize: pxToRem(2),
    loaderSize: pxToRem(20),
    loaderSvgHeight: pxToRem(1220),
    loaderSvgAnimationHeight: pxToRem(-1200),
    sizeSmallContentFontSize: siteVars.fontSizes.small,
    sizeSmallContentLineHeight: siteVars.lineHeightSmall,
    sizeSmallHeight: pxToRem(24),
    sizeSmallMinWidth: pxToRem(72),
    sizeSmallPadding: "0 " + pxToRem(8),
    sizeSmallLoaderBorderSize: pxToRem(2),
    sizeSmallLoaderSize: pxToRem(15),
    sizeSmallLoaderSvgHeight: pxToRem(895),
    sizeSmallLoaderSvgAnimationHeight: pxToRem(-880)
  };
};

// export interface ChatVariables {
//   backgroundColor: string;
// }
var chatVariables = function chatVariables(_ref) {
  var colors = _ref.colors;
  return {
    backgroundColor: colors.white
  };
};

//   margin: string;
//   gutterMargin: string;
//   messageMargin: string;
// }

var chatItemVariables = function chatItemVariables() {
  return {
    gutterMargin: pxToRem(4),
    margin: pxToRem(8),
    messageMargin: pxToRem(44)
  };
};

//   actionMenuBoxShadow: string;
//   actionMenuPositionRight: string;
//   actionMenuPositionTop: string;
//   backgroundColor: string;
//   backgroundColorMine: string;
//   borderRadius: string;
//   color: string;
//   offset: string;
//   padding: string;
//   authorMarginRight: string;
//   authorColor: string;
//   authorFontWeight: number;
//   headerMarginBottom: string;
//   contentColor: string;
//   linkColor: string;
//   linkColorMine: string;
//   border: string;
//   badgeShadow: string;
//   isImportant: boolean;
//   hasMention: boolean;
//   hasMentionColor: string;
//   hasMentionNubbinColor: string;
//   isImportantColor: string;
//   badgeTextColor: string;
//   reactionGroupMarginLeft: string;
//   reactionGroupBorderColor: string;
//   showActionMenu?: boolean;
//   timestampColorMine: string;
//   zIndex: number;
//   overlayZIndex: number;
// }

var chatMessageVariables = function chatMessageVariables(_ref) {
  _ref.borderRadiusMedium;
      var colors = _ref.colors,
      colorScheme = _ref.colorScheme,
      fontWeightBold = _ref.fontWeightBold,
      shadowLevel1 = _ref.shadowLevel1,
      shadowLevel1Dark = _ref.shadowLevel1Dark,
      zIndexes = _ref.zIndexes;
  return {
    actionMenuBoxShadow: shadowLevel1,
    actionMenuPositionRight: pxToRem(5),
    actionMenuPositionTop: pxToRem(-30),
    authorColor: colorScheme["default"].foreground,
    authorFontWeight: fontWeightBold,
    authorMarginRight: pxToRem(12),
    backgroundColor: colors.grey[150],
    badgeShadow: shadowLevel1Dark,
    badgeTextColor: colors.white,
    border: 'none',
    borderRadius: pxToRem(8),
    color: 'rgb(64, 64, 64)',
    contentColor: colors.grey[750],
    hasMention: false,
    hasMentionColor: colors.orange[300],
    hasMentionNubbinColor: colors.orange[400],
    headerMarginBottom: pxToRem(2),
    isImportant: false,
    isImportantColor: colors.red[400],
    linkColor: colorScheme.brand.foreground1,
    linkColorMine: colorScheme.brand.foreground2,
    offset: pxToRem(-42),
    overlayZIndex: zIndexes.overlay,
    padding: pxToRem(12),
    reactionGroupBorderColor: 'transparent',
    reactionGroupMarginLeft: pxToRem(12),
    showActionMenu: undefined,
    timestampColor: 'rgba(97,96,97,1)',
    zIndex: zIndexes.foreground
  };
};

//   detailsColor: string;
//   detailsHoverColor: string;
//   detailsColorMine: string;
//   detailsHoverColorMine: string;
//   detailsFontSize: string;
//   detailsMargin: string;
// }

var chatMessageDetailsVariables = function chatMessageDetailsVariables(_ref) {
  var colors = _ref.colors,
      fontSizes = _ref.fontSizes;
  return {
    detailsColor: colors.grey[350],
    detailsColorMine: colors.grey[500],
    detailsFontSize: fontSizes.small,
    detailsHoverColor: colors.grey[500],
    detailsHoverColorMine: colors.grey[500],
    detailsMargin: pxToRem(12)
  };
};

//   rightPoistion?: string;
//   bottomPoistion?: string;
// }

var chatMessageReadStatusVariables = function chatMessageReadStatusVariables() {
  return {
    bottomPoistion: pxToRem(0),
    rightPoistion: pxToRem(-24)
  };
};

var dividerColorAreas = stringLiteralsArray('foreground'); // export type DividerColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof dividerColorAreas>>;
// export interface DividerVariables {
//   colorScheme: DividerColorSchemeMapping;
//   dividerColor: string;
//   textColor: string;
//   textFontSize: string;
//   textLineHeight: string;
//   importantFontWeight: FontWeightProperty;
//   dividerPadding: string;
// }

var dividerVariables = function dividerVariables(siteVars) {
  return {
    colorScheme: pickValuesFromColorScheme(siteVars.colorScheme, dividerColorAreas),
    dividerColor: siteVars.colors.grey[150],
    textColor: siteVars.colors.grey[450],
    textFontSize: siteVars.fontSizeSmall,
    textLineHeight: siteVars.lineHeightSmall,
    importantFontWeight: siteVars.fontWeightBold,
    dividerPadding: pxToRem(4)
  };
};

//   backgroundColor: string;
//   backgroundColorHover: string;
//   invertedBackgroundColor: string;
//   invertedBackgroundColorHover: string;
//   borderColor: string;
//   borderColorHover: string;
//   borderColorFocus: string;
//   borderError: string;
//   borderWidth: string;
//   openBorderColorHover: string;
//   containerBorderRadius: string;
//   disabledColor: string;
//   openAboveContainerBorderRadius: string;
//   openBelowContainerBorderRadius: string;
//   searchBorderBottomWidth: string;
//   color: string;
//   comboboxPaddingButton: string;
//   comboboxFlexBasis: string;
//   aboveListBorderRadius: string;
//   belowListBorderRadius: string;
//   listBackgroundColor: string;
//   listBorderColor: string;
//   listBorderWidth: string;
//   listPadding: string;
//   listBoxShadow: string;
//   listMaxHeight: string;
//   listItemFocusBorderWidth: string;
//   listItemBackgroundColor: string;
//   listItemBackgroundColorActive: string;
//   listItemBackgroundColorHover: string;
//   listItemColorActive: string;
//   listItemColorHover: string;
//   listItemSelectedColor: string;
//   listItemSelectedFontWeight: number;
//   listItemHeaderLineHeight: string;
//   listItemContentLineHeight: string;
//   selectedItemBackgroundColor: string;
//   selectedItemBackgroundColorHover: string;
//   selectedItemBorder: string;
//   selectedItemColor: string;
//   selectedItemColorHover: string;
//   selectedItemIconColor: string;
//   selectedItemIconColorHover: string;
//   selectedItemColorFocus: string;
//   selectedItemsMaxHeight: string;
//   selectedItemsMaxWidth: string;
//   toggleIndicatorSize: string;
//   triggerButtonColorFocusActive: string;
//   triggerButtonColorHover: string;
//   width: string;
//   overlayZIndex: number;
//   disabledBorderColorHover: string;
//   disabledTriggerColorHover: string;
//   disabledBackgroundColorHover: string;
//   listItemHeaderFontSize: string;
//   listItemHeaderColor: string;
//   listItemContentFontSize: string;
//   listItemContentColor: string;
//   headerMessageBackgroundColor: string;
//   noResultsMessageBackgroundColor: string;
//   loadingMessageBackgroundColor: string;
// }

var dropdownVariables = function dropdownVariables(siteVars) {
  return {
    backgroundColor: siteVars.colorScheme["default"].background2,
    backgroundColorHover: siteVars.colorScheme["default"].backgroundHover3,
    invertedBackgroundColor: siteVars.colorScheme["default"].background,
    invertedBackgroundColorHover: siteVars.colorScheme["default"].backgroundHover4,
    borderColor: 'transparent',
    borderColorHover: 'transparent',
    borderColorFocus: siteVars.colorScheme.brand.borderFocus1,
    borderError: siteVars.colorScheme.red.background,
    borderWidth: '0px',
    openBorderColorHover: undefined,
    containerBorderRadius: siteVars.borderRadiusMedium,
    disabledColor: siteVars.colorScheme["default"].foregroundDisabled,
    openAboveContainerBorderRadius: "0 0 " + siteVars.borderRadiusMedium + " " + siteVars.borderRadiusMedium,
    openBelowContainerBorderRadius: siteVars.borderRadiusMedium + " " + siteVars.borderRadiusMedium + " 0 0",
    searchBorderBottomWidth: pxToRem(2),
    color: siteVars.colorScheme["default"].foreground1,
    comboboxPaddingButton: "0 " + pxToRem(12),
    comboboxFlexBasis: pxToRem(50),
    aboveListBorderRadius: siteVars.borderRadiusMedium + " " + siteVars.borderRadiusMedium + " 0 0",
    belowListBorderRadius: "0 0 " + siteVars.borderRadiusMedium + " " + siteVars.borderRadiusMedium,
    listBackgroundColor: siteVars.colorScheme["default"].background,
    listBorderColor: 'transparent',
    listBorderWidth: '0px',
    listPadding: pxToRem(8) + " 0 " + pxToRem(6),
    listBoxShadow: siteVars.shadowLevel3,
    listMaxHeight: pxToRem(296),
    listItemFocusBorderWidth: pxToRem(1),
    listItemBackgroundColor: 'transparent',
    listItemBackgroundColorActive: siteVars.colorScheme["default"].backgroundActive,
    listItemBackgroundColorHover: siteVars.colorScheme["default"].backgroundHover,
    listItemColorActive: siteVars.colorScheme["default"].backgroundFocus3,
    listItemColorHover: siteVars.colorScheme["default"].foregroundHover,
    listItemSelectedColor: siteVars.colorScheme["default"].foreground,
    listItemSelectedFontWeight: siteVars.fontWeightSemibold,
    // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
    listItemHeaderLineHeight: siteVars.lineHeightSmall,
    listItemContentLineHeight: siteVars.lineHeightSmall,
    selectedItemBackgroundColor: siteVars.colorScheme["default"].background,
    selectedItemBackgroundColorHover: siteVars.colorScheme.brand.backgroundHover2,
    selectedItemBorder: 'none',
    selectedItemColor: siteVars.colorScheme["default"].foreground,
    selectedItemColorHover: siteVars.colorScheme["default"].foregroundHover,
    selectedItemIconColor: siteVars.colorScheme["default"].foreground1,
    selectedItemIconColorHover: siteVars.colorScheme.brand.foregroundHover,
    selectedItemsMaxWidth: pxToRem(140),
    selectedItemColorFocus: siteVars.bodyColor,
    selectedItemsMaxHeight: pxToRem(82),
    toggleIndicatorSize: pxToRem(32),
    triggerButtonColorFocusActive: undefined,
    triggerButtonColorHover: siteVars.bodyColor,
    width: pxToRem(356),
    overlayZIndex: siteVars.zIndexes.overlay,
    // disabled state
    disabledBorderColorHover: 'transparent',
    disabledTriggerColorHover: siteVars.colorScheme.brand.foregroundDisabled,
    disabledBackgroundColorHover: siteVars.colorScheme.brand.backgroundDisabled,
    // these should only apply when there is content in the image/media slot:
    listItemHeaderFontSize: siteVars.fontSizes.medium,
    listItemHeaderColor: siteVars.colorScheme["default"].foreground1,
    listItemContentFontSize: siteVars.fontSizes.small,
    listItemContentColor: siteVars.colorScheme["default"].foreground2,
    headerMessageBackgroundColor: siteVars.colors.white,
    noResultsMessageBackgroundColor: 'transparent',
    loadingMessageBackgroundColor: 'transparent'
  };
};

//   backgroundColor: string;
//   backgroundColorInverted: string;
//   borderColor: string;
//   borderRadius: string;
//   borderWidth: string;
//   colorDisabled: string;
//   fontColor: string;
//   fontSize: string;
//   iconColor: string;
//   iconPosition: string;
//   iconRight: string;
//   iconLeft: string;
//   inputPaddingWithIconAtStart: string;
//   inputPaddingWithIconAtEnd: string;
//   inputPadding: string;
//   inputFocusBorderColor: string;
//   inputFocusBorderRadius: string;
//   inputInsideLabelPaddingTop: string;
//   placeholderColor: string;
//   successfulColor: string;
//   borderColorError: string;
//   colorError: string;
// }

var inputVariables = function inputVariables(siteVars) {
  return {
    colorDisabled: siteVars.colorScheme.brand.foregroundDisabled,
    colorError: siteVars.colorScheme.red.foreground,
    borderColorError: siteVars.colorScheme.red.background,
    iconPosition: 'absolute',
    iconRight: pxToRem(10),
    iconLeft: pxToRem(9),
    inputPaddingWithIconAtStart: pxToRem(5) + " " + pxToRem(12) + " " + pxToRem(5) + " " + pxToRem(34),
    inputPaddingWithIconAtEnd: pxToRem(5) + " " + pxToRem(35) + " " + pxToRem(5) + " " + pxToRem(12),
    inputPadding: pxToRem(5) + " " + pxToRem(12),
    inputInsideLabelPaddingTop: pxToRem(14),
    borderColor: 'transparent',
    borderRadius: siteVars.borderRadiusMedium,
    borderWidth: "0 0 " + pxToRem(2) + " 0",
    backgroundColor: siteVars.colorScheme["default"].background2,
    backgroundColorInverted: siteVars.colorScheme["default"].background,
    fontColor: siteVars.colorScheme["default"].foreground,
    fontSize: siteVars.fontSizes.medium,
    iconColor: siteVars.colorScheme["default"].foreground,
    successfulColor: siteVars.colorScheme.green.foreground,
    inputFocusBorderColor: "transparent transparent " + siteVars.colorScheme.brand.borderFocus1 + " transparent",
    inputFocusBorderRadius: siteVars.borderRadiusMedium + " " + siteVars.borderRadiusMedium + " " + siteVars.borderRadiusSmall + " " + siteVars.borderRadiusSmall,
    placeholderColor: siteVars.colorScheme["default"].foreground1
  };
};

//   insideLabelBottom: string;
//   insideLabelPaddingLeft: string;
//   insideLabelActiveFontSize: string;
//   inlineLabelPaddingRight: string;
//   lineHeight: string;
//   marginBottom: string;
// }

var inputLabelVariables = function inputLabelVariables(siteVars) {
  return {
    insideLabelBottom: pxToRem(-8),
    insideLabelPaddingLeft: pxToRem(12),
    insideLabelActiveFontSize: pxToRem(12),
    inlineLabelPaddingRight: pxToRem(10),
    lineHeight: pxToRem(16),
    marginBottom: pxToRem(4)
  };
};

//   colorDisabled: string,
//   textFontSize: string,
//   textColorDefault: string,
//   textColorDefaultHoverFocus: string,
//   textColorChecked: string,
//   indicatorColorDefault: string,
//   indicatorBorderColorDefaultHover: string,
//   indicatorBorderColorChecked: string,
//   indicatorBackgroundColorChecked: string,
//   padding: string,
//   margin: string,
// };

var radioGroupItemVariables = function radioGroupItemVariables(siteVars) {
  return {
    colorDisabled: siteVars.colors.grey[250],
    textFontSize: siteVars.fontSizes.medium,
    textColorDefault: siteVars.colors.grey[500],
    textColorDefaultHoverFocus: siteVars.colors.grey[750],
    textColorChecked: siteVars.colors.grey[750],
    indicatorColorDefault: siteVars.colors.grey[500],
    indicatorBorderColorDefaultHover: siteVars.colors.grey[750],
    indicatorBorderColorChecked: siteVars.colors.brand[600],
    indicatorBackgroundColorChecked: siteVars.colors.brand[600],
    padding: "0 " + pxToRem(2),
    margin: pxToRem(5) + " " + pxToRem(8) + " " + pxToRem(5) + " " + pxToRem(2)
  };
};

//   backgroundColor: string;
//   invertedBackgroundColor: string;
//   disabledColor: string;
//   borderColor: string;
//   borderRadius: string;
//   borderWidth: string;
//   fontColor: string;
//   fontSize: string;
//   borderColorFocus: string;
//   placeholderColor: string;
//   margin: string;
//   padding: string;
//   height: string;
//   borderColorError: string;
// }

var textAreaVariables = function textAreaVariables(siteVars) {
  return {
    margin: '0',
    padding: pxToRem(7) + " " + pxToRem(12),
    borderColor: 'transparent',
    borderRadius: siteVars.borderRadiusMedium + " " + siteVars.borderRadiusMedium + " " + siteVars.borderRadiusSmall + " " + siteVars.borderRadiusSmall,
    borderWidth: "0 0 " + pxToRem(2) + " 0",
    backgroundColor: siteVars.colorScheme["default"].background2,
    invertedBackgroundColor: siteVars.colorScheme["default"].background,
    placeholderColor: siteVars.colorScheme["default"].foreground1,
    disabledColor: siteVars.colorScheme.brand.foregroundDisabled,
    fontColor: siteVars.colorScheme["default"].foreground,
    fontSize: siteVars.fontSizes.medium,
    borderColorFocus: "transparent transparent " + siteVars.colorScheme.brand.borderFocus1 + " transparent",
    height: 'auto',
    borderColorError: siteVars.colorScheme.red.background
  };
};

var componentVariables = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Attachment: attachmentVariables,
  AttachmentAction: attachmentVariables,
  AttachmentBody: attachmentVariables,
  AttachmentDescription: attachmentVariables,
  AttachmentHeader: attachmentVariables,
  AttachmentIcon: attachmentVariables,
  Avatar: avatarVariables,
  AvatarStatus: avatarVariables,
  AvatarStatusIcon: avatarVariables,
  AvatarImage: avatarVariables,
  AvatarIcon: avatarVariables,
  AvatarLabel: avatarVariables,
  Button: buttonVariables,
  ButtonGroup: buttonVariables,
  ButtonContent: buttonVariables,
  Chat: chatVariables,
  ChatItem: chatItemVariables,
  ChatMessage: chatMessageVariables,
  ChatMessageDetails: chatMessageDetailsVariables,
  ChatMessageReadStatus: chatMessageReadStatusVariables,
  Divider: dividerVariables,
  Dropdown: dropdownVariables,
  DropdownItem: dropdownVariables,
  DropdownSearchInput: dropdownVariables,
  DropdownSelectedItem: dropdownVariables,
  Input: inputVariables,
  InputLabel: inputLabelVariables,
  RadioGroupItem: radioGroupItemVariables,
  TextArea: textAreaVariables
});

var COPY_COMPONENTS = ['Flex', 'Image', 'Text', 'Card', 'Layout', 'List']; // Temporarily merging

var mergedComponentStyles = _extends({}, Object.fromEntries(COPY_COMPONENTS.map(function (component) {
  return [component, teamsTheme.componentStyles[component]];
})), componentStyles); // console.log(mergedComponentStyles);


var mergedComponentVariables = _extends({}, Object.fromEntries(COPY_COMPONENTS.map(function (component) {
  return [component, teamsTheme.componentVariables[component]];
})), componentVariables); // console.log(mergedComponentVariables);


var barista = createTheme({
  componentStyles: mergedComponentStyles,
  componentVariables: mergedComponentVariables,
  fontFaces: fontFaces$1,
  siteVariables: siteVariables
}, 'slack');

var DEFAULT_THEME_INDEX = 0;
var items = [{
  header: 'Barista',
  key: 'barista',
  value: 'barista'
}, {
  header: 'Slack',
  key: 'slack',
  value: 'slack'
}, {
  header: 'Teams Light',
  key: 'light',
  value: 'teamsTheme'
}, {
  header: 'Teams Dark',
  key: 'dark',
  value: 'teamsDarkTheme'
}, {
  header: 'Teams High Contrast',
  key: 'hc',
  value: 'teamsHighContrastTheme'
}];
var themes = {
  barista: barista$1,
  slack: barista,
  teamsDarkTheme: teamsThemeOverrides('teamsDarkTheme'),
  teamsHighContrastTheme: teamsThemeOverrides('teamsHighContrastTheme'),
  teamsTheme: teamsThemeOverrides('teamsTheme')
};
var propTypes$p = {
  children: pt$1.oneOfType([pt$1.node, pt$1.arrayOf(pt$1.node)]),
  inputComponent: pt$1.node,
  isThemeSelectable: pt$1.bool
};

var ChatProvider = function ChatProvider(_ref) {
  var children = _ref.children,
      inputComponent = _ref.inputComponent,
      isThemeSelectable = _ref.isThemeSelectable;

  var _useState = useState(items[DEFAULT_THEME_INDEX].value),
      theme = _useState[0],
      setTheme = _useState[1];

  var handleDropdownChange = useCallback(function (e, data) {
    setTheme(data.value.value);
  }, [setTheme]); // console.log(themes[theme].staticStyles);

  return /*#__PURE__*/React.createElement(Boundaries, null, /*#__PURE__*/React.createElement(Provider, {
    overwrite: true,
    theme: themes[theme]
  }, /*#__PURE__*/React.createElement(Flex, {
    column: true,
    gap: "gap.small",
    style: {
      maxHeight: '100vh'
    }
  }, isThemeSelectable && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Dropdown, {
    defaultValue: items[DEFAULT_THEME_INDEX],
    fluid: true,
    items: items.map(function (option) {
      return _extends({}, option);
    }),
    onChange: handleDropdownChange,
    placeholder: "Select a theme"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: 'auto'
    }
  }, children), inputComponent)));
};

ChatProvider.propTypes = propTypes$p;

var defaultValue = {
  isEditing: false,
  isEditingAny: false,
  value: 'blue'
}; // We will use this baseline context to create any of our context providers from.
// Any unique functionality should be included in that provider and not in this Context.

var ModuleContext = /*#__PURE__*/createContext(defaultValue); // We are also exporting the default value in case we need to hydrate or merge

var _excluded$m = ["children", "value"];
var propTypes$o = {
  children: pt$1.oneOfType([pt$1.node, pt$1.arrayOf(pt$1.node)]),
  value: pt$1.shape({
    isEditing: pt$1.bool
  })
};

var ModuleProvider = function ModuleProvider(_ref) {
  var children = _ref.children,
      value = _ref.value,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$m);

  var _useToggle = useToggle((value === null || value === void 0 ? void 0 : value.isEditing) || false),
      isEditing = _useToggle[0],
      setIsEditing = _useToggle[1];

  var mergedValues = _extends({}, defaultValue, {
    isEditing: isEditing,
    setIsEditing: setIsEditing
  }, value);

  return /*#__PURE__*/React.createElement(ModuleContext.Provider, _extends({
    value: mergedValues
  }, props), children);
};

ModuleProvider.propTypes = propTypes$o;

var css_248z = ".☕️_DataModule_Color__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Email__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_File__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Image__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Month__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Number__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Password__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Range__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Select__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Tel__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Text__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_TextArea__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Time__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Url__1az7j .☕️_DataModule_Week__1az7j .☕️_DataModule_Input__1az7j{-webkit-overflow-scrolling:touch;scroll-behavior:smooth}.☕️_DataModule_Color__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar,.☕️_DataModule_Email__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar,.☕️_DataModule_File__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar,.☕️_DataModule_Image__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar,.☕️_DataModule_Month__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar,.☕️_DataModule_Number__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar,.☕️_DataModule_Password__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar,.☕️_DataModule_Range__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar,.☕️_DataModule_Select__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar,.☕️_DataModule_Tel__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar,.☕️_DataModule_Text__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar,.☕️_DataModule_TextArea__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar,.☕️_DataModule_Time__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar,.☕️_DataModule_Url__1az7j .☕️_DataModule_Week__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar{width:0}.☕️_DataModule_Color__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar-thumb,.☕️_DataModule_Email__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar-thumb,.☕️_DataModule_File__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar-thumb,.☕️_DataModule_Image__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar-thumb,.☕️_DataModule_Month__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar-thumb,.☕️_DataModule_Number__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar-thumb,.☕️_DataModule_Password__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar-thumb,.☕️_DataModule_Range__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar-thumb,.☕️_DataModule_Select__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar-thumb,.☕️_DataModule_Tel__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar-thumb,.☕️_DataModule_Text__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar-thumb,.☕️_DataModule_TextArea__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar-thumb,.☕️_DataModule_Time__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar-thumb,.☕️_DataModule_Url__1az7j .☕️_DataModule_Week__1az7j .☕️_DataModule_Input__1az7j::-webkit-scrollbar-thumb{background-clip:content-box;background-color:rgba(0,0,0,.3);border:.3em solid transparent;border-radius:1em;box-shadow:inset 0 0 0 .05em hsla(0,0%,100%,.2)}.☕️_DataModule_Color__1az7j .☕️_DataModule_Input__1az7j:hover::-webkit-scrollbar,.☕️_DataModule_Email__1az7j .☕️_DataModule_Input__1az7j:hover::-webkit-scrollbar,.☕️_DataModule_File__1az7j .☕️_DataModule_Input__1az7j:hover::-webkit-scrollbar,.☕️_DataModule_Image__1az7j .☕️_DataModule_Input__1az7j:hover::-webkit-scrollbar,.☕️_DataModule_Month__1az7j .☕️_DataModule_Input__1az7j:hover::-webkit-scrollbar,.☕️_DataModule_Number__1az7j .☕️_DataModule_Input__1az7j:hover::-webkit-scrollbar,.☕️_DataModule_Password__1az7j .☕️_DataModule_Input__1az7j:hover::-webkit-scrollbar,.☕️_DataModule_Range__1az7j .☕️_DataModule_Input__1az7j:hover::-webkit-scrollbar,.☕️_DataModule_Select__1az7j .☕️_DataModule_Input__1az7j:hover::-webkit-scrollbar,.☕️_DataModule_Tel__1az7j .☕️_DataModule_Input__1az7j:hover::-webkit-scrollbar,.☕️_DataModule_Text__1az7j .☕️_DataModule_Input__1az7j:hover::-webkit-scrollbar,.☕️_DataModule_TextArea__1az7j .☕️_DataModule_Input__1az7j:hover::-webkit-scrollbar,.☕️_DataModule_Time__1az7j .☕️_DataModule_Input__1az7j:hover::-webkit-scrollbar,.☕️_DataModule_Url__1az7j .☕️_DataModule_Week__1az7j .☕️_DataModule_Input__1az7j:hover::-webkit-scrollbar{width:.65em}.☕️_DataModule_Color__1az7j .☕️_DataModule_LabelText__1az7j,.☕️_DataModule_Email__1az7j .☕️_DataModule_LabelText__1az7j,.☕️_DataModule_File__1az7j .☕️_DataModule_LabelText__1az7j,.☕️_DataModule_Image__1az7j .☕️_DataModule_LabelText__1az7j,.☕️_DataModule_Month__1az7j .☕️_DataModule_LabelText__1az7j,.☕️_DataModule_Number__1az7j .☕️_DataModule_LabelText__1az7j,.☕️_DataModule_Password__1az7j .☕️_DataModule_LabelText__1az7j,.☕️_DataModule_Range__1az7j .☕️_DataModule_LabelText__1az7j,.☕️_DataModule_Select__1az7j .☕️_DataModule_LabelText__1az7j,.☕️_DataModule_Tel__1az7j .☕️_DataModule_LabelText__1az7j,.☕️_DataModule_Text__1az7j .☕️_DataModule_LabelText__1az7j,.☕️_DataModule_TextArea__1az7j .☕️_DataModule_LabelText__1az7j,.☕️_DataModule_Time__1az7j .☕️_DataModule_LabelText__1az7j,.☕️_DataModule_Url__1az7j .☕️_DataModule_Week__1az7j .☕️_DataModule_LabelText__1az7j{font-size:.875em;display:block;font-weight:600}.☕️_DataModule_Color__1az7j,.☕️_DataModule_Email__1az7j,.☕️_DataModule_File__1az7j,.☕️_DataModule_Image__1az7j,.☕️_DataModule_Month__1az7j,.☕️_DataModule_Number__1az7j,.☕️_DataModule_Password__1az7j,.☕️_DataModule_Range__1az7j,.☕️_DataModule_Select__1az7j,.☕️_DataModule_Tel__1az7j,.☕️_DataModule_Text__1az7j,.☕️_DataModule_TextArea__1az7j,.☕️_DataModule_Time__1az7j,.☕️_DataModule_Url__1az7j .☕️_DataModule_Week__1az7j{width:100%;padding:0}.☕️_DataModule_Color__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Email__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_File__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Image__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Month__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Number__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Password__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Range__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Select__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Tel__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Text__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_TextArea__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Time__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Url__1az7j .☕️_DataModule_Week__1az7j .☕️_DataModule_Input__1az7j{overflow-x:overlay;line-height:1.35em;padding:.5em 0;display:inline-block;border:1px solid transparent;width:100%;border-radius:.25em;transition:box-shadow .3s ease-in-out}.☕️_DataModule_Color__1az7j input.☕️_DataModule_Input__1az7j,.☕️_DataModule_Color__1az7j select.☕️_DataModule_Input__1az7j,.☕️_DataModule_Color__1az7j textarea.☕️_DataModule_Input__1az7j,.☕️_DataModule_Email__1az7j input.☕️_DataModule_Input__1az7j,.☕️_DataModule_Email__1az7j select.☕️_DataModule_Input__1az7j,.☕️_DataModule_Email__1az7j textarea.☕️_DataModule_Input__1az7j,.☕️_DataModule_File__1az7j input.☕️_DataModule_Input__1az7j,.☕️_DataModule_File__1az7j select.☕️_DataModule_Input__1az7j,.☕️_DataModule_File__1az7j textarea.☕️_DataModule_Input__1az7j,.☕️_DataModule_Image__1az7j input.☕️_DataModule_Input__1az7j,.☕️_DataModule_Image__1az7j select.☕️_DataModule_Input__1az7j,.☕️_DataModule_Image__1az7j textarea.☕️_DataModule_Input__1az7j,.☕️_DataModule_Month__1az7j input.☕️_DataModule_Input__1az7j,.☕️_DataModule_Month__1az7j select.☕️_DataModule_Input__1az7j,.☕️_DataModule_Month__1az7j textarea.☕️_DataModule_Input__1az7j,.☕️_DataModule_Number__1az7j input.☕️_DataModule_Input__1az7j,.☕️_DataModule_Number__1az7j select.☕️_DataModule_Input__1az7j,.☕️_DataModule_Number__1az7j textarea.☕️_DataModule_Input__1az7j,.☕️_DataModule_Password__1az7j input.☕️_DataModule_Input__1az7j,.☕️_DataModule_Password__1az7j select.☕️_DataModule_Input__1az7j,.☕️_DataModule_Password__1az7j textarea.☕️_DataModule_Input__1az7j,.☕️_DataModule_Range__1az7j input.☕️_DataModule_Input__1az7j,.☕️_DataModule_Range__1az7j select.☕️_DataModule_Input__1az7j,.☕️_DataModule_Range__1az7j textarea.☕️_DataModule_Input__1az7j,.☕️_DataModule_Select__1az7j input.☕️_DataModule_Input__1az7j,.☕️_DataModule_Select__1az7j select.☕️_DataModule_Input__1az7j,.☕️_DataModule_Select__1az7j textarea.☕️_DataModule_Input__1az7j,.☕️_DataModule_Tel__1az7j input.☕️_DataModule_Input__1az7j,.☕️_DataModule_Tel__1az7j select.☕️_DataModule_Input__1az7j,.☕️_DataModule_Tel__1az7j textarea.☕️_DataModule_Input__1az7j,.☕️_DataModule_TextArea__1az7j input.☕️_DataModule_Input__1az7j,.☕️_DataModule_TextArea__1az7j select.☕️_DataModule_Input__1az7j,.☕️_DataModule_TextArea__1az7j textarea.☕️_DataModule_Input__1az7j,.☕️_DataModule_Text__1az7j input.☕️_DataModule_Input__1az7j,.☕️_DataModule_Text__1az7j select.☕️_DataModule_Input__1az7j,.☕️_DataModule_Text__1az7j textarea.☕️_DataModule_Input__1az7j,.☕️_DataModule_Time__1az7j input.☕️_DataModule_Input__1az7j,.☕️_DataModule_Time__1az7j select.☕️_DataModule_Input__1az7j,.☕️_DataModule_Time__1az7j textarea.☕️_DataModule_Input__1az7j,.☕️_DataModule_Url__1az7j .☕️_DataModule_Week__1az7j input.☕️_DataModule_Input__1az7j,.☕️_DataModule_Url__1az7j .☕️_DataModule_Week__1az7j select.☕️_DataModule_Input__1az7j,.☕️_DataModule_Url__1az7j .☕️_DataModule_Week__1az7j textarea.☕️_DataModule_Input__1az7j{padding:.5em .75em;border-color:rgba(0,0,0,.5);box-shadow:inset 0 0 0 0 #daa520}.☕️_DataModule_Color__1az7j input.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Color__1az7j select.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Color__1az7j textarea.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Email__1az7j input.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Email__1az7j select.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Email__1az7j textarea.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_File__1az7j input.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_File__1az7j select.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_File__1az7j textarea.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Image__1az7j input.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Image__1az7j select.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Image__1az7j textarea.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Month__1az7j input.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Month__1az7j select.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Month__1az7j textarea.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Number__1az7j input.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Number__1az7j select.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Number__1az7j textarea.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Password__1az7j input.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Password__1az7j select.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Password__1az7j textarea.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Range__1az7j input.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Range__1az7j select.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Range__1az7j textarea.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Select__1az7j input.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Select__1az7j select.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Select__1az7j textarea.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Tel__1az7j input.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Tel__1az7j select.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Tel__1az7j textarea.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_TextArea__1az7j input.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_TextArea__1az7j select.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_TextArea__1az7j textarea.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Text__1az7j input.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Text__1az7j select.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Text__1az7j textarea.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Time__1az7j input.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Time__1az7j select.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Time__1az7j textarea.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Url__1az7j .☕️_DataModule_Week__1az7j input.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Url__1az7j .☕️_DataModule_Week__1az7j select.☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Url__1az7j .☕️_DataModule_Week__1az7j textarea.☕️_DataModule_Input__1az7j:focus{outline:none;box-shadow:inset 0 0 0 2px #daa520}.☕️_DataModule_Text__1az7j .☕️_DataModule_Input__1az7j:not(input){white-space:nowrap}.☕️_DataModule_TextArea__1az7j .☕️_DataModule_Input__1az7j{resize:none}.☕️_DataModule_Checkbox__1az7j label,.☕️_DataModule_Radio__1az7j label{display:block;margin:.5em 0}.☕️_DataModule_Checkbox__1az7j .☕️_DataModule_LabelText__1az7j,.☕️_DataModule_Radio__1az7j .☕️_DataModule_LabelText__1az7j{margin-left:.5em}.☕️_DataModule_Checkbox__1az7j .☕️_DataModule_Input__1az7j,.☕️_DataModule_Radio__1az7j .☕️_DataModule_Input__1az7j{position:relative;width:1.75em;height:1.75em;display:inline-block;vertical-align:middle;border:1px solid rgba(0,0,0,.5);box-shadow:inset 0 0 0 0 #daa520;transition:box-shadow .3s ease-in-out;-webkit-appearance:none;-moz-appearance:none;appearance:none}.☕️_DataModule_Checkbox__1az7j .☕️_DataModule_Input__1az7j:not(input),.☕️_DataModule_Radio__1az7j .☕️_DataModule_Input__1az7j:not(input){border-color:transparent}.☕️_DataModule_Checkbox__1az7j .☕️_DataModule_Input__1az7j:focus,.☕️_DataModule_Radio__1az7j .☕️_DataModule_Input__1az7j:focus{outline:none;box-shadow:inset 0 0 0 2px #daa520}.☕️_DataModule_Checkbox__1az7j .☕️_DataModule_Input__1az7j:after,.☕️_DataModule_Checkbox__1az7j .☕️_DataModule_Input__1az7j:before,.☕️_DataModule_Radio__1az7j .☕️_DataModule_Input__1az7j:after,.☕️_DataModule_Radio__1az7j .☕️_DataModule_Input__1az7j:before{content:\" \";background:#daa520;position:absolute;transition:transform .1s ease-out}.☕️_DataModule_Checkbox__1az7j .☕️_DataModule_Input__1az7j{border-radius:.25em}.☕️_DataModule_Checkbox__1az7j .☕️_DataModule_Input__1az7j:after,.☕️_DataModule_Checkbox__1az7j .☕️_DataModule_Input__1az7j:before{height:.25em;top:50%;left:50%}.☕️_DataModule_Checkbox__1az7j .☕️_DataModule_Input__1az7j:before{width:.625em;transform-origin:bottom right;transform:translate(-130%,100%) rotate(45deg) scale(0)}.☕️_DataModule_Checkbox__1az7j .☕️_DataModule_Input__1az7j:after{width:1.125em;transform-origin:bottom left;transform:translate(-15%,100%) rotate(-45deg) scale(0)}.☕️_DataModule_Checkbox__1az7j .☕️_DataModule_Input__1az7j:checked:before,.☕️_DataModule_Checkbox__1az7j .☕️_DataModule_Input__1az7j[data-checked]:before{transform:translate(-130%,100%) rotate(45deg) scale(1)}.☕️_DataModule_Checkbox__1az7j .☕️_DataModule_Input__1az7j:checked:after,.☕️_DataModule_Checkbox__1az7j .☕️_DataModule_Input__1az7j[data-checked]:after{transform:translate(-15%,100%) rotate(-45deg) scale(1)}.☕️_DataModule_Radio__1az7j .☕️_DataModule_Input__1az7j{border-radius:50%}.☕️_DataModule_Radio__1az7j .☕️_DataModule_Input__1az7j:before{border-radius:50%;width:1em;height:1em;top:50%;left:50%;transform:translate(-50%,-50%) scale(0)}.☕️_DataModule_Radio__1az7j .☕️_DataModule_Input__1az7j:checked:before,.☕️_DataModule_Radio__1az7j .☕️_DataModule_Input__1az7j[data-checked]:before{transform:translate(-50%,-50%) scale(1)}.☕️_DataModule_Select__1az7j select.☕️_DataModule_Input__1az7j{background:url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0ye2ZpbGw6IzQ0NH08L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xLjQxIDQuNjdsMS4wNy0xLjQ5IDEuMDYgMS40OUgxLjQxek0zLjU0IDUuMzNMMi40OCA2LjgyIDEuNDEgNS4zM2gyLjEzeiIvPjwvc3ZnPg==) no-repeat 98% 50%;-webkit-appearance:none;-moz-appearance:none;appearance:none}.☕️_DataModule_Error__1az7j{padding:1em;border:2px solid #900;background-color:#fcc;color:#900;border-radius:.5em;font-size:.875em;font-family:monospace}.☕️_DataModule_Error__1az7j h4{margin-bottom:.5em}.☕️_DataModule_Error__1az7j code{background-color:hsla(0,0%,100%,.5);padding:.125em .375em;border-radius:.25em}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRhdGFNb2R1bGUubW9kdWxlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNHlCQWNFLGdDQUFpQyxDQUNqQyxzQkFDRixDQUNBLHNqQ0FjRSxPQUNGLENBQ0EsMG9DQWNFLDJCQUE0QixDQUM1QiwrQkFBb0MsQ0FDcEMsNkJBQW9DLENBQ3BDLGlCQUFrQixDQUNsQiwrQ0FDRixDQUNBLDBvQ0FjRSxXQUNGLENBRUEsbzJCQWNFLGdCQUFrQixDQUNsQixhQUFjLENBQ2QsZUFDRixDQUVBLG9hQWNFLFVBQVcsQ0FDWCxTQUNGLENBQ0EsNHlCQWNFLGtCQUFtQixDQUNuQixrQkFBbUIsQ0FDbkIsY0FBZ0IsQ0FDaEIsb0JBQXFCLENBQ3JCLDRCQUE2QixDQUM3QixVQUFXLENBQ1gsbUJBQXFCLENBQ3JCLHFDQUNGLENBQ0EsOG9GQTBDRSxrQkFBcUIsQ0FDckIsMkJBQWdDLENBQ2hDLGdDQUNGLENBQ0EsMDRGQTBDRSxZQUFhLENBQ2Isa0NBQ0YsQ0FFQSxrRUFDRSxrQkFDRixDQUVBLDJEQUNFLFdBQ0YsQ0FFQSx1RUFFRSxhQUFjLENBQ2QsYUFDRixDQUNBLDJIQUVFLGdCQUNGLENBQ0EsbUhBRUUsaUJBQWtCLENBQ2xCLFlBQWEsQ0FDYixhQUFjLENBQ2Qsb0JBQXFCLENBQ3JCLHFCQUFzQixDQUN0QiwrQkFBb0MsQ0FDcEMsZ0NBQW1DLENBQ25DLHFDQUF3QyxDQUN4Qyx1QkFBd0IsQ0FDeEIsb0JBQXFCLENBQ3JCLGVBQ0YsQ0FDQSx5SUFFRSx3QkFDRixDQUNBLCtIQUVFLFlBQWEsQ0FDYixrQ0FDRixDQUNBLGdRQUdFLFdBQVksQ0FDWixrQkFBcUIsQ0FDckIsaUJBQWtCLENBQ2xCLGlDQUNGLENBRUEsMkRBQ0UsbUJBQ0YsQ0FDQSxtSUFDRSxZQUFjLENBQ2QsT0FBUSxDQUNSLFFBQ0YsQ0FDQSxrRUFDRSxZQUFjLENBQ2QsNkJBQThCLENBQzlCLHNEQUNGLENBQ0EsaUVBQ0UsYUFBYyxDQUNkLDRCQUE2QixDQUM3QixzREFDRixDQUNBLDBKQUNFLHNEQUNGLENBQ0Esd0pBQ0Usc0RBQ0YsQ0FFQSx3REFDRSxpQkFDRixDQUNBLCtEQUNFLGlCQUFrQixDQUNsQixTQUFVLENBQ1YsVUFBVyxDQUNYLE9BQVEsQ0FDUixRQUFTLENBQ1QsdUNBQ0YsQ0FDQSxvSkFDRSx1Q0FDRixDQUVBLCtEQUNFLG9ZQUFpZSxDQUNqZSx1QkFBd0IsQ0FDeEIsb0JBQXFCLENBQ3JCLGVBQ0YsQ0FFQSw0QkFDRSxXQUFZLENBQ1oscUJBQXNCLENBQ3RCLHFCQUFzQixDQUN0QixVQUFXLENBQ1gsa0JBQW9CLENBQ3BCLGdCQUFrQixDQUNsQixxQkFDRixDQUNBLCtCQUNFLGtCQUNGLENBQ0EsaUNBQ0UsbUNBQTBDLENBQzFDLHFCQUF3QixDQUN4QixtQkFDRiIsImZpbGUiOiJEYXRhTW9kdWxlLm1vZHVsZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLkNvbG9yIC5JbnB1dCxcbi5FbWFpbCAuSW5wdXQsXG4uRmlsZSAuSW5wdXQsXG4uSW1hZ2UgLklucHV0LFxuLk1vbnRoIC5JbnB1dCxcbi5OdW1iZXIgLklucHV0LFxuLlBhc3N3b3JkIC5JbnB1dCxcbi5SYW5nZSAuSW5wdXQsXG4uU2VsZWN0IC5JbnB1dCxcbi5UZWwgLklucHV0LFxuLlRleHQgLklucHV0LFxuLlRleHRBcmVhIC5JbnB1dCxcbi5UaW1lIC5JbnB1dCxcbi5VcmwgLldlZWsgLklucHV0IHtcbiAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xuICBzY3JvbGwtYmVoYXZpb3I6IHNtb290aDtcbn1cbi5Db2xvciAuSW5wdXQ6Oi13ZWJraXQtc2Nyb2xsYmFyLFxuLkVtYWlsIC5JbnB1dDo6LXdlYmtpdC1zY3JvbGxiYXIsXG4uRmlsZSAuSW5wdXQ6Oi13ZWJraXQtc2Nyb2xsYmFyLFxuLkltYWdlIC5JbnB1dDo6LXdlYmtpdC1zY3JvbGxiYXIsXG4uTW9udGggLklucHV0Ojotd2Via2l0LXNjcm9sbGJhcixcbi5OdW1iZXIgLklucHV0Ojotd2Via2l0LXNjcm9sbGJhcixcbi5QYXNzd29yZCAuSW5wdXQ6Oi13ZWJraXQtc2Nyb2xsYmFyLFxuLlJhbmdlIC5JbnB1dDo6LXdlYmtpdC1zY3JvbGxiYXIsXG4uU2VsZWN0IC5JbnB1dDo6LXdlYmtpdC1zY3JvbGxiYXIsXG4uVGVsIC5JbnB1dDo6LXdlYmtpdC1zY3JvbGxiYXIsXG4uVGV4dCAuSW5wdXQ6Oi13ZWJraXQtc2Nyb2xsYmFyLFxuLlRleHRBcmVhIC5JbnB1dDo6LXdlYmtpdC1zY3JvbGxiYXIsXG4uVGltZSAuSW5wdXQ6Oi13ZWJraXQtc2Nyb2xsYmFyLFxuLlVybCAuV2VlayAuSW5wdXQ6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgd2lkdGg6IDA7XG59XG4uQ29sb3IgLklucHV0Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYixcbi5FbWFpbCAuSW5wdXQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iLFxuLkZpbGUgLklucHV0Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYixcbi5JbWFnZSAuSW5wdXQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iLFxuLk1vbnRoIC5JbnB1dDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIsXG4uTnVtYmVyIC5JbnB1dDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIsXG4uUGFzc3dvcmQgLklucHV0Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYixcbi5SYW5nZSAuSW5wdXQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iLFxuLlNlbGVjdCAuSW5wdXQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iLFxuLlRlbCAuSW5wdXQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iLFxuLlRleHQgLklucHV0Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYixcbi5UZXh0QXJlYSAuSW5wdXQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iLFxuLlRpbWUgLklucHV0Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYixcbi5VcmwgLldlZWsgLklucHV0Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gIGJhY2tncm91bmQtY2xpcDogY29udGVudC1ib3g7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcbiAgYm9yZGVyOiAwLjNlbSBzb2xpZCByZ2JhKDAsIDAsIDAsIDApO1xuICBib3JkZXItcmFkaXVzOiAxZW07XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDAuMDVlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XG59XG4uQ29sb3IgLklucHV0OmhvdmVyOjotd2Via2l0LXNjcm9sbGJhcixcbi5FbWFpbCAuSW5wdXQ6aG92ZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLFxuLkZpbGUgLklucHV0OmhvdmVyOjotd2Via2l0LXNjcm9sbGJhcixcbi5JbWFnZSAuSW5wdXQ6aG92ZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLFxuLk1vbnRoIC5JbnB1dDpob3Zlcjo6LXdlYmtpdC1zY3JvbGxiYXIsXG4uTnVtYmVyIC5JbnB1dDpob3Zlcjo6LXdlYmtpdC1zY3JvbGxiYXIsXG4uUGFzc3dvcmQgLklucHV0OmhvdmVyOjotd2Via2l0LXNjcm9sbGJhcixcbi5SYW5nZSAuSW5wdXQ6aG92ZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLFxuLlNlbGVjdCAuSW5wdXQ6aG92ZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLFxuLlRlbCAuSW5wdXQ6aG92ZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLFxuLlRleHQgLklucHV0OmhvdmVyOjotd2Via2l0LXNjcm9sbGJhcixcbi5UZXh0QXJlYSAuSW5wdXQ6aG92ZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLFxuLlRpbWUgLklucHV0OmhvdmVyOjotd2Via2l0LXNjcm9sbGJhcixcbi5VcmwgLldlZWsgLklucHV0OmhvdmVyOjotd2Via2l0LXNjcm9sbGJhciB7XG4gIHdpZHRoOiAwLjY1ZW07XG59XG5cbi5Db2xvciAuTGFiZWxUZXh0LFxuLkVtYWlsIC5MYWJlbFRleHQsXG4uRmlsZSAuTGFiZWxUZXh0LFxuLkltYWdlIC5MYWJlbFRleHQsXG4uTW9udGggLkxhYmVsVGV4dCxcbi5OdW1iZXIgLkxhYmVsVGV4dCxcbi5QYXNzd29yZCAuTGFiZWxUZXh0LFxuLlJhbmdlIC5MYWJlbFRleHQsXG4uU2VsZWN0IC5MYWJlbFRleHQsXG4uVGVsIC5MYWJlbFRleHQsXG4uVGV4dCAuTGFiZWxUZXh0LFxuLlRleHRBcmVhIC5MYWJlbFRleHQsXG4uVGltZSAuTGFiZWxUZXh0LFxuLlVybCAuV2VlayAuTGFiZWxUZXh0IHtcbiAgZm9udC1zaXplOiAwLjg3NWVtO1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLkNvbG9yLFxuLkVtYWlsLFxuLkZpbGUsXG4uSW1hZ2UsXG4uTW9udGgsXG4uTnVtYmVyLFxuLlBhc3N3b3JkLFxuLlJhbmdlLFxuLlNlbGVjdCxcbi5UZWwsXG4uVGV4dCxcbi5UZXh0QXJlYSxcbi5UaW1lLFxuLlVybCAuV2VlayB7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAwO1xufVxuLkNvbG9yIC5JbnB1dCxcbi5FbWFpbCAuSW5wdXQsXG4uRmlsZSAuSW5wdXQsXG4uSW1hZ2UgLklucHV0LFxuLk1vbnRoIC5JbnB1dCxcbi5OdW1iZXIgLklucHV0LFxuLlBhc3N3b3JkIC5JbnB1dCxcbi5SYW5nZSAuSW5wdXQsXG4uU2VsZWN0IC5JbnB1dCxcbi5UZWwgLklucHV0LFxuLlRleHQgLklucHV0LFxuLlRleHRBcmVhIC5JbnB1dCxcbi5UaW1lIC5JbnB1dCxcbi5VcmwgLldlZWsgLklucHV0IHtcbiAgb3ZlcmZsb3cteDogb3ZlcmxheTtcbiAgbGluZS1oZWlnaHQ6IDEuMzVlbTtcbiAgcGFkZGluZzogMC41ZW0gMDtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDAuMjVlbTtcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAzMDBtcyBlYXNlLWluLW91dDtcbn1cbi5Db2xvciBpbnB1dC5JbnB1dCxcbi5FbWFpbCBpbnB1dC5JbnB1dCxcbi5GaWxlIGlucHV0LklucHV0LFxuLkltYWdlIGlucHV0LklucHV0LFxuLk1vbnRoIGlucHV0LklucHV0LFxuLk51bWJlciBpbnB1dC5JbnB1dCxcbi5QYXNzd29yZCBpbnB1dC5JbnB1dCxcbi5SYW5nZSBpbnB1dC5JbnB1dCxcbi5TZWxlY3QgaW5wdXQuSW5wdXQsXG4uVGVsIGlucHV0LklucHV0LFxuLlRleHQgaW5wdXQuSW5wdXQsXG4uVGV4dEFyZWEgaW5wdXQuSW5wdXQsXG4uVGltZSBpbnB1dC5JbnB1dCxcbi5VcmwgLldlZWsgaW5wdXQuSW5wdXQsXG4uQ29sb3Igc2VsZWN0LklucHV0LFxuLkVtYWlsIHNlbGVjdC5JbnB1dCxcbi5GaWxlIHNlbGVjdC5JbnB1dCxcbi5JbWFnZSBzZWxlY3QuSW5wdXQsXG4uTW9udGggc2VsZWN0LklucHV0LFxuLk51bWJlciBzZWxlY3QuSW5wdXQsXG4uUGFzc3dvcmQgc2VsZWN0LklucHV0LFxuLlJhbmdlIHNlbGVjdC5JbnB1dCxcbi5TZWxlY3Qgc2VsZWN0LklucHV0LFxuLlRlbCBzZWxlY3QuSW5wdXQsXG4uVGV4dCBzZWxlY3QuSW5wdXQsXG4uVGV4dEFyZWEgc2VsZWN0LklucHV0LFxuLlRpbWUgc2VsZWN0LklucHV0LFxuLlVybCAuV2VlayBzZWxlY3QuSW5wdXQsXG4uQ29sb3IgdGV4dGFyZWEuSW5wdXQsXG4uRW1haWwgdGV4dGFyZWEuSW5wdXQsXG4uRmlsZSB0ZXh0YXJlYS5JbnB1dCxcbi5JbWFnZSB0ZXh0YXJlYS5JbnB1dCxcbi5Nb250aCB0ZXh0YXJlYS5JbnB1dCxcbi5OdW1iZXIgdGV4dGFyZWEuSW5wdXQsXG4uUGFzc3dvcmQgdGV4dGFyZWEuSW5wdXQsXG4uUmFuZ2UgdGV4dGFyZWEuSW5wdXQsXG4uU2VsZWN0IHRleHRhcmVhLklucHV0LFxuLlRlbCB0ZXh0YXJlYS5JbnB1dCxcbi5UZXh0IHRleHRhcmVhLklucHV0LFxuLlRleHRBcmVhIHRleHRhcmVhLklucHV0LFxuLlRpbWUgdGV4dGFyZWEuSW5wdXQsXG4uVXJsIC5XZWVrIHRleHRhcmVhLklucHV0IHtcbiAgcGFkZGluZzogMC41ZW0gMC43NWVtO1xuICBib3JkZXItY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgMCBnb2xkZW5yb2Q7XG59XG4uQ29sb3IgaW5wdXQuSW5wdXQ6Zm9jdXMsXG4uRW1haWwgaW5wdXQuSW5wdXQ6Zm9jdXMsXG4uRmlsZSBpbnB1dC5JbnB1dDpmb2N1cyxcbi5JbWFnZSBpbnB1dC5JbnB1dDpmb2N1cyxcbi5Nb250aCBpbnB1dC5JbnB1dDpmb2N1cyxcbi5OdW1iZXIgaW5wdXQuSW5wdXQ6Zm9jdXMsXG4uUGFzc3dvcmQgaW5wdXQuSW5wdXQ6Zm9jdXMsXG4uUmFuZ2UgaW5wdXQuSW5wdXQ6Zm9jdXMsXG4uU2VsZWN0IGlucHV0LklucHV0OmZvY3VzLFxuLlRlbCBpbnB1dC5JbnB1dDpmb2N1cyxcbi5UZXh0IGlucHV0LklucHV0OmZvY3VzLFxuLlRleHRBcmVhIGlucHV0LklucHV0OmZvY3VzLFxuLlRpbWUgaW5wdXQuSW5wdXQ6Zm9jdXMsXG4uVXJsIC5XZWVrIGlucHV0LklucHV0OmZvY3VzLFxuLkNvbG9yIHNlbGVjdC5JbnB1dDpmb2N1cyxcbi5FbWFpbCBzZWxlY3QuSW5wdXQ6Zm9jdXMsXG4uRmlsZSBzZWxlY3QuSW5wdXQ6Zm9jdXMsXG4uSW1hZ2Ugc2VsZWN0LklucHV0OmZvY3VzLFxuLk1vbnRoIHNlbGVjdC5JbnB1dDpmb2N1cyxcbi5OdW1iZXIgc2VsZWN0LklucHV0OmZvY3VzLFxuLlBhc3N3b3JkIHNlbGVjdC5JbnB1dDpmb2N1cyxcbi5SYW5nZSBzZWxlY3QuSW5wdXQ6Zm9jdXMsXG4uU2VsZWN0IHNlbGVjdC5JbnB1dDpmb2N1cyxcbi5UZWwgc2VsZWN0LklucHV0OmZvY3VzLFxuLlRleHQgc2VsZWN0LklucHV0OmZvY3VzLFxuLlRleHRBcmVhIHNlbGVjdC5JbnB1dDpmb2N1cyxcbi5UaW1lIHNlbGVjdC5JbnB1dDpmb2N1cyxcbi5VcmwgLldlZWsgc2VsZWN0LklucHV0OmZvY3VzLFxuLkNvbG9yIHRleHRhcmVhLklucHV0OmZvY3VzLFxuLkVtYWlsIHRleHRhcmVhLklucHV0OmZvY3VzLFxuLkZpbGUgdGV4dGFyZWEuSW5wdXQ6Zm9jdXMsXG4uSW1hZ2UgdGV4dGFyZWEuSW5wdXQ6Zm9jdXMsXG4uTW9udGggdGV4dGFyZWEuSW5wdXQ6Zm9jdXMsXG4uTnVtYmVyIHRleHRhcmVhLklucHV0OmZvY3VzLFxuLlBhc3N3b3JkIHRleHRhcmVhLklucHV0OmZvY3VzLFxuLlJhbmdlIHRleHRhcmVhLklucHV0OmZvY3VzLFxuLlNlbGVjdCB0ZXh0YXJlYS5JbnB1dDpmb2N1cyxcbi5UZWwgdGV4dGFyZWEuSW5wdXQ6Zm9jdXMsXG4uVGV4dCB0ZXh0YXJlYS5JbnB1dDpmb2N1cyxcbi5UZXh0QXJlYSB0ZXh0YXJlYS5JbnB1dDpmb2N1cyxcbi5UaW1lIHRleHRhcmVhLklucHV0OmZvY3VzLFxuLlVybCAuV2VlayB0ZXh0YXJlYS5JbnB1dDpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDJweCBnb2xkZW5yb2Q7XG59XG5cbi5UZXh0IC5JbnB1dDpub3QoaW5wdXQpIHtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLlRleHRBcmVhIC5JbnB1dCB7XG4gIHJlc2l6ZTogbm9uZTtcbn1cblxuLkNoZWNrYm94IGxhYmVsLFxuLlJhZGlvIGxhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogMC41ZW0gMDtcbn1cbi5DaGVja2JveCAuTGFiZWxUZXh0LFxuLlJhZGlvIC5MYWJlbFRleHQge1xuICBtYXJnaW4tbGVmdDogMC41ZW07XG59XG4uQ2hlY2tib3ggLklucHV0LFxuLlJhZGlvIC5JbnB1dCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDEuNzVlbTtcbiAgaGVpZ2h0OiAxLjc1ZW07XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjUpO1xuICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAwIGdvbGRlbnJvZDtcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAzMDBtcyBlYXNlLWluLW91dDtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG59XG4uQ2hlY2tib3ggLklucHV0Om5vdChpbnB1dCksXG4uUmFkaW8gLklucHV0Om5vdChpbnB1dCkge1xuICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xufVxuLkNoZWNrYm94IC5JbnB1dDpmb2N1cyxcbi5SYWRpbyAuSW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xuICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAycHggZ29sZGVucm9kO1xufVxuLkNoZWNrYm94IC5JbnB1dDpiZWZvcmUsIC5DaGVja2JveCAuSW5wdXQ6YWZ0ZXIsXG4uUmFkaW8gLklucHV0OmJlZm9yZSxcbi5SYWRpbyAuSW5wdXQ6YWZ0ZXIge1xuICBjb250ZW50OiBcIiBcIjtcbiAgYmFja2dyb3VuZDogZ29sZGVucm9kO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxMDBtcyBlYXNlLW91dDtcbn1cblxuLkNoZWNrYm94IC5JbnB1dCB7XG4gIGJvcmRlci1yYWRpdXM6IDAuMjVlbTtcbn1cbi5DaGVja2JveCAuSW5wdXQ6YmVmb3JlLCAuQ2hlY2tib3ggLklucHV0OmFmdGVyIHtcbiAgaGVpZ2h0OiAwLjI1ZW07XG4gIHRvcDogNTAlO1xuICBsZWZ0OiA1MCU7XG59XG4uQ2hlY2tib3ggLklucHV0OmJlZm9yZSB7XG4gIHdpZHRoOiAwLjYyNWVtO1xuICB0cmFuc2Zvcm0tb3JpZ2luOiBib3R0b20gcmlnaHQ7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xMzAlLCAxMDAlKSByb3RhdGUoNDVkZWcpIHNjYWxlKDApO1xufVxuLkNoZWNrYm94IC5JbnB1dDphZnRlciB7XG4gIHdpZHRoOiAxLjEyNWVtO1xuICB0cmFuc2Zvcm0tb3JpZ2luOiBib3R0b20gbGVmdDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE1JSwgMTAwJSkgcm90YXRlKC00NWRlZykgc2NhbGUoMCk7XG59XG4uQ2hlY2tib3ggLklucHV0OmNoZWNrZWQ6YmVmb3JlLCAuQ2hlY2tib3ggLklucHV0W2RhdGEtY2hlY2tlZF06YmVmb3JlIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEzMCUsIDEwMCUpIHJvdGF0ZSg0NWRlZykgc2NhbGUoMSk7XG59XG4uQ2hlY2tib3ggLklucHV0OmNoZWNrZWQ6YWZ0ZXIsIC5DaGVja2JveCAuSW5wdXRbZGF0YS1jaGVja2VkXTphZnRlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNSUsIDEwMCUpIHJvdGF0ZSgtNDVkZWcpIHNjYWxlKDEpO1xufVxuXG4uUmFkaW8gLklucHV0IHtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xufVxuLlJhZGlvIC5JbnB1dDpiZWZvcmUge1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIHdpZHRoOiAxZW07XG4gIGhlaWdodDogMWVtO1xuICB0b3A6IDUwJTtcbiAgbGVmdDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgwKTtcbn1cbi5SYWRpbyAuSW5wdXQ6Y2hlY2tlZDpiZWZvcmUsIC5SYWRpbyAuSW5wdXRbZGF0YS1jaGVja2VkXTpiZWZvcmUge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgxKTtcbn1cblxuLlNlbGVjdCBzZWxlY3QuSW5wdXQge1xuICBiYWNrZ3JvdW5kOiB1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCcFpEMGlUR0Y1WlhKZk1TSWdaR0YwWVMxdVlXMWxQU0pNWVhsbGNpQXhJaUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSFpwWlhkQ2IzZzlJakFnTUNBMExqazFJREV3SWo0OFpHVm1jejQ4YzNSNWJHVStMbU5zY3kweWUyWnBiR3c2SXpRME5EdDlQQzl6ZEhsc1pUNDhMMlJsWm5NK1BIUnBkR3hsUG1GeWNtOTNjend2ZEdsMGJHVStQSEJ2YkhsbmIyNGdZMnhoYzNNOUltTnNjeTB5SWlCd2IybHVkSE05SWpFdU5ERWdOQzQyTnlBeUxqUTRJRE11TVRnZ015NDFOQ0EwTGpZM0lERXVOREVnTkM0Mk55SXZQanh3YjJ4NVoyOXVJR05zWVhOelBTSmpiSE10TWlJZ2NHOXBiblJ6UFNJekxqVTBJRFV1TXpNZ01pNDBPQ0EyTGpneUlERXVOREVnTlM0ek15QXpMalUwSURVdU16TWlMejQ4TDNOMlp6ND0pIG5vLXJlcGVhdCA5OCUgNTAlO1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbn1cblxuLkVycm9yIHtcbiAgcGFkZGluZzogMWVtO1xuICBib3JkZXI6IDJweCBzb2xpZCAjOTAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmNjO1xuICBjb2xvcjogIzkwMDtcbiAgYm9yZGVyLXJhZGl1czogMC41ZW07XG4gIGZvbnQtc2l6ZTogMC44NzVlbTtcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbn1cbi5FcnJvciBoNCB7XG4gIG1hcmdpbi1ib3R0b206IDAuNWVtO1xufVxuLkVycm9yIGNvZGUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSk7XG4gIHBhZGRpbmc6IDAuMTI1ZW0gMC4zNzVlbTtcbiAgYm9yZGVyLXJhZGl1czogMC4yNWVtO1xufSJdfQ== */";
var styles = {"Color":"☕️_DataModule_Color__1az7j","Input":"☕️_DataModule_Input__1az7j","Email":"☕️_DataModule_Email__1az7j","File":"☕️_DataModule_File__1az7j","Image":"☕️_DataModule_Image__1az7j","Month":"☕️_DataModule_Month__1az7j","Number":"☕️_DataModule_Number__1az7j","Password":"☕️_DataModule_Password__1az7j","Range":"☕️_DataModule_Range__1az7j","Select":"☕️_DataModule_Select__1az7j","Tel":"☕️_DataModule_Tel__1az7j","Text":"☕️_DataModule_Text__1az7j","TextArea":"☕️_DataModule_TextArea__1az7j","Time":"☕️_DataModule_Time__1az7j","Url":"☕️_DataModule_Url__1az7j","Week":"☕️_DataModule_Week__1az7j","LabelText":"☕️_DataModule_LabelText__1az7j","Checkbox":"☕️_DataModule_Checkbox__1az7j","Radio":"☕️_DataModule_Radio__1az7j","Error":"☕️_DataModule_Error__1az7j"};
styleInject(css_248z);

var _excluded$l = ["moduleName", "moduleOptions"];
var propTypes$n = {
  moduleName: pt$1.string.isRequired,
  moduleOptions: pt$1.arrayOf(pt$1.object).isRequired
};
var cx = classNames$1.bind(styles);

var ModuleError = function ModuleError(_ref) {
  var moduleName = _ref.moduleName,
      moduleOptions = _ref.moduleOptions,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$l);

  var message = moduleName + " is not a valid value for module. Try using one of [" + moduleOptions.join(', ') + "]"; // eslint-disable-next-line no-console -- we need to display this error to develop

  console.error(message);
  return /*#__PURE__*/React.createElement("div", {
    className: cx('Error', rest.className),
    "data-testid": 'module-error'
  }, message);
};

ModuleError.propTypes = propTypes$n;

var _excluded$k = ["actionName", "content", "isLabeled"],
    _excluded2 = ["label"];
var propTypes$m = {
  /** DEPRECATED: please use 'name' instead */
  actionName: pt$1.string,

  /** An action needs to have a unique text relative to its context */
  content: pt$1.string,

  /** PRIVATE: Shows a label */
  isLabeled: pt$1.bool,

  /** DEPRECATED: please use 'content' instead */
  label: pt$1.string,

  /** Every action must have a name */
  name: pt$1.string
};

var ActionButton = function ActionButton(_ref) {
  var actionName = _ref.actionName,
      content = _ref.content;
      _ref.isLabeled;
      var rest = _objectWithoutPropertiesLoose(_ref, _excluded$k);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      onAction = _useContext.onAction,
      record = _useContext.record,
      data = _useContext.data; // @bje we need to decide if we go for content or label here, both makes no sense


  var label = rest.label,
      restWithoutLabel = _objectWithoutPropertiesLoose(rest, _excluded2); //
  // initially, this was called actionName, but now we ...spread
  // all props into the button. So the correct way of calling it
  // is just 'name'.
  //
  // This is a breaking change. in order to prevent any breakage
  // in the our Apps, we are temporarily deriving it from one if
  // the other is not passed. Once we have the resources to go
  // and update our Apps we will revisit.


  var name = actionName || rest.name; // FDS-137: use action name for button name if no content is specified

  var buttonText = content || label || name;
  var handleClick = useCallback(function (_ref2) {
    var currentTarget = _ref2.currentTarget;
    onAction && onAction(currentTarget, record || data);
  }, [data, onAction, record]);
  return isEditing ? null : /*#__PURE__*/React.createElement(Button$1, _extends({}, restWithoutLabel, {
    "aria-label": label,
    className: "ui basic button",
    name: name,
    onClick: handleClick,
    type: "button"
  }), buttonText);
};

ActionButton.propTypes = propTypes$m;

var propTypes$l = {
  /** An optional text label for the cancel button */
  cancelLabel: pt$1.node,

  /** An optional text label for the edit button */
  editLabel: pt$1.node,

  /** An optional text label for the save button */
  saveLabel: pt$1.node
};
var DEFAULT_EDIT = /*#__PURE__*/React.createElement(InlineIcon, {
  icon: pencilIcon
});
var DEFAULT_CANCEL = /*#__PURE__*/React.createElement(InlineIcon, {
  icon: closeIcon
});
var DEFAULT_SAVE = /*#__PURE__*/React.createElement(InlineIcon, {
  icon: checkIcon
});

var ActionEdit = function ActionEdit(_ref) {
  var _ref$cancelLabel = _ref.cancelLabel,
      cancelLabel = _ref$cancelLabel === void 0 ? DEFAULT_CANCEL : _ref$cancelLabel,
      _ref$editLabel = _ref.editLabel,
      editLabel = _ref$editLabel === void 0 ? DEFAULT_EDIT : _ref$editLabel,
      _ref$saveLabel = _ref.saveLabel,
      saveLabel = _ref$saveLabel === void 0 ? DEFAULT_SAVE : _ref$saveLabel;

  var _useContext = useContext(ModuleContext),
      idOfRecordInEditMode = _useContext.idOfRecordInEditMode,
      isEditing = _useContext.isEditing,
      enterEditMode = _useContext.enterEditMode,
      exitEditMode = _useContext.exitEditMode,
      formMethods = _useContext.formMethods,
      record = _useContext.record,
      onAction = _useContext.onAction,
      uniqueIdAttribute = _useContext.uniqueIdAttribute;

  var handleSubmit = formMethods.handleSubmit,
      formState = formMethods.formState,
      reset = formMethods.reset;
  var isDirty = formState.isDirty,
      isSubmitting = formState.isSubmitting;
  var recordId = uniqueIdAttribute && record && record[uniqueIdAttribute];
  var whenAnotherRowIsEditing = Boolean(idOfRecordInEditMode);
  var handleReset = useCallback(function () {
    if (typeof onAction === 'function') {
      onAction( // fake target
      {
        name: 'edit.cancel'
      }, _extends({}, record));
    }

    exitEditMode();
  }, [exitEditMode, onAction, record]);
  var handleCancel = useCallback(function () {
    isDirty ? // eslint-disable-next-line no-restricted-globals, no-alert -- For now we do not have our own confirmation dialog so we are using native confirms
    confirm('Abandon unsaved changes?') && handleReset() : handleReset();
  }, [handleReset, isDirty]);
  var handleEdit = useCallback(function () {
    // FDS-91: We are resetting the form with whatever is in record.
    // We don't know if this is the best way to do it in React.
    reset(_extends({}, record));

    if (typeof onAction === 'function') {
      onAction( // fake target
      {
        name: 'edit.start'
      }, _extends({}, record));
    }

    enterEditMode && enterEditMode(recordId);
  }, [enterEditMode, onAction, record, recordId, reset]);
  var onSubmit = useCallback(function (data) {
    if (typeof onAction === 'function') {
      onAction( // fake target
      {
        name: 'edit.save'
      }, _extends({}, record, data));
    }

    exitEditMode && exitEditMode();
  }, [exitEditMode, onAction, record]);
  return isEditing ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button$1, {
    "aria-label": "Cancel",
    className: "ui negative icon button",
    disabled: isSubmitting,
    name: "edit.cancel",
    onClick: handleCancel,
    type: "button"
  }, cancelLabel), /*#__PURE__*/React.createElement(Button$1, {
    "aria-label": "Save",
    className: "ui positive icon button",
    disabled: !isDirty || isSubmitting,
    name: "edit.save",
    onClick: handleSubmit(onSubmit),
    type: "button"
  }, saveLabel)) : /*#__PURE__*/React.createElement(Button$1, {
    "aria-label": "Edit",
    className: "ui basic icon button",
    disabled: whenAnotherRowIsEditing,
    name: "edit.start",
    onClick: handleEdit,
    type: "button"
  }, editLabel);
};

ActionEdit.propTypes = propTypes$l;

var ModuleErrorFallback = function ModuleErrorFallback() {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.Error,
    role: "alert"
  }, "Error");
};

var propTypes$k = {
  children: pt$1.oneOfType([pt$1.arrayOf(pt$1.node), pt$1.node])
};

var ModuleErrorBoundary = function ModuleErrorBoundary(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement(Boundaries, {
    ErrorComponent: ModuleErrorFallback
  }, children);
};

ModuleErrorBoundary.propTypes = propTypes$k;

var getAccessibleLabelSetters = function getAccessibleLabelSetters(isLabeled, label) {
  var setAriaLabel = isLabeled ? undefined : label;
  var setHtmlFor = isLabeled ? label : undefined;
  return {
    setAriaLabel: setAriaLabel,
    setHtmlFor: setHtmlFor
  };
};

var _excluded$j = ["attribute", "isEditable", "isLabeled", "label", "value"];
var propTypes$j = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt$1.string,

  /** A Module can be defined to not present an editing state */
  isEditable: pt$1.bool,

  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt$1.bool,

  /** A Module needs to have a unique label relative to its context */
  label: pt$1.string,

  /** A Module can have a value */
  value: pt$1.string
};

var DataColor = function DataColor(_ref) {
  var attribute = _ref.attribute,
      _ref$isEditable = _ref.isEditable,
      isEditable = _ref$isEditable === void 0 ? true : _ref$isEditable,
      _ref$isLabeled = _ref.isLabeled,
      isLabeled = _ref$isLabeled === void 0 ? true : _ref$isLabeled,
      label = _ref.label,
      value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$j);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      formMethods = _useContext.formMethods;

  var _getAccessibleLabelSe = getAccessibleLabelSetters(isLabeled, label),
      setAriaLabel = _getAccessibleLabelSe.setAriaLabel,
      setHtmlFor = _getAccessibleLabelSe.setHtmlFor;

  var renderEditing = /*#__PURE__*/React.createElement("label", {
    htmlFor: setHtmlFor
  }, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement(Input, _extends({}, rest, {
    "aria-label": setAriaLabel,
    className: styles.Color,
    defaultValue: value,
    id: label,
    name: attribute || label,
    ref: formMethods === null || formMethods === void 0 ? void 0 : formMethods.register,
    type: "color"
  })));
  var renderDisplay = /*#__PURE__*/React.createElement("span", null, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement("span", _extends({
    "aria-label": label,
    className: styles.Color
  }, rest), value)); // Do not render an editable input if the module is not editable

  return /*#__PURE__*/React.createElement(ModuleErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: styles.Color
  }, isEditing && isEditable ? renderEditing : renderDisplay));
};

DataColor.propTypes = propTypes$j;

var _excluded$i = ["attribute", "isEditable", "isLabeled", "label", "value"];
var propTypes$i = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt$1.string,

  /** A Module can be defined to not present an editing state */
  isEditable: pt$1.bool,

  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt$1.bool,

  /** A Module needs to have a unique label relative to its context */
  label: pt$1.string,

  /** A Module can have a value */
  value: pt$1.bool
};

var DataCheckbox = function DataCheckbox(_ref) {
  var attribute = _ref.attribute,
      _ref$isEditable = _ref.isEditable,
      isEditable = _ref$isEditable === void 0 ? true : _ref$isEditable,
      _ref$isLabeled = _ref.isLabeled,
      isLabeled = _ref$isLabeled === void 0 ? true : _ref$isLabeled,
      label = _ref.label,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? false : _ref$value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$i);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      formMethods = _useContext.formMethods;

  var _getAccessibleLabelSe = getAccessibleLabelSetters(isLabeled, label),
      setAriaLabel = _getAccessibleLabelSe.setAriaLabel,
      setHtmlFor = _getAccessibleLabelSe.setHtmlFor;

  var checkbox = useCheckboxState({
    state: Boolean(value)
  });
  var renderEditing = /*#__PURE__*/React.createElement("label", {
    htmlFor: setHtmlFor
  }, /*#__PURE__*/React.createElement(Checkbox, _extends({}, rest, checkbox, {
    "aria-label": setAriaLabel,
    className: styles.Input,
    id: label,
    name: attribute || label,
    ref: formMethods === null || formMethods === void 0 ? void 0 : formMethods.register
  })), label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label));
  var renderDisplay = /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", _extends({
    className: styles.Input,
    "data-checked": value ? true : undefined
  }, rest), value), label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label)); // Do not render an editable input if the module is not editable

  return /*#__PURE__*/React.createElement(ModuleErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: styles.Checkbox
  }, isEditing && isEditable ? renderEditing : renderDisplay));
};

DataCheckbox.propTypes = propTypes$i;

var _excluded$h = ["attribute", "isEditable", "isLabeled", "label", "value"];
var propTypes$h = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt$1.string,

  /** A Module can be defined to not present an editing state */
  isEditable: pt$1.bool,

  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt$1.bool,

  /** A Module needs to have a unique label relative to its context */
  label: pt$1.string,

  /** A Module can have a value */
  value: pt$1.string
};

var DataDate = function DataDate(_ref) {
  var attribute = _ref.attribute,
      _ref$isEditable = _ref.isEditable,
      isEditable = _ref$isEditable === void 0 ? true : _ref$isEditable,
      _ref$isLabeled = _ref.isLabeled,
      isLabeled = _ref$isLabeled === void 0 ? true : _ref$isLabeled,
      label = _ref.label,
      value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$h);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      formMethods = _useContext.formMethods;

  var renderEditing = /*#__PURE__*/React.createElement("label", {
    htmlFor: label
  }, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement(Input, _extends({}, rest, {
    "aria-label": label,
    className: styles.Input,
    defaultValue: value,
    id: label,
    name: attribute || label,
    ref: formMethods === null || formMethods === void 0 ? void 0 : formMethods.register,
    type: "date"
  })));
  var renderDisplay = /*#__PURE__*/React.createElement("span", null, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement("span", _extends({
    className: styles.Input
  }, rest), value)); // Do not render an editable input if the module is not editable

  return /*#__PURE__*/React.createElement(ModuleErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: styles.Text
  }, isEditing && isEditable ? renderEditing : renderDisplay));
};

DataDate.propTypes = propTypes$h;

var _excluded$g = ["attribute", "isEditable", "isLabeled", "label", "value"];
var propTypes$g = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt$1.string,

  /** A Module can be defined to not present an editing state */
  isEditable: pt$1.bool,

  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt$1.bool,

  /** A Module needs to have a unique label relative to its context */
  label: pt$1.string,

  /** A Module can have a value */
  value: pt$1.string
};

var DataDateTime = function DataDateTime(_ref) {
  var attribute = _ref.attribute,
      _ref$isEditable = _ref.isEditable,
      isEditable = _ref$isEditable === void 0 ? true : _ref$isEditable,
      _ref$isLabeled = _ref.isLabeled,
      isLabeled = _ref$isLabeled === void 0 ? true : _ref$isLabeled,
      label = _ref.label,
      value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$g);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      formMethods = _useContext.formMethods;

  var _getAccessibleLabelSe = getAccessibleLabelSetters(isLabeled, label),
      setAriaLabel = _getAccessibleLabelSe.setAriaLabel,
      setHtmlFor = _getAccessibleLabelSe.setHtmlFor;

  var renderEditing = /*#__PURE__*/React.createElement("label", {
    htmlFor: setHtmlFor
  }, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement(Input, _extends({}, rest, {
    "aria-label": setAriaLabel,
    className: styles.Input,
    defaultValue: value,
    id: label,
    name: attribute || label,
    ref: formMethods === null || formMethods === void 0 ? void 0 : formMethods.register,
    type: "datetime-local"
  })));
  var renderDisplay = /*#__PURE__*/React.createElement("span", null, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement("span", _extends({
    "aria-label": label,
    className: styles.Input
  }, rest), value)); // Do not render an editable input if the module is not editable

  return /*#__PURE__*/React.createElement(ModuleErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: styles.Text
  }, isEditing && isEditable ? renderEditing : renderDisplay));
};

DataDateTime.propTypes = propTypes$g;

var _excluded$f = ["attribute", "isEditable", "isLabeled", "label", "value"];
var propTypes$f = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt$1.string,

  /** A Module can be defined to not present an editing state */
  isEditable: pt$1.bool,

  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt$1.bool,

  /** A Module needs to have a unique label relative to its context */
  label: pt$1.string,

  /** A Module can have a value */
  value: pt$1.string
};

var DataEmail = function DataEmail(_ref) {
  var attribute = _ref.attribute,
      _ref$isEditable = _ref.isEditable,
      isEditable = _ref$isEditable === void 0 ? true : _ref$isEditable,
      _ref$isLabeled = _ref.isLabeled,
      isLabeled = _ref$isLabeled === void 0 ? true : _ref$isLabeled,
      label = _ref.label,
      value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$f);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      formMethods = _useContext.formMethods;

  var _getAccessibleLabelSe = getAccessibleLabelSetters(isLabeled, label),
      setAriaLabel = _getAccessibleLabelSe.setAriaLabel,
      setHtmlFor = _getAccessibleLabelSe.setHtmlFor;

  var renderEditing = /*#__PURE__*/React.createElement("label", {
    htmlFor: setHtmlFor
  }, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement(Input, _extends({}, rest, {
    "aria-label": setAriaLabel,
    className: styles.Input,
    defaultValue: value,
    id: label,
    name: attribute || label,
    ref: formMethods === null || formMethods === void 0 ? void 0 : formMethods.register,
    type: "email"
  })));
  var renderDisplay = /*#__PURE__*/React.createElement("span", null, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement("span", _extends({
    "aria-label": label,
    className: styles.Input
  }, rest), value)); // Do not render an editable input if the module is not editable

  return /*#__PURE__*/React.createElement(ModuleErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: styles.Email
  }, isEditing && isEditable ? renderEditing : renderDisplay));
};

DataEmail.propTypes = propTypes$f;

var _excluded$e = ["attribute", "isEditable", "isLabeled", "label", "value"];
var propTypes$e = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt$1.string,

  /** A Module can be defined to not present an editing state */
  isEditable: pt$1.bool,

  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt$1.bool,

  /** A Module needs to have a unique label relative to its context */
  label: pt$1.string,

  /** A Module can have a value */
  value: pt$1.string
};

var DataFile = function DataFile(_ref) {
  var attribute = _ref.attribute,
      _ref$isEditable = _ref.isEditable,
      isEditable = _ref$isEditable === void 0 ? true : _ref$isEditable,
      _ref$isLabeled = _ref.isLabeled,
      isLabeled = _ref$isLabeled === void 0 ? true : _ref$isLabeled,
      label = _ref.label,
      value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$e);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      formMethods = _useContext.formMethods;

  var _getAccessibleLabelSe = getAccessibleLabelSetters(isLabeled, label),
      setAriaLabel = _getAccessibleLabelSe.setAriaLabel,
      setHtmlFor = _getAccessibleLabelSe.setHtmlFor;

  var renderEditing = /*#__PURE__*/React.createElement("label", {
    htmlFor: setHtmlFor
  }, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement(Input, _extends({}, rest, {
    "aria-label": setAriaLabel,
    className: styles.Input,
    defaultValue: value,
    id: label,
    name: attribute || label,
    ref: formMethods === null || formMethods === void 0 ? void 0 : formMethods.register,
    type: "file"
  })));
  var renderDisplay = /*#__PURE__*/React.createElement("span", null, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement("span", _extends({
    "aria-label": label,
    className: styles.File
  }, rest), value)); // Do not render an editable input if the module is not editable

  return /*#__PURE__*/React.createElement(ModuleErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: styles.File
  }, isEditing && isEditable ? renderEditing : renderDisplay));
};

DataFile.propTypes = propTypes$e;

var _excluded$d = ["attribute", "isEditable", "isLabeled", "label", "value", "src"];
var propTypes$d = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt$1.string,

  /** A Module can be defined to not present an editing state */
  isEditable: pt$1.bool,

  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt$1.bool,

  /** A Module needs to have a unique label relative to its context */
  label: pt$1.string,

  /** Image path */
  src: pt$1.string,

  /** A Module can have a value */
  value: pt$1.string
};

var DataImage = function DataImage(_ref) {
  var attribute = _ref.attribute,
      _ref$isEditable = _ref.isEditable,
      isEditable = _ref$isEditable === void 0 ? true : _ref$isEditable,
      _ref$isLabeled = _ref.isLabeled,
      isLabeled = _ref$isLabeled === void 0 ? true : _ref$isLabeled,
      label = _ref.label,
      value = _ref.value,
      src = _ref.src,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$d);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      formMethods = _useContext.formMethods;

  var _getAccessibleLabelSe = getAccessibleLabelSetters(isLabeled, label),
      setAriaLabel = _getAccessibleLabelSe.setAriaLabel,
      setHtmlFor = _getAccessibleLabelSe.setHtmlFor;

  var renderEditing = /*#__PURE__*/React.createElement("label", {
    htmlFor: setHtmlFor
  }, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement(Input, _extends({}, rest, {
    "aria-label": setAriaLabel,
    className: styles.Image,
    defaultValue: value,
    id: label,
    name: attribute || label,
    ref: formMethods === null || formMethods === void 0 ? void 0 : formMethods.register,
    src: value || src,
    type: 'image'
  })));
  var renderDisplay = /*#__PURE__*/React.createElement("span", null, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement("span", _extends({
    "aria-label": label,
    className: styles.Image
  }, rest), src)); // Do not render an editable input if the module is not editable

  return /*#__PURE__*/React.createElement(ModuleErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: styles.Image
  }, isEditing && isEditable ? renderEditing : renderDisplay));
};

DataImage.propTypes = propTypes$d;

var _excluded$c = ["attribute", "isEditable", "isLabeled", "label", "value"];
var propTypes$c = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt$1.string,

  /** A Module can be defined to not present an editing state */
  isEditable: pt$1.bool,

  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt$1.bool,

  /** A Module needs to have a unique label relative to its context */
  label: pt$1.string,

  /** A Module can have a value */
  value: pt$1.oneOfType([pt$1.object, pt$1.array, pt$1.string])
};

var DataJson = function DataJson(_ref) {
  var attribute = _ref.attribute,
      _ref$isEditable = _ref.isEditable,
      isEditable = _ref$isEditable === void 0 ? true : _ref$isEditable,
      _ref$isLabeled = _ref.isLabeled,
      isLabeled = _ref$isLabeled === void 0 ? true : _ref$isLabeled,
      label = _ref.label,
      value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$c);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      formMethods = _useContext.formMethods;

  var jsonValue = JSON.stringify(value, null, 4);
  var renderEditing = /*#__PURE__*/React.createElement("label", {
    htmlFor: label
  }, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.Label
  }, label), /*#__PURE__*/React.createElement(Input, _extends({}, rest, {
    as: TextareaAutosize,
    className: styles.Input,
    defaultValue: jsonValue,
    id: label,
    name: attribute || label,
    ref: formMethods === null || formMethods === void 0 ? void 0 : formMethods.register
  })));
  var renderDisplay = /*#__PURE__*/React.createElement("span", null, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.Label
  }, label), /*#__PURE__*/React.createElement("span", _extends({
    className: styles.Input,
    style: {
      whiteSpace: 'pre'
    }
  }, rest), jsonValue)); // Do not render an editable input if the module is not editable

  return /*#__PURE__*/React.createElement(ModuleErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: styles.TextArea
  }, isEditing && isEditable ? renderEditing : renderDisplay));
};

DataJson.propTypes = propTypes$c;
DataJson.displayName = 'json';

var _excluded$b = ["attribute", "isEditable", "isLabeled", "label", "value"];
var propTypes$b = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt$1.string,

  /** A Module can be defined to not present an editing state */
  isEditable: pt$1.bool,

  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt$1.bool,

  /** A Module needs to have a unique label relative to its context */
  label: pt$1.string,

  /** A Module can have a value */
  value: pt$1.string
};

var DataMonth = function DataMonth(_ref) {
  var attribute = _ref.attribute,
      _ref$isEditable = _ref.isEditable,
      isEditable = _ref$isEditable === void 0 ? true : _ref$isEditable,
      _ref$isLabeled = _ref.isLabeled,
      isLabeled = _ref$isLabeled === void 0 ? true : _ref$isLabeled,
      label = _ref.label,
      value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$b);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      formMethods = _useContext.formMethods;

  var _getAccessibleLabelSe = getAccessibleLabelSetters(isLabeled, label),
      setAriaLabel = _getAccessibleLabelSe.setAriaLabel,
      setHtmlFor = _getAccessibleLabelSe.setHtmlFor;

  var renderEditing = /*#__PURE__*/React.createElement("label", {
    htmlFor: setHtmlFor
  }, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement(Input, _extends({}, rest, {
    "aria-label": setAriaLabel,
    className: styles.Input,
    defaultValue: value,
    id: label,
    name: attribute || label,
    ref: formMethods === null || formMethods === void 0 ? void 0 : formMethods.register,
    type: "month"
  })));
  var renderDisplay = /*#__PURE__*/React.createElement("span", null, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement("span", _extends({
    "aria-label": label,
    className: styles.Month
  }, rest), value)); // Do not render an editable input if the module is not editable

  return /*#__PURE__*/React.createElement(ModuleErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: styles.Month
  }, isEditing && isEditable ? renderEditing : renderDisplay));
};

DataMonth.propTypes = propTypes$b;

var _excluded$a = ["attribute", "isEditable", "isLabeled", "label", "value"];
var propTypes$a = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt$1.string,

  /** A Module can be defined to not present an editing state */
  isEditable: pt$1.bool,

  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt$1.bool,

  /** A Module needs to have a unique label relative to its context */
  label: pt$1.string,

  /** A Module can have a value */
  value: pt$1.number
};

var DataNumber = function DataNumber(_ref) {
  var attribute = _ref.attribute,
      _ref$isEditable = _ref.isEditable,
      isEditable = _ref$isEditable === void 0 ? true : _ref$isEditable,
      _ref$isLabeled = _ref.isLabeled,
      isLabeled = _ref$isLabeled === void 0 ? true : _ref$isLabeled,
      label = _ref.label,
      value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$a);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      formMethods = _useContext.formMethods;

  var renderEditing = /*#__PURE__*/React.createElement("label", {
    htmlFor: label
  }, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement(Input, _extends({}, rest, {
    className: styles.Input,
    defaultValue: value,
    id: label,
    name: attribute || label,
    ref: formMethods === null || formMethods === void 0 ? void 0 : formMethods.register,
    type: "number"
  })));
  var renderDisplay = /*#__PURE__*/React.createElement("span", null, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement("span", _extends({
    className: styles.Input
  }, rest), value)); // Do not render an editable input if the module is not editable

  return /*#__PURE__*/React.createElement(ModuleErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: styles.Number
  }, isEditing && isEditable ? renderEditing : renderDisplay));
};

DataNumber.propTypes = propTypes$a;

var _excluded$9 = ["attribute", "isEditable", "isLabeled", "label", "value"];
var propTypes$9 = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt$1.string,

  /** A Module can be defined to not present an editing state */
  isEditable: pt$1.bool,

  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt$1.bool,

  /** A Module needs to have a unique label relative to its context */
  label: pt$1.string,

  /** A Module can have a value */
  value: pt$1.string
};

var DataPassword = function DataPassword(_ref) {
  var attribute = _ref.attribute,
      _ref$isEditable = _ref.isEditable,
      isEditable = _ref$isEditable === void 0 ? true : _ref$isEditable,
      _ref$isLabeled = _ref.isLabeled,
      isLabeled = _ref$isLabeled === void 0 ? true : _ref$isLabeled,
      label = _ref.label,
      value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$9);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      formMethods = _useContext.formMethods;

  var _getAccessibleLabelSe = getAccessibleLabelSetters(isLabeled, label),
      setAriaLabel = _getAccessibleLabelSe.setAriaLabel,
      setHtmlFor = _getAccessibleLabelSe.setHtmlFor;

  var renderEditing = /*#__PURE__*/React.createElement("label", {
    htmlFor: setHtmlFor
  }, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement(Input, _extends({}, rest, {
    "aria-label": setAriaLabel,
    className: styles.Password,
    defaultValue: value,
    id: label,
    name: attribute || label,
    ref: formMethods === null || formMethods === void 0 ? void 0 : formMethods.register,
    type: "password"
  })));
  var renderDisplay = /*#__PURE__*/React.createElement("span", null, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement("span", _extends({
    "aria-label": label,
    className: styles.Password
  }, rest), "******")); // Do not render an editable input if the module is not editable

  return /*#__PURE__*/React.createElement(ModuleErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: styles.Text
  }, isEditing && isEditable ? renderEditing : renderDisplay));
};

DataPassword.propTypes = propTypes$9;

var _excluded$8 = ["attribute", "isEditable", "isLabeled", "label", "options", "value"];
var propTypes$8 = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt$1.string,

  /** A Module can be defined to not present an editing state */
  isEditable: pt$1.bool,

  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt$1.bool,

  /** A Module needs to have a unique label relative to its context */
  label: pt$1.string,

  /** A Radio module can have multiple options */
  options: pt$1.arrayOf(pt$1.shape({
    label: pt$1.string
  })),

  /** A Module can have a value */
  value: pt$1.bool
};

var DataRadio = function DataRadio(_ref) {
  _ref.attribute;
      var _ref$isEditable = _ref.isEditable,
      isEditable = _ref$isEditable === void 0 ? true : _ref$isEditable,
      _ref$isLabeled = _ref.isLabeled,
      isLabeled = _ref$isLabeled === void 0 ? true : _ref$isLabeled,
      label = _ref.label,
      options = _ref.options,
      value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$8);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      formMethods = _useContext.formMethods;

  var radio = useRadioState({
    state: value
  });

  var renderRadio = function renderRadio(option) {
    return /*#__PURE__*/React.createElement("label", {
      htmlFor: option.label
    }, /*#__PURE__*/React.createElement(Radio, _extends({}, radio, {
      className: styles.Input,
      id: option.label,
      name: option.label,
      ref: formMethods === null || formMethods === void 0 ? void 0 : formMethods.register,
      type: "radio",
      value: option.label
    })), option.label && isLabeled && /*#__PURE__*/React.createElement("span", {
      className: styles.LabelText
    }, option.label));
  };

  var renderEditing = /*#__PURE__*/React.createElement(RadioGroup, _extends({}, radio, rest, {
    "aria-label": "fruits",
    className: styles.Radio
  }), options ? options.map(function (option) {
    return renderRadio(option);
  }) : renderRadio(value));
  var renderDisplay = /*#__PURE__*/React.createElement(ModuleErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: styles.Radio
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", _extends({
    className: styles.Input
  }, rest), value), label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label)))); // Do not render an editable input if the module is not editable

  return isEditing && isEditable ? renderEditing : renderDisplay;
};

DataRadio.propTypes = propTypes$8;

var _excluded$7 = ["attribute", "isEditable", "isLabeled", "label", "value"];
var propTypes$7 = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt$1.string,

  /** A Module can be defined to not present an editing state */
  isEditable: pt$1.bool,

  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt$1.bool,

  /** A Module needs to have a unique label relative to its context */
  label: pt$1.string,

  /** A Module can have a value */
  value: pt$1.string
};

var DataRange = function DataRange(_ref) {
  var attribute = _ref.attribute,
      _ref$isEditable = _ref.isEditable,
      isEditable = _ref$isEditable === void 0 ? true : _ref$isEditable,
      _ref$isLabeled = _ref.isLabeled,
      isLabeled = _ref$isLabeled === void 0 ? true : _ref$isLabeled,
      label = _ref.label,
      value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$7);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      formMethods = _useContext.formMethods;

  var _getAccessibleLabelSe = getAccessibleLabelSetters(isLabeled, label),
      setAriaLabel = _getAccessibleLabelSe.setAriaLabel,
      setHtmlFor = _getAccessibleLabelSe.setHtmlFor;

  var renderEditing = /*#__PURE__*/React.createElement("label", {
    htmlFor: setHtmlFor
  }, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement(Input, _extends({}, rest, {
    "aria-label": setAriaLabel,
    className: styles.Range,
    defaultValue: value,
    id: label,
    name: attribute || label,
    ref: formMethods === null || formMethods === void 0 ? void 0 : formMethods.register,
    type: "range"
  })));
  var renderDisplay = /*#__PURE__*/React.createElement("span", null, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement("span", _extends({
    "aria-label": label,
    className: styles.Range
  }, rest), value)); // Do not render an editable input if the module is not editable

  return /*#__PURE__*/React.createElement(ModuleErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: styles.Range
  }, isEditing && isEditable ? renderEditing : renderDisplay));
};

DataRange.propTypes = propTypes$7;

var _excluded$6 = ["attribute", "isEditable", "isLabeled", "label", "options", "value"];
var propTypes$6 = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt$1.string,

  /** A Module can be defined to not present an editing state */
  isEditable: pt$1.bool,

  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt$1.bool,

  /** A Module needs to have a unique label relative to its context */
  label: pt$1.string,

  /** Select module can have selectable options */
  options: pt$1.arrayOf(pt$1.shape({
    key: pt$1.string,
    text: pt$1.oneOfType([pt$1.string, pt$1.number]),
    value: pt$1.oneOfType([pt$1.string, pt$1.number])
  })),

  /** A Module can have a value */
  value: pt$1.string
};

var DataSelect = function DataSelect(_ref) {
  var attribute = _ref.attribute,
      _ref$isEditable = _ref.isEditable,
      isEditable = _ref$isEditable === void 0 ? true : _ref$isEditable,
      _ref$isLabeled = _ref.isLabeled,
      isLabeled = _ref$isLabeled === void 0 ? true : _ref$isLabeled,
      label = _ref.label,
      options = _ref.options,
      value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$6);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      formMethods = _useContext.formMethods;

  var renderEditing = /*#__PURE__*/React.createElement("label", {
    htmlFor: label
  }, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.Label
  }, label), /*#__PURE__*/React.createElement(Input, _extends({}, rest, {
    as: "select",
    className: styles.Input,
    defaultValue: value,
    id: label,
    name: attribute || label,
    ref: formMethods === null || formMethods === void 0 ? void 0 : formMethods.register
  }), options ? options.map(function (option) {
    return /*#__PURE__*/React.createElement("option", _extends({
      key: option.value
    }, option), option.label || option.value);
  }) : /*#__PURE__*/React.createElement("option", {
    value: value
  }, value)));
  var renderDisplay = /*#__PURE__*/React.createElement("span", null, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.Label
  }, label), /*#__PURE__*/React.createElement("span", _extends({
    className: styles.Input
  }, rest), value)); // Do not render an editable input if the module is not editable

  return /*#__PURE__*/React.createElement(ModuleErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: styles.Select
  }, isEditing && isEditable ? renderEditing : renderDisplay));
};

DataSelect.propTypes = propTypes$6;

var _excluded$5 = ["attribute", "isEditable", "isLabeled", "label", "value"];
var propTypes$5 = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt$1.string,

  /** A Module can be defined to not present an editing state */
  isEditable: pt$1.bool,

  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt$1.bool,

  /** A Module needs to have a unique label relative to its context */
  label: pt$1.string,

  /** A Module can have a value */
  value: pt$1.string
};

var DataTel = function DataTel(_ref) {
  var attribute = _ref.attribute,
      _ref$isEditable = _ref.isEditable,
      isEditable = _ref$isEditable === void 0 ? true : _ref$isEditable,
      _ref$isLabeled = _ref.isLabeled,
      isLabeled = _ref$isLabeled === void 0 ? true : _ref$isLabeled,
      label = _ref.label,
      value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$5);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      formMethods = _useContext.formMethods;

  var _getAccessibleLabelSe = getAccessibleLabelSetters(isLabeled, label),
      setAriaLabel = _getAccessibleLabelSe.setAriaLabel,
      setHtmlFor = _getAccessibleLabelSe.setHtmlFor;

  var renderEditing = /*#__PURE__*/React.createElement("label", {
    htmlFor: setHtmlFor
  }, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement(Input, _extends({}, rest, {
    "aria-label": setAriaLabel,
    className: styles.Input,
    defaultValue: value,
    id: label,
    name: attribute || label,
    ref: formMethods === null || formMethods === void 0 ? void 0 : formMethods.register,
    type: "tel"
  })));
  var renderDisplay = /*#__PURE__*/React.createElement("span", null, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement("span", _extends({
    "aria-label": label,
    className: styles.Tel
  }, rest), value)); // Do not render an editable input if the module is not editable

  return /*#__PURE__*/React.createElement(ModuleErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: styles.Tel
  }, isEditing && isEditable ? renderEditing : renderDisplay));
};

DataTel.propTypes = propTypes$5;

var _excluded$4 = ["attribute", "isEditable", "isLabeled", "label", "value"];
var propTypes$4 = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt$1.string,

  /** A Module can be defined to not present an editing state */
  isEditable: pt$1.bool,

  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt$1.bool,

  /** A Module needs to have a unique label relative to its context */
  label: pt$1.string,

  /** A Module can have a value */
  value: pt$1.string
};

var DataText = function DataText(_ref) {
  var attribute = _ref.attribute,
      _ref$isEditable = _ref.isEditable,
      isEditable = _ref$isEditable === void 0 ? true : _ref$isEditable,
      _ref$isLabeled = _ref.isLabeled,
      isLabeled = _ref$isLabeled === void 0 ? true : _ref$isLabeled,
      label = _ref.label,
      value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$4);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      formMethods = _useContext.formMethods;

  var _getAccessibleLabelSe = getAccessibleLabelSetters(isLabeled, label),
      setAriaLabel = _getAccessibleLabelSe.setAriaLabel,
      setHtmlFor = _getAccessibleLabelSe.setHtmlFor;

  var renderEditing = /*#__PURE__*/React.createElement("label", {
    htmlFor: setHtmlFor
  }, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement(Input, _extends({}, rest, {
    "aria-label": setAriaLabel,
    className: styles.Input,
    defaultValue: value,
    id: label,
    name: attribute || label,
    ref: formMethods === null || formMethods === void 0 ? void 0 : formMethods.register,
    type: 'text'
  })));
  var renderDisplay = /*#__PURE__*/React.createElement("span", null, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement("span", _extends({
    className: styles.Text
  }, rest), value)); // Do not render an editable input if the module is not editable

  return /*#__PURE__*/React.createElement(ModuleErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: styles.Text
  }, isEditing && isEditable ? renderEditing : renderDisplay));
};

DataText.propTypes = propTypes$4;

var _excluded$3 = ["attribute", "isEditable", "isLabeled", "label", "value"];
var propTypes$3 = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt$1.string,

  /** A Module can be defined to not present an editing state */
  isEditable: pt$1.bool,

  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt$1.bool,

  /** A Module needs to have a unique label relative to its context */
  label: pt$1.string,

  /** A Module can have a value */
  value: pt$1.string
};

var DataTextArea = function DataTextArea(_ref) {
  var attribute = _ref.attribute,
      _ref$isEditable = _ref.isEditable,
      isEditable = _ref$isEditable === void 0 ? true : _ref$isEditable,
      _ref$isLabeled = _ref.isLabeled,
      isLabeled = _ref$isLabeled === void 0 ? true : _ref$isLabeled,
      label = _ref.label,
      value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$3);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      formMethods = _useContext.formMethods;

  var _getAccessibleLabelSe = getAccessibleLabelSetters(isLabeled, label),
      setAriaLabel = _getAccessibleLabelSe.setAriaLabel,
      setHtmlFor = _getAccessibleLabelSe.setHtmlFor;

  var renderEditing = /*#__PURE__*/React.createElement("label", {
    htmlFor: setHtmlFor
  }, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement(Input, _extends({}, rest, {
    "aria-label": setAriaLabel,
    as: TextareaAutosize,
    className: styles.Input,
    defaultValue: value,
    id: label,
    name: attribute || label,
    ref: formMethods === null || formMethods === void 0 ? void 0 : formMethods.register
  })));
  var renderDisplay = /*#__PURE__*/React.createElement("span", null, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement("span", _extends({
    "aria-label": label,
    className: styles.TextArea
  }, rest), value)); // Do not render an editable input if the module is not editable

  return /*#__PURE__*/React.createElement(ModuleErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: styles.TextArea
  }, isEditing && isEditable ? renderEditing : renderDisplay));
};

DataTextArea.propTypes = propTypes$3;
DataTextArea.displayName = 'textarea';

var _excluded$2 = ["attribute", "isEditable", "isLabeled", "label", "value"];
var propTypes$2 = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt$1.string,

  /** A Module can be defined to not present an editing state */
  isEditable: pt$1.bool,

  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt$1.bool,

  /** A Module needs to have a unique label relative to its context */
  label: pt$1.string,

  /** A Module can have a value */
  value: pt$1.string
};

var DataTime = function DataTime(_ref) {
  var attribute = _ref.attribute,
      _ref$isEditable = _ref.isEditable,
      isEditable = _ref$isEditable === void 0 ? true : _ref$isEditable,
      _ref$isLabeled = _ref.isLabeled,
      isLabeled = _ref$isLabeled === void 0 ? true : _ref$isLabeled,
      label = _ref.label,
      value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$2);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      formMethods = _useContext.formMethods;

  var _getAccessibleLabelSe = getAccessibleLabelSetters(isLabeled, label),
      setAriaLabel = _getAccessibleLabelSe.setAriaLabel,
      setHtmlFor = _getAccessibleLabelSe.setHtmlFor;

  var renderEditing = /*#__PURE__*/React.createElement("label", {
    htmlFor: setHtmlFor
  }, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement(Input, _extends({}, rest, {
    "aria-label": setAriaLabel,
    className: styles.Time,
    defaultValue: value,
    id: label,
    name: attribute || label,
    ref: formMethods === null || formMethods === void 0 ? void 0 : formMethods.register,
    type: "time"
  })));
  var renderDisplay = /*#__PURE__*/React.createElement("span", null, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement("span", _extends({
    "aria-label": label,
    className: styles.Time
  }, rest), value)); // Do not render an editable input if the module is not editable

  return /*#__PURE__*/React.createElement(ModuleErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: styles.Time
  }, isEditing && isEditable ? renderEditing : renderDisplay));
};

DataTime.propTypes = propTypes$2;

var _excluded$1 = ["attribute", "isEditable", "isLabeled", "label", "value"];
var propTypes$1 = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt$1.string,

  /** A Module can be defined to not present an editing state */
  isEditable: pt$1.bool,

  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt$1.bool,

  /** A Module needs to have a unique label relative to its context */
  label: pt$1.string,

  /** A Module can have a value */
  value: pt$1.string
};

var DataWeek = function DataWeek(_ref) {
  var attribute = _ref.attribute,
      _ref$isEditable = _ref.isEditable,
      isEditable = _ref$isEditable === void 0 ? true : _ref$isEditable,
      _ref$isLabeled = _ref.isLabeled,
      isLabeled = _ref$isLabeled === void 0 ? true : _ref$isLabeled,
      label = _ref.label,
      value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$1);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      formMethods = _useContext.formMethods;

  var _getAccessibleLabelSe = getAccessibleLabelSetters(isLabeled, label),
      setAriaLabel = _getAccessibleLabelSe.setAriaLabel,
      setHtmlFor = _getAccessibleLabelSe.setHtmlFor;

  var renderEditing = /*#__PURE__*/React.createElement("label", {
    htmlFor: setHtmlFor
  }, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement(Input, _extends({}, rest, {
    "aria-label": setAriaLabel,
    className: styles.Week,
    defaultValue: value,
    id: label,
    name: attribute || label,
    ref: formMethods === null || formMethods === void 0 ? void 0 : formMethods.register,
    type: "week"
  })));
  var renderDisplay = /*#__PURE__*/React.createElement("span", null, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement("span", _extends({
    "aria-label": label,
    className: styles.Week
  }, rest), value)); // Do not render an editable input if the module is not editable

  return /*#__PURE__*/React.createElement(ModuleErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: styles.Week
  }, isEditing && isEditable ? renderEditing : renderDisplay));
};

DataWeek.propTypes = propTypes$1;

var _excluded = ["attribute", "isEditable", "isLabeled", "label", "value"];
var propTypes = {
  /** A module can have an Attribute, which will be used as form field name */
  attribute: pt$1.string,

  /** A Module can be defined to not present an editing state */
  isEditable: pt$1.bool,

  /** Presents the input without a label. NOT USER CONFIGURABLE */
  isLabeled: pt$1.bool,

  /** A Module needs to have a unique label relative to its context */
  label: pt$1.string,

  /** A Module can have a value */
  value: pt$1.string
};

var DataUrl = function DataUrl(_ref) {
  var attribute = _ref.attribute,
      _ref$isEditable = _ref.isEditable,
      isEditable = _ref$isEditable === void 0 ? true : _ref$isEditable,
      _ref$isLabeled = _ref.isLabeled,
      isLabeled = _ref$isLabeled === void 0 ? true : _ref$isLabeled,
      label = _ref.label,
      value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var _useContext = useContext(ModuleContext),
      isEditing = _useContext.isEditing,
      formMethods = _useContext.formMethods;

  var _getAccessibleLabelSe = getAccessibleLabelSetters(isLabeled, label),
      setAriaLabel = _getAccessibleLabelSe.setAriaLabel,
      setHtmlFor = _getAccessibleLabelSe.setHtmlFor;

  var renderEditing = /*#__PURE__*/React.createElement("label", {
    htmlFor: setHtmlFor
  }, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement(Input, _extends({}, rest, {
    "aria-label": setAriaLabel,
    className: styles.Url,
    defaultValue: value,
    id: label,
    name: attribute || label,
    ref: formMethods === null || formMethods === void 0 ? void 0 : formMethods.register,
    type: "url"
  })));
  var renderDisplay = /*#__PURE__*/React.createElement("span", null, label && isLabeled && /*#__PURE__*/React.createElement("span", {
    className: styles.LabelText
  }, label), /*#__PURE__*/React.createElement("span", _extends({
    "aria-label": label,
    className: styles.Url
  }, rest), value)); // Do not render an editable input if the module is not editable

  return /*#__PURE__*/React.createElement(ModuleErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: styles.Url
  }, isEditing && isEditable ? renderEditing : renderDisplay));
};

DataUrl.propTypes = propTypes;

export { ActionButton as A, Boundaries as B, ChatProvider as C, DataCheckbox as D, DataWeek as E, propTypes$m as F, ModuleError as G, useDeveloperMessage as H, DEFAULT_CASCARA_MODIFIERS as I, useToggle as J, Loader as L, ModuleContext as M, styles$1 as a, Button as b, ModuleProvider as c, ActionEdit as d, DataColor as e, DataDate as f, getStatusFromDataLength as g, DataDateTime as h, DataEmail as i, DataFile as j, DataImage as k, DataJson as l, DataMonth as m, DataNumber as n, DataPassword as o, popperOverTrigger as p, DataRadio as q, DataRange as r, styleInject as s, DataSelect as t, useMediaQuery as u, DataTel as v, DataText as w, DataTextArea as x, DataTime as y, DataUrl as z };
//# sourceMappingURL=DataUrl-9ae30fd8.js.map
