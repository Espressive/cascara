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
import DataImage from './DataImage';
import DataDate from './DataDate';
import DataDateTime from './DataDateTime';
import DataMonth from './DataMonth';
import DataPassword from './DataPassword';
import DataTel from './DataTel';

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
  image: DataImage,
  json: DataJson,
  month: DataMonth,
  number: DataNumber,
  passord: DataPassword,
  radio: DataRadio,
  select: DataSelect,
  tel: DataTel,
  text: DataText,
  textarea: DataTextArea,
};

export { actionModules, dataModules };
