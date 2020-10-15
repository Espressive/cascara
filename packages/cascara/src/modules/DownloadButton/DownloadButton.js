import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import ErrorBoundary from '../../shared/ErrorBoundary';

const propTypes = {
  ctaText: PropTypes.string,
  data: PropTypes.string.isRequired,
  fileName: PropTypes.string,
  fileType: PropTypes.string,
};

/**
 * DownloadButton
 *
 * In certain cases you might need to export some in-memory data, e.g. as CSV text.
 * This component will accept alphanumeric data, its mime type and other params to
 * create an HTML anchor that will trigger a file download when clicked.
 *
 * Data is enconded as a Blob, it allows you to specify the MIME type of the data.
 *
 * @param {Object} props
 * @param {String} props.ctaText Text shown inside the anchor
 * @param {String} props.data The data to be encoded into a Blob
 * @param {String} props.fileName The name of the file when downloaded
 * @param {String} props.fileType The MIME type of the data
 */
const DownloadButton = ({
  ctaText = 'download',
  data,
  fileName = 'download.txt',
  fileType = 'text/plain',
  onClick,
}) => {
  const blob = new Blob([data], { fileType });
  const url = URL.createObjectURL(blob);

  return (
    <ErrorBoundary>
      <Button as='a' basic download={fileName} href={url} onClick={onClick}>
        {ctaText}
      </Button>
    </ErrorBoundary>
  );
};

DownloadButton.displaName = 'DownloadButton';
DownloadButton.propTypes = propTypes;

export { propTypes };
export default DownloadButton;
