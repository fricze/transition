import { flushSync } from "react-dom";

export const withTransition = async (callback) => {
  if (!document.createDocumentTransition) {
    return callback();
  }

  const transition = document.createDocumentTransition();

  flushSync(() => void(0));

  await transition.start(() => {
    flushSync(() => {
      callback();
    });
  });

  return null;
};
