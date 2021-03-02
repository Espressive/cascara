import { handleDownloadAttachment } from '../handlers';
import { getNodesFromMarkdown, getOptionsObjects } from './';

const getNormalizedMessages = (messages) => {
  // We need to take the array of message objects and modify it to match the
  // API of our Chat component. This business logic should not exist inside
  // of the chat component. If we do not want to display a message, we should
  // not pass an object into the Chat component itself. It is possible that
  // there should be a filter step after the array of messages is returned
  // which we can use to remove message objects from being passed.
  const messageObjects = messages
    .map((message) => {
      // There are some scenarios where we need to change the message type
      // to match our message components. This flat map can be extended with
      // more types if needed.

      // TODO: These might be best suited as a folder of `messageTypes` at some point
      const customMessageTypes = {
        attachment: {
          eval: (msg) => Boolean(msg.type === 'attachment'),
          params: {
            handleDownloadAttachment,
          },
        },
        options: {
          eval: (msg) =>
            Boolean(
              msg.type === 'message' && msg?.metadata?.user_input?.select
            ),
          params: {
            options: getOptionsObjects(message?.metadata?.user_input?.select),
          },
        },
        widget: { eval: (msg) => Boolean(msg?.metadata?.widget) },
      };

      let uniqueMessageParams = {}; // Not all messages will utilize options arrays

      // We have some unique scenarios where we want to change the type for
      // the Chat component to display something differently
      for (const [key, obj] of Object.entries(customMessageTypes)) {
        if (obj.eval(message)) {
          // For these scenarios, we will override the type and also add some component
          // specific parameters. This way, things that are unique to a use case will only
          // get passed to the underlying component in the message object.
          uniqueMessageParams = { type: key, ...obj.params };
        }
      }

      // TODO: Right now, we always return an object for each message, which will display something
      // in Chat. We may want to make this function opt-in and force ourselves to add an `eval`
      // rule for each message type and if we do not match, we return null and do not show a message
      return {
        // spread the original `message` object
        ...message,
        // `uniqueMessageParams` needs to be spread after the original `message` because we may be changing the initial system `type`
        ...uniqueMessageParams,
        text: message.text ? getNodesFromMarkdown(message.text) : undefined,
        timestamp: message.sys_date_created
          ? new Date(message.sys_date_created).toLocaleString()
          : undefined,
      };
    })
    // remove any null items from our array in case we decided to not return an object to display a message
    .filter((el) => el != null)
    .reverse();

  return messageObjects;
};

export { getNormalizedMessages };
