// Action Modules
import ActionButton from './ActionButton';
import ActionEdit from './ActionEdit';

// Data Modules
import DataCheckbox from './DataCheckbox';
import DataEmail from './DataEmail';
import DataJson from './DataJson';
import DataNumber from './DataNumber';
import DataRadio from './DataRadio';
import DataSelect from './DataSelect';
import DataText from './DataText';
import DataTextArea from './DataTextArea';
import DataFile from './DataFile';
import DataDate from './DataDate';
import DataDateTime from './DataDateTime';
import DataWeek from './DataWeek';

const actionModules = {
  button: ActionButton,
  edit: ActionEdit,
};

const dataModules = {
  // switch: DataCheckbox,
  checkbox: DataCheckbox,
  date: DataDate,
  datetime: DataDateTime,
  email: DataEmail,
  file: DataFile,
  json: DataJson,
  number: DataNumber,
  radio: DataRadio,
  select: DataSelect,
  text: DataText,
  textarea: DataTextArea,
  week: DataWeek,
};

export { actionModules, dataModules };
