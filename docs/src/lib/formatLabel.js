const formatLabel = (text) =>
  text
    .toLowerCase()
    .replace('-', ' ')
    .split(' ')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');

export default formatLabel;
