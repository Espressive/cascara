// Action Modules
import ActionButton from './ActionButton';
import ActionEdit from './ActionEdit';

// Data Modules
import DataColor from './DataColor';
import DataCheckbox from './DataCheckbox';
import DataDate from './DataDate';
import DataDateTime from './DataDateTime';
import DataEmail from './DataEmail';
import DataFile from './DataFile';
import DataImage from './DataImage';
import DataJson from './DataJson';
import DataMonth from './DataMonth';
import DataNumber from './DataNumber';
import DataPassword from './DataPassword';
import DataRadio from './DataRadio';
import DataRange from './DataRange';
import DataSelect from './DataSelect';
import DataTel from './DataTel';
import DataText from './DataText';
import DataTextArea from './DataTextArea';
import DataTime from './DataTime';
import DataWeek from './DataWeek';
import DataUrl from './DataUrl';

const actionModules = {
  button: ActionButton,
  edit: ActionEdit,
};

const dataModules = {
  // switch: DataCheckbox,
  color: DataColor,
  checkbox: DataCheckbox,
  date: DataDate,
  datetime: DataDateTime,
  email: DataEmail,
  file: DataFile,
  image: DataImage,
  json: DataJson,
  month: DataMonth,
  number: DataNumber,
  passord: DataPassword,
  radio: DataRadio,
  range: DataRange,
  select: DataSelect,
  tel: DataTel,
  text: DataText,
  textarea: DataTextArea,
  time: DataTime,
  url: DataUrl,
  week: DataWeek,
};

export { actionModules, dataModules };
