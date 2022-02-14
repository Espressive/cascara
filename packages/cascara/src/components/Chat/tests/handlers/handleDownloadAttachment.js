import { currentPlatform } from '../utils';

const downloadAttachmentHandlers = {
  web: () => alert('This is the default handleDownload()'),
};

const handleDownloadAttachment =
  downloadAttachmentHandlers[currentPlatform] ||
  downloadAttachmentHandlers['web'];

export { handleDownloadAttachment };
