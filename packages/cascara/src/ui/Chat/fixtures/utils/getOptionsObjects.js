import { handleOptionClick } from '../handlers';

const getOptionsObjects = (options) =>
  options?.map(({ actual_text, eid, label, ...rest }) => {
    // console.table(rest);

    return {
      content: label,
      key: eid,
      onClick: handleOptionClick,
    };
  });

export { getOptionsObjects };
