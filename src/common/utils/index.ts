export const timeoutPromise = (delay = 3000) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};
