// Action Modules
import ActionButton from './ActionButton';

// Data Modules
import DataCheckbox from './DataCheckbox';
import DataEmail from './DataEmail';
import DataJson from './DataJson';
import DataNumber from './DataNumber';
import DataRadio from './DataRadio';
import DataSelect from './DataSelect';
import DataText from './DataText';
import DataTextArea from './DataTextArea';

const actionModules = {
  button: ActionButton,
};

const dataModules = {
  // switch: DataCheckbox,
  checkbox: DataCheckbox,
  email: DataEmail,
  json: DataJson,
  number: DataNumber,
  radio: DataRadio,
  select: DataSelect,
  text: DataText,
  textarea: DataTextArea,
};

export { actionModules, dataModules };
