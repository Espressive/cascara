import { c as ModuleProvider, s as styleInject, p as popperOverTrigger, a as styles$2, b as Button$1, I as DEFAULT_CASCARA_MODIFIERS, B as Boundaries, M as ModuleContext } from './DataUrl-9ae30fd8.js';
export { A as ActionButton, d as ActionEdit, C as ChatProvider, D as DataCheckbox, e as DataColor, f as DataDate, h as DataDateTime, i as DataEmail, j as DataFile, k as DataImage, l as DataJson, m as DataMonth, n as DataNumber, o as DataPassword, q as DataRadio, r as DataRange, t as DataSelect, v as DataTel, w as DataText, x as DataTextArea, y as DataTime, z as DataUrl, E as DataWeek, L as Loader, M as ModuleContext, G as ModuleError, c as ModuleProvider, g as getStatusFromDataLength, H as useDeveloperMessage, u as useMediaQuery, J as useToggle } from './DataUrl-9ae30fd8.js';
import _extends from '@babel/runtime/helpers/esm/extends';
import React, { useState, useCallback, useRef, useMemo, memo, useContext } from 'react';
import pt from 'prop-types';
import { Button as Button$2 } from 'reakit';
import { InlineIcon } from '@iconify/react';
import { eyeIcon, arrowUpIcon, arrowDownIcon, pencilIcon, closeIcon, checkIcon } from '@espressive/icons';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import { usePopoverState, PopoverDisclosure, Popover as Popover$1, PopoverBackdrop } from 'reakit/Popover';
import classNames from 'classnames/bind';
import { without, findIndex, equals, insert, compose, filter } from 'ramda';
import { MenuItem, useMenuState, MenuButton, Menu } from 'reakit/Menu';
import { Button } from 'reakit/Button';
import { Clickable } from 'reakit/Clickable';
import { useInitialValue } from 'reakit-utils';
import 'popper-max-size-modifier';
import '@fluentui/react-northstar';
import '@fluentui/styles';
import '@fluentui/react-icons-northstar';
import 'reakit/Input';
import 'reakit/Checkbox';
import 'react-textarea-autosize';
import 'reakit/Radio';
import 'react-error-boundary';
import 'react-is';
import 'classnames';
import '@espressive/prop-types';

var useBoolean = function useBoolean(defaultValue) {
  if (defaultValue === void 0) {
    defaultValue = false;
  }

  var _useState = useState(defaultValue),
      value = _useState[0],
      setValue = _useState[1];

  var toggle = function toggle() {
    return setValue(!value);
  };

  var setTrue = function setTrue() {
    return setValue(true);
  };

  var setFalse = function setFalse() {
    return setValue(false);
  };

  return [value, {
    setFalse: setFalse,
    setTrue: setTrue,
    toggle: toggle
  }];
};

var propTypes$5 = {
  children: pt.oneOfType([pt.node, pt.array]),
  isEditing: pt.bool,
  record: pt.shape({})
};

var ModuleSandbox = function ModuleSandbox(_ref) {
  var children = _ref.children,
      isEditing = _ref.isEditing,
      _ref$record = _ref.record,
      record = _ref$record === void 0 ? {} : _ref$record;

  var _useState = useState({
    idOfRecordInEditMode: 0,
    isEditing: isEditing,
    record: record,
    uniqueIdAttribute: 'eid'
  }),
      state = _useState[0],
      setState = _useState[1];

  var enterEditMode = useCallback(function () {
    if (!(state !== null && state !== void 0 && state.isEditing)) {
      setState(_extends({}, state, {
        isEditing: true
      }));
    }
  }, [state, setState]);
  var exitEditMode = useCallback(function () {
    if (state !== null && state !== void 0 && state.isEditing) {
      setState(_extends({}, state, {
        isEditing: false
      }));
    }
  }, [state, setState]);
  var handleSubmit = useCallback(function (data) {
    // eslint-disable-next-line no-console -- we need this as a developer message
    console.log('Edition completed: ', data);
    setState(_extends({}, state, {
      isEditing: false,
      record: data
    }));
  }, [state, setState]);
  var reset = useCallback(function () {
    // eslint-disable-next-line no-console -- we need this as a developer message
    console.log('Edition canceled');
  }, []);
  var onAction = useCallback(function (action, record) {
    // eslint-disable-next-line no-console -- we need this as a developer message
    console.log('Action invoked: ', action === null || action === void 0 ? void 0 : action.name, record);
  }, []);
  return /*#__PURE__*/React.createElement(ModuleProvider, {
    value: _extends({}, state, {
      enterEditMode: enterEditMode,
      exitEditMode: exitEditMode,
      formMethods: {
        formState: {
          isDirty: false,
          isSubmitting: false
        },
        handleSubmit: handleSubmit,
        reset: reset
      },
      onAction: onAction
    })
  }, children);
};

ModuleSandbox.propTypes = propTypes$5;

var css_248z$1 = ".☕️_Popover____1gjta{z-index:100;background-color:#fff}.☕️_Popover____1gjta:focus{outline:none}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBvcG92ZXIubW9kdWxlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscUJBQ0UsV0FBWSxDQUNaLHFCQUNGLENBQ0EsMkJBQ0UsWUFDRiIsImZpbGUiOiJQb3BvdmVyLm1vZHVsZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLl8ge1xuICB6LWluZGV4OiAxMDA7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG59XG4uXzpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59Il19 */";
var styles$1 = {"_":"☕️_Popover____1gjta"};
styleInject(css_248z$1);

var _excluded$2 = ["children", "className", "trigger"];
var cx$1 = classNames.bind(styles$1);
var propTypes$4 = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  className: pt.string,
  trigger: pt.node
};

var Popover = function Popover(_ref) {
  var children = _ref.children,
      className = _ref.className,
      trigger = _ref.trigger,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$2);

  // Set a ref on our trigger to pass into the disclosure and also measure clientHeight
  var triggerRef = useRef();
  var popover = usePopoverState({
    gutter: 0,
    modal: true,
    placement: 'bottom-end',
    unstable_popperModifiers: [popperOverTrigger]
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PopoverDisclosure, _extends({}, popover, {
    ref: triggerRef
  }, trigger.props), function (disclosureProps) {
    return /*#__PURE__*/React.cloneElement(trigger, disclosureProps);
  }), /*#__PURE__*/React.createElement(Popover$1, _extends({
    "aria-label": rest['aria-label'] ? rest['aria-label'] : 'Menu',
    className: cx$1('_', className)
  }, popover, rest), children), /*#__PURE__*/React.createElement(PopoverBackdrop, _extends({
    className: styles$1.Backdrop
  }, popover)));
};

Popover.propTypes = propTypes$4;

var DEFAULT_TRIGGER = /*#__PURE__*/React.createElement(Button, {
  className: styles$2._ + " ui basic icon button"
}, /*#__PURE__*/React.createElement(InlineIcon, {
  icon: eyeIcon
}));
var LOADING_TRIGGER = /*#__PURE__*/React.createElement(Button, {
  className: "ui basic loading icon button",
  disabled: true
}, /*#__PURE__*/React.createElement(InlineIcon, {
  icon: eyeIcon
}));
var STATE_SHAPE = pt.exact({
  currentSelection: pt.arrayOf(pt.object),
  itemAdd: pt.func.isRequired,
  itemRemove: pt.func.isRequired,
  moveItemDown: pt.func.isRequired,
  moveItemUp: pt.func.isRequired
});
var VIEW_CONFIG_PROP_TYPES = {
  isInitialOpen: pt.bool,
  options: pt.arrayOf(pt.object).isRequired,
  placement: pt.oneOf(['bottom-end', 'bottom-start']),
  state: STATE_SHAPE,
  title: pt.string,
  trigger: pt.node
};
var LOCAL_STORAGE_KEY = // This is only to make Nextjs and Vercel happy with our docs
typeof window !== 'undefined' ? "Cascara.ViewConfig." + window.location.pathname : 'Cascara.ViewConfig';

var getObjectIndex = function getObjectIndex(obj, list) {
  return findIndex(equals(obj))(list);
}; // Removes the supplied object from the supplied list


var getCleanList = function getCleanList(obj, list) {
  return without([obj], list);
}; // Combines both above functions to reduce boilerplate
// in move functions


var getObjIndexAndCleanList = function getObjIndexAndCleanList(obj, list) {
  return {
    cleanList: getCleanList(obj, list),
    prevIndex: getObjectIndex(obj, list)
  };
};

var useViewConfigState = function useViewConfigState(_temp) {
  var _ref = _temp === void 0 ? {
    initialSelection: []
  } : _temp,
      initialSelection = _ref.initialSelection;

  // Parse our last filter state from localstorage which will be used to initialize state if it exists
  var lastFilter = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)); // Make sure changes to our initial state after first render to not cause a render loop

  var initial = useInitialValue(lastFilter || initialSelection); // We have a single state that is managed with helper functions
  // and we never expose the internal set function outside of this hook

  var _useState = useState(initial),
      currentSelection = _useState[0],
      setCurrentSelection = _useState[1]; // We will set the current selection into both state and localstorage


  var setCurrentSelectionAndStorage = function setCurrentSelectionAndStorage(val) {
    setCurrentSelection(val);

    if (val.length === 0) {
      // We should clean up after ourselves if someone removes everything
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } else {
      // Set the same value from state into the key
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(val));
    }
  }; // Adds supplied object to the bottom of the current list


  var itemAdd = function itemAdd(obj) {
    setCurrentSelectionAndStorage([].concat(currentSelection, [obj]));
  }; // Removes supplied object from current list


  var itemRemove = function itemRemove(obj) {
    setCurrentSelectionAndStorage(getCleanList(obj, currentSelection));
  }; // Moves object matching supplied object up in the list


  var moveItemDown = function moveItemDown(obj) {
    var _getObjIndexAndCleanL = getObjIndexAndCleanList(obj, currentSelection),
        cleanList = _getObjIndexAndCleanL.cleanList,
        prevIndex = _getObjIndexAndCleanL.prevIndex;

    var newIndex = prevIndex + 1;
    setCurrentSelectionAndStorage(insert(newIndex, obj, cleanList));
  }; // Moves object matching supplied object down in the list


  var moveItemUp = function moveItemUp(obj) {
    var _getObjIndexAndCleanL2 = getObjIndexAndCleanList(obj, currentSelection),
        cleanList = _getObjIndexAndCleanL2.cleanList,
        prevIndex = _getObjIndexAndCleanL2.prevIndex;

    var newIndex = prevIndex - 1;
    setCurrentSelectionAndStorage(insert(newIndex, obj, cleanList));
  }; // DO NOT EXPOSE THE INTERNAL SET STATE FUNCTION, ONLY RETURN HELPERS


  return {
    currentSelection: currentSelection,
    itemAdd: itemAdd,
    itemRemove: itemRemove,
    moveItemDown: moveItemDown,
    moveItemUp: moveItemUp
  };
};

var css_248z = ".☕️_ViewConfig____2hdjc{-webkit-overflow-scrolling:touch;scroll-behavior:smooth}.☕️_ViewConfig____2hdjc::-webkit-scrollbar{width:0}.☕️_ViewConfig____2hdjc::-webkit-scrollbar-thumb{background-clip:content-box;background-color:#999;border:.25rem solid transparent;border-radius:1rem;box-shadow:inset 0 0 0 .05em hsla(0,0%,100%,.2)}.☕️_ViewConfig____2hdjc:hover::-webkit-scrollbar{width:.875rem}.☕️_ViewConfig____2hdjc{overflow-y:auto;overflow-y:overlay;z-index:11;font-size:.875em}.☕️_ViewConfig____2hdjc .☕️_ViewConfig_Info__2hdjc,.☕️_ViewConfig____2hdjc .☕️_ViewConfig_Title__2hdjc{padding:.625em 1.125em}.☕️_ViewConfig____2hdjc .☕️_ViewConfig_Title__2hdjc{background-color:rgba(0,0,0,.08);font-size:1em;margin:0;border-bottom:2px solid rgba(0,0,0,.1)}.☕️_ViewConfig____2hdjc .☕️_ViewConfig_Info__2hdjc{font-size:.875em}.☕️_ViewConfig____2hdjc .☕️_ViewConfig_Label__2hdjc{display:inline-block;line-height:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;max-width:16em}.☕️_ViewConfig____2hdjc.ui.dropdown .menu .ui.input{margin-top:.5em;margin-bottom:.5em}.☕️_ViewConfig____2hdjc.ui.dropdown .menu .ui.input input{border-radius:100px}.☕️_ViewConfig____2hdjc.ui.dropdown .menu .☕️_ViewConfig_ViewConfigItem__2hdjc,.☕️_ViewConfig____2hdjc.ui.dropdown .menu>.☕️_ViewConfig_ViewConfigItem__2hdjc.item{padding:.625rem 1.125rem!important;cursor:url(\"data:image/svg+xml;charset=utf-8,%3Csvg height='16' width='16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.8 6.8H10a.8.8 0 01-.8-.8V1.2a1.2 1.2 0 00-2.4 0V6a.8.8 0 01-.8.8H1.2a1.2 1.2 0 000 2.4H6a.8.8 0 01.8.8v4.8a1.2 1.2 0 002.4 0V10a.8.8 0 01.8-.8h4.8a1.2 1.2 0 000-2.4z'/%3E%3C/svg%3E\"),pointer;font-size:1em}.☕️_ViewConfig____2hdjc.ui.dropdown .menu .☕️_ViewConfig_ViewConfigItem__2hdjc.active,.☕️_ViewConfig____2hdjc.ui.dropdown .menu>.☕️_ViewConfig_ViewConfigItem__2hdjc.item.active{cursor:url(\"data:image/svg+xml;charset=utf-8,%3Csvg height='16' width='16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.8 9.2H1.2a1.2 1.2 0 010-2.4h13.6a1.2 1.2 0 010 2.4z'/%3E%3C/svg%3E\"),pointer}.☕️_ViewConfig____2hdjc.ui.dropdown .menu .☕️_ViewConfig_ActiveItems__2hdjc{border-bottom:2px solid rgba(0,0,0,.1)}.☕️_ViewConfig____2hdjc.ui.dropdown .menu .☕️_ViewConfig_ActiveItems__2hdjc .☕️_ViewConfig_ViewConfigItem__2hdjc,.☕️_ViewConfig____2hdjc.ui.dropdown .menu .☕️_ViewConfig_ActiveItems__2hdjc>.☕️_ViewConfig_ViewConfigItem__2hdjc.item{font-weight:400}.☕️_ViewConfig____2hdjc.ui.dropdown .menu .☕️_ViewConfig_ActiveItems__2hdjc .☕️_ViewConfig_ViewConfigItem__2hdjc:hover,.☕️_ViewConfig____2hdjc.ui.dropdown .menu .☕️_ViewConfig_ActiveItems__2hdjc>.☕️_ViewConfig_ViewConfigItem__2hdjc.item:hover{background-color:rgba(0,0,0,.05)}.☕️_ViewConfig____2hdjc.ui.dropdown .menu .☕️_ViewConfig_ActiveItems__2hdjc .☕️_ViewConfig_ViewConfigItem__2hdjc .☕️_ViewConfig_MoveButtons__2hdjc,.☕️_ViewConfig____2hdjc.ui.dropdown .menu .☕️_ViewConfig_ActiveItems__2hdjc>.☕️_ViewConfig_ViewConfigItem__2hdjc.item .☕️_ViewConfig_MoveButtons__2hdjc{float:right}.☕️_ViewConfig____2hdjc.ui.dropdown .menu .☕️_ViewConfig_ActiveItems__2hdjc .☕️_ViewConfig_ViewConfigItem__2hdjc .☕️_ViewConfig_MoveButtons__2hdjc>button,.☕️_ViewConfig____2hdjc.ui.dropdown .menu .☕️_ViewConfig_ActiveItems__2hdjc>.☕️_ViewConfig_ViewConfigItem__2hdjc.item .☕️_ViewConfig_MoveButtons__2hdjc>button{margin:-1em 0}.☕️_ViewConfig____2hdjc.ui.dropdown .menu .☕️_ViewConfig_ActiveItems__2hdjc .☕️_ViewConfig_ViewConfigItem__2hdjc .☕️_ViewConfig_MoveButtons__2hdjc>button:first-of-type,.☕️_ViewConfig____2hdjc.ui.dropdown .menu .☕️_ViewConfig_ActiveItems__2hdjc>.☕️_ViewConfig_ViewConfigItem__2hdjc.item .☕️_ViewConfig_MoveButtons__2hdjc>button:first-of-type{margin-left:1em}.☕️_ViewConfig____2hdjc.ui.dropdown .menu .☕️_ViewConfig_ActiveItems__2hdjc .☕️_ViewConfig_ViewConfigItem__2hdjc .☕️_ViewConfig_MoveButtons__2hdjc>button:last-of-type,.☕️_ViewConfig____2hdjc.ui.dropdown .menu .☕️_ViewConfig_ActiveItems__2hdjc>.☕️_ViewConfig_ViewConfigItem__2hdjc.item .☕️_ViewConfig_MoveButtons__2hdjc>button:last-of-type{margin-right:-.4em}.☕️_ViewConfig____2hdjc.ui.dropdown .menu .☕️_ViewConfig_ActiveItems__2hdjc .☕️_ViewConfig_ViewConfigItem__2hdjc:first-of-type button[aria-label=\"Move up\"],.☕️_ViewConfig____2hdjc.ui.dropdown .menu .☕️_ViewConfig_ActiveItems__2hdjc .☕️_ViewConfig_ViewConfigItem__2hdjc:last-of-type button[aria-label=\"Move down\"],.☕️_ViewConfig____2hdjc.ui.dropdown .menu .☕️_ViewConfig_ActiveItems__2hdjc>.☕️_ViewConfig_ViewConfigItem__2hdjc.item:first-of-type button[aria-label=\"Move up\"],.☕️_ViewConfig____2hdjc.ui.dropdown .menu .☕️_ViewConfig_ActiveItems__2hdjc>.☕️_ViewConfig_ViewConfigItem__2hdjc.item:last-of-type button[aria-label=\"Move down\"]{opacity:0;pointer-events:none}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlZpZXdDb25maWcubW9kdWxlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0JBQ0UsZ0NBQWlDLENBQ2pDLHNCQUNGLENBQ0EsMkNBQ0UsT0FDRixDQUNBLGlEQUNFLDJCQUE0QixDQUM1QixxQkFBeUIsQ0FDekIsK0JBQXNDLENBQ3RDLGtCQUFtQixDQUNuQiwrQ0FDRixDQUNBLGlEQUNFLGFBQ0YsQ0FFQSx3QkFDRSxlQUFnQixDQUNoQixrQkFBbUIsQ0FDbkIsVUFBVyxDQUNYLGdCQUNGLENBQ0EsdUdBRUUsc0JBQ0YsQ0FDQSxvREFDRSxnQ0FBcUMsQ0FDckMsYUFBYyxDQUNkLFFBQVMsQ0FDVCxzQ0FDRixDQUNBLG1EQUNFLGdCQUNGLENBQ0Esb0RBQ0Usb0JBQXFCLENBQ3JCLGFBQWMsQ0FDZCxlQUFnQixDQUNoQixrQkFBbUIsQ0FDbkIsc0JBQXVCLENBQ3ZCLGNBQ0YsQ0FDQSxvREFDRSxlQUFpQixDQUNqQixrQkFDRixDQUNBLDBEQUNFLG1CQUNGLENBQ0EsbUtBQ0Usa0NBQXFDLENBQ3JDLDZUQUFzQyxDQUN0QyxhQUNGLENBQ0EsaUxBQ0UsMk1BQ0YsQ0FDQSw0RUFDRSxzQ0FDRixDQUNBLHVPQUNFLGVBQ0YsQ0FDQSxtUEFDRSxnQ0FDRixDQUNBLDJTQUNFLFdBQ0YsQ0FDQSx5VEFDRSxhQUNGLENBQ0EscVZBQ0UsZUFDRixDQUNBLG1WQUNFLGtCQUNGLENBS0EsNG5CQUNFLFNBQVUsQ0FDVixtQkFDRiIsImZpbGUiOiJWaWV3Q29uZmlnLm1vZHVsZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLl8ge1xuICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XG4gIHNjcm9sbC1iZWhhdmlvcjogc21vb3RoO1xufVxuLl86Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgd2lkdGg6IDA7XG59XG4uXzo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICBiYWNrZ3JvdW5kLWNsaXA6IGNvbnRlbnQtYm94O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTk5OTk5O1xuICBib3JkZXI6IDAuMjVyZW0gc29saWQgcmdiYSgwLCAwLCAwLCAwKTtcbiAgYm9yZGVyLXJhZGl1czogMXJlbTtcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgMC4wNWVtIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcbn1cbi5fOmhvdmVyOjotd2Via2l0LXNjcm9sbGJhciB7XG4gIHdpZHRoOiAwLjg3NXJlbTtcbn1cblxuLl8ge1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBvdmVyZmxvdy15OiBvdmVybGF5O1xuICB6LWluZGV4OiAxMTtcbiAgZm9udC1zaXplOiAwLjg3NWVtO1xufVxuLl8gLlRpdGxlLFxuLl8gLkluZm8ge1xuICBwYWRkaW5nOiAwLjYyNWVtIDEuMTI1ZW07XG59XG4uXyAuVGl0bGUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMDgpO1xuICBmb250LXNpemU6IDFlbTtcbiAgbWFyZ2luOiAwO1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuLl8gLkluZm8ge1xuICBmb250LXNpemU6IDAuODc1ZW07XG59XG4uXyAuTGFiZWwge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgbWF4LXdpZHRoOiAxNmVtO1xufVxuLl86Z2xvYmFsKC51aS5kcm9wZG93bikgOmdsb2JhbCgubWVudSkgOmdsb2JhbCgudWkuaW5wdXQpIHtcbiAgbWFyZ2luLXRvcDogMC41ZW07XG4gIG1hcmdpbi1ib3R0b206IDAuNWVtO1xufVxuLl86Z2xvYmFsKC51aS5kcm9wZG93bikgOmdsb2JhbCgubWVudSkgOmdsb2JhbCgudWkuaW5wdXQpIGlucHV0IHtcbiAgYm9yZGVyLXJhZGl1czogMTAwcHg7XG59XG4uXzpnbG9iYWwoLnVpLmRyb3Bkb3duKSA6Z2xvYmFsKC5tZW51KSAuVmlld0NvbmZpZ0l0ZW0sIC5fOmdsb2JhbCgudWkuZHJvcGRvd24pIDpnbG9iYWwoLm1lbnUpID4gLlZpZXdDb25maWdJdGVtOmdsb2JhbCguaXRlbSkge1xuICBwYWRkaW5nOiAwLjYyNXJlbSAxLjEyNXJlbSAhaW1wb3J0YW50O1xuICBjdXJzb3I6IHVybChcIi4vaW1nL3BsdXMuc3ZnXCIpLCBwb2ludGVyO1xuICBmb250LXNpemU6IDFlbTtcbn1cbi5fOmdsb2JhbCgudWkuZHJvcGRvd24pIDpnbG9iYWwoLm1lbnUpIC5WaWV3Q29uZmlnSXRlbTpnbG9iYWwoLmFjdGl2ZSksIC5fOmdsb2JhbCgudWkuZHJvcGRvd24pIDpnbG9iYWwoLm1lbnUpID4gLlZpZXdDb25maWdJdGVtOmdsb2JhbCguaXRlbSk6Z2xvYmFsKC5hY3RpdmUpIHtcbiAgY3Vyc29yOiB1cmwoXCIuL2ltZy9taW51cy5zdmdcIiksIHBvaW50ZXI7XG59XG4uXzpnbG9iYWwoLnVpLmRyb3Bkb3duKSA6Z2xvYmFsKC5tZW51KSAuQWN0aXZlSXRlbXMge1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuLl86Z2xvYmFsKC51aS5kcm9wZG93bikgOmdsb2JhbCgubWVudSkgLkFjdGl2ZUl0ZW1zIC5WaWV3Q29uZmlnSXRlbSwgLl86Z2xvYmFsKC51aS5kcm9wZG93bikgOmdsb2JhbCgubWVudSkgLkFjdGl2ZUl0ZW1zID4gLlZpZXdDb25maWdJdGVtOmdsb2JhbCguaXRlbSkge1xuICBmb250LXdlaWdodDogNDAwO1xufVxuLl86Z2xvYmFsKC51aS5kcm9wZG93bikgOmdsb2JhbCgubWVudSkgLkFjdGl2ZUl0ZW1zIC5WaWV3Q29uZmlnSXRlbTpob3ZlciwgLl86Z2xvYmFsKC51aS5kcm9wZG93bikgOmdsb2JhbCgubWVudSkgLkFjdGl2ZUl0ZW1zID4gLlZpZXdDb25maWdJdGVtOmdsb2JhbCguaXRlbSk6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMDUpO1xufVxuLl86Z2xvYmFsKC51aS5kcm9wZG93bikgOmdsb2JhbCgubWVudSkgLkFjdGl2ZUl0ZW1zIC5WaWV3Q29uZmlnSXRlbSAuTW92ZUJ1dHRvbnMsIC5fOmdsb2JhbCgudWkuZHJvcGRvd24pIDpnbG9iYWwoLm1lbnUpIC5BY3RpdmVJdGVtcyA+IC5WaWV3Q29uZmlnSXRlbTpnbG9iYWwoLml0ZW0pIC5Nb3ZlQnV0dG9ucyB7XG4gIGZsb2F0OiByaWdodDtcbn1cbi5fOmdsb2JhbCgudWkuZHJvcGRvd24pIDpnbG9iYWwoLm1lbnUpIC5BY3RpdmVJdGVtcyAuVmlld0NvbmZpZ0l0ZW0gLk1vdmVCdXR0b25zID4gYnV0dG9uLCAuXzpnbG9iYWwoLnVpLmRyb3Bkb3duKSA6Z2xvYmFsKC5tZW51KSAuQWN0aXZlSXRlbXMgPiAuVmlld0NvbmZpZ0l0ZW06Z2xvYmFsKC5pdGVtKSAuTW92ZUJ1dHRvbnMgPiBidXR0b24ge1xuICBtYXJnaW46IC0xZW0gMDtcbn1cbi5fOmdsb2JhbCgudWkuZHJvcGRvd24pIDpnbG9iYWwoLm1lbnUpIC5BY3RpdmVJdGVtcyAuVmlld0NvbmZpZ0l0ZW0gLk1vdmVCdXR0b25zID4gYnV0dG9uOmZpcnN0LW9mLXR5cGUsIC5fOmdsb2JhbCgudWkuZHJvcGRvd24pIDpnbG9iYWwoLm1lbnUpIC5BY3RpdmVJdGVtcyA+IC5WaWV3Q29uZmlnSXRlbTpnbG9iYWwoLml0ZW0pIC5Nb3ZlQnV0dG9ucyA+IGJ1dHRvbjpmaXJzdC1vZi10eXBlIHtcbiAgbWFyZ2luLWxlZnQ6IDFlbTtcbn1cbi5fOmdsb2JhbCgudWkuZHJvcGRvd24pIDpnbG9iYWwoLm1lbnUpIC5BY3RpdmVJdGVtcyAuVmlld0NvbmZpZ0l0ZW0gLk1vdmVCdXR0b25zID4gYnV0dG9uOmxhc3Qtb2YtdHlwZSwgLl86Z2xvYmFsKC51aS5kcm9wZG93bikgOmdsb2JhbCgubWVudSkgLkFjdGl2ZUl0ZW1zID4gLlZpZXdDb25maWdJdGVtOmdsb2JhbCguaXRlbSkgLk1vdmVCdXR0b25zID4gYnV0dG9uOmxhc3Qtb2YtdHlwZSB7XG4gIG1hcmdpbi1yaWdodDogLTAuNGVtO1xufVxuLl86Z2xvYmFsKC51aS5kcm9wZG93bikgOmdsb2JhbCgubWVudSkgLkFjdGl2ZUl0ZW1zIC5WaWV3Q29uZmlnSXRlbTpmaXJzdC1vZi10eXBlIGJ1dHRvblthcmlhLWxhYmVsPVwiTW92ZSB1cFwiXSwgLl86Z2xvYmFsKC51aS5kcm9wZG93bikgOmdsb2JhbCgubWVudSkgLkFjdGl2ZUl0ZW1zID4gLlZpZXdDb25maWdJdGVtOmdsb2JhbCguaXRlbSk6Zmlyc3Qtb2YtdHlwZSBidXR0b25bYXJpYS1sYWJlbD1cIk1vdmUgdXBcIl0ge1xuICBvcGFjaXR5OiAwO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cbi5fOmdsb2JhbCgudWkuZHJvcGRvd24pIDpnbG9iYWwoLm1lbnUpIC5BY3RpdmVJdGVtcyAuVmlld0NvbmZpZ0l0ZW06bGFzdC1vZi10eXBlIGJ1dHRvblthcmlhLWxhYmVsPVwiTW92ZSBkb3duXCJdLCAuXzpnbG9iYWwoLnVpLmRyb3Bkb3duKSA6Z2xvYmFsKC5tZW51KSAuQWN0aXZlSXRlbXMgPiAuVmlld0NvbmZpZ0l0ZW06Z2xvYmFsKC5pdGVtKTpsYXN0LW9mLXR5cGUgYnV0dG9uW2FyaWEtbGFiZWw9XCJNb3ZlIGRvd25cIl0ge1xuICBvcGFjaXR5OiAwO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn0iXX0= */";
var styles = {"_":"☕️_ViewConfig____2hdjc","Info":"☕️_ViewConfig_Info__2hdjc","Title":"☕️_ViewConfig_Title__2hdjc","Label":"☕️_ViewConfig_Label__2hdjc","ViewConfigItem":"☕️_ViewConfig_ViewConfigItem__2hdjc","ActiveItems":"☕️_ViewConfig_ActiveItems__2hdjc","MoveButtons":"☕️_ViewConfig_MoveButtons__2hdjc"};
styleInject(css_248z);

var _excluded$1 = ["isActive", "itemAdd", "itemRemove", "label", "moveItemDown", "moveItemUp", "state"];
var cx = classNames.bind(styles);
var propTypes$3 = {
  isActive: pt.bool,
  itemAdd: pt.func.isRequired,
  itemRemove: pt.func.isRequired,
  label: pt.string.isRequired,
  moveItemDown: pt.func.isRequired,
  moveItemUp: pt.func.isRequired,
  state: pt.shape({
    hide: pt.func,
    modal: pt.bool,
    placement: pt.string,
    preventBodyScroll: pt["boolean"],
    unstable_popperModifiers: pt.arrayOf(pt.shape({
      name: pt.string,
      options: pt.shape({
        offset: pt.func
      })
    }))
  }).isRequired
};

var ViewConfigItem = function ViewConfigItem(_ref) {
  var isActive = _ref.isActive,
      itemAdd = _ref.itemAdd,
      itemRemove = _ref.itemRemove,
      label = _ref.label,
      moveItemDown = _ref.moveItemDown,
      moveItemUp = _ref.moveItemUp,
      state = _ref.state,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$1);

  var originalObject = useMemo(function () {
    return _extends({
      label: label
    }, rest);
  }, [label, rest]);
  var handleItemAdd = useCallback(function () {
    itemAdd(originalObject);
  }, [itemAdd, originalObject]);
  var handleItemRemove = useCallback(function () {
    itemRemove(originalObject);
  }, [itemRemove, originalObject]);
  var handlemoveItemUp = useCallback(function (e) {
    e.stopPropagation();
    moveItemUp(originalObject);
  }, [moveItemUp, originalObject]);
  var handlemoveItemDown = useCallback(function (e) {
    e.stopPropagation();
    moveItemDown(originalObject);
  }, [moveItemDown, originalObject]);
  return /*#__PURE__*/React.createElement(MenuItem, _extends({}, state, {
    as: "div",
    className: cx('item', ['ViewConfigItem'], {
      active: isActive
    }),
    onClick: isActive ? handleItemRemove : handleItemAdd
  }), /*#__PURE__*/React.createElement("span", {
    className: styles.Label
  }, label), isActive && /*#__PURE__*/React.createElement("div", {
    className: styles.MoveButtons
  }, /*#__PURE__*/React.createElement(Button$1, {
    "aria-label": "Move up",
    icon: arrowUpIcon,
    onClick: handlemoveItemUp,
    size: "small"
  }), /*#__PURE__*/React.createElement(Button$1, {
    "aria-label": "Move down",
    icon: arrowDownIcon,
    onClick: handlemoveItemDown,
    size: "small"
  })));
};

ViewConfigItem.propTypes = propTypes$3;

var _excluded = ["currentSelection"];
var MemoViewConfigItem = /*#__PURE__*/memo(ViewConfigItem);
var propTypes$2 = VIEW_CONFIG_PROP_TYPES;

var ViewConfig$1 = function ViewConfig(_ref) {
  var _ref$isInitialOpen = _ref.isInitialOpen,
      isInitialOpen = _ref$isInitialOpen === void 0 ? false : _ref$isInitialOpen,
      options = _ref.options,
      _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? 'bottom-end' : _ref$placement,
      state = _ref.state,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Columns' : _ref$title,
      _ref$trigger = _ref.trigger,
      trigger = _ref$trigger === void 0 ? DEFAULT_TRIGGER : _ref$trigger;

  // Check if the state hook is being used. We do this check inside the
  // base component so the parent error boundary will catch.
  if (!state) {
    throw new Error('ViewConfig requires a useViewConfigState hook.');
  } // Set a ref on our trigger to pass into the disclosure and also measure clientHeight


  var triggerRef = useRef();

  var _useState = useState(''),
      searchValue = _useState[0],
      setSearchValue = _useState[1];

  var menuState = useMenuState({
    // This MUST be modal: true in order to render in a portal or else we
    // will have problems with any menus rendered inside of positioned
    // elements other than "relative"
    modal: true,
    placement: placement,
    preventBodyScroll: true,
    unstable_popperModifiers: DEFAULT_CASCARA_MODIFIERS,
    visible: isInitialOpen
  });
  var _state$currentSelecti = state.currentSelection,
      activeOptions = _state$currentSelecti === void 0 ? [] : _state$currentSelecti;

  var hasMatch = function hasMatch(_ref2) {
    var label = _ref2.label;
    return searchValue ? // This uses a regex to do a case insensitive match
    label.match(new RegExp(searchValue, 'i')) : true;
  };

  var filteredInactiveOptions = compose(without(activeOptions), filter(hasMatch))(options);

  var renderOptions = function renderOptions(options, isSelected) {
    return options.map(function (option) {
      state.currentSelection;
          var setterFunctions = _objectWithoutPropertiesLoose(state, _excluded);

      return /*#__PURE__*/React.createElement(MemoViewConfigItem, _extends({}, option, setterFunctions, {
        isActive: isSelected,
        key: option.label,
        state: menuState
      }));
    });
  };

  var handleSearchValue = useCallback(function (e) {
    setSearchValue(e.target.value);
  }, []);
  var handleClearSearch = useCallback(function () {
    setSearchValue('');
  }, []); // Do not render anything if we have not passed any options

  return options ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MenuButton, _extends({}, menuState, trigger.props, {
    ref: triggerRef
  }), function (disclosureProps) {
    return /*#__PURE__*/React.cloneElement(trigger, disclosureProps);
  }), /*#__PURE__*/React.createElement(Menu, _extends({}, menuState, {
    "aria-label": "options menu",
    className: "ui dropdown active visible " + styles._,
    tabIndex: 0
  }), /*#__PURE__*/React.createElement("div", {
    className: 'menu transition visible',
    style: {
      position: 'initial'
    }
  }, title && /*#__PURE__*/React.createElement("h4", {
    className: styles.Title
  }, title), activeOptions.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: styles.ActiveItems
  }, renderOptions(activeOptions, true)), /*#__PURE__*/React.createElement("div", {
    className: "ui icon input"
  }, searchValue && /*#__PURE__*/React.createElement(Clickable, {
    as: "i",
    className: "close icon",
    onClick: handleClearSearch,
    onKeyDown: handleClearSearch,
    role: "button",
    style: {
      cursor: 'pointer',
      opacity: 1,
      pointerEvents: 'all'
    },
    tabIndex: 0
  }), /*#__PURE__*/React.createElement("input", {
    onChange: handleSearchValue,
    placeholder: "Search...",
    type: "search",
    value: searchValue
  })), filteredInactiveOptions.length > 0 ? renderOptions(filteredInactiveOptions) : /*#__PURE__*/React.createElement("div", {
    className: styles.Info
  }, searchValue ? /*#__PURE__*/React.createElement("em", null, "No results") : /*#__PURE__*/React.createElement("em", null, "All selected"))))) : null;
};

ViewConfig$1.propTypes = propTypes$2;

var propTypes$1 = VIEW_CONFIG_PROP_TYPES;

var ViewConfig = function ViewConfig(props) {
  var options = props.options; // Render the loading version of the trigger if no options are defined yet.

  return /*#__PURE__*/React.createElement(Boundaries, null, options ? /*#__PURE__*/React.createElement(ViewConfig$1, props) : LOADING_TRIGGER);
};

ViewConfig.propTypes = propTypes$1;

var propTypes = {
  /** An optional text label for the cancel button */
  cancelLabel: pt.node,

  /** An optional text label for the edit button */
  editLabel: pt.node,

  /** An optional text label for the save button */
  saveLabel: pt.node
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
  return isEditing ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button$2, {
    "aria-label": "Cancel",
    className: "ui negative icon button",
    disabled: isSubmitting,
    name: "edit.cancel",
    onClick: handleCancel,
    type: "button"
  }, cancelLabel), /*#__PURE__*/React.createElement(Button$2, {
    "aria-label": "Save",
    className: "ui positive icon button",
    disabled: !isDirty || isSubmitting,
    name: "edit.save",
    onClick: handleSubmit(onSubmit),
    type: "button"
  }, saveLabel)) : /*#__PURE__*/React.createElement(Button$2, {
    "aria-label": "Edit",
    className: "ui basic icon button",
    disabled: whenAnotherRowIsEditing,
    name: "edit.start",
    onClick: handleEdit,
    type: "button"
  }, editLabel);
};

ActionEdit.propTypes = propTypes;

export { ActionEdit as ActionEditTable, ModuleSandbox, Popover, ViewConfig, useBoolean, useViewConfigState };
//# sourceMappingURL=private.js.map
