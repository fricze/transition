import { flushSync } from "react-dom";

export const withTransition = async (callback) => {
  const _document = document;

  if (!_document.createDocumentTransition) {
    return callback();
  }

  const transition = _document.createDocumentTransition();

  flushSync(() => void(0));

  await transition.start(() => {
    flushSync(() => {
      callback();
    });
  });

  return null;
};
