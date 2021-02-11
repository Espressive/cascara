import { currentPlatform } from '../utils';

const optionClickHandlers = {
  web: () => alert('This is the default handleOptionClick()'),
};

const handleOptionClick =
  optionClickHandlers[currentPlatform] || optionClickHandlers['web']; // This needs to be done to set the handler if we do not have anything platform specific

export { handleOptionClick };
