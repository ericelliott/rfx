export default function rfx({ type, onError, fn }) {
  const shouldCheck = typeof type === 'function'
    && process && process.env.NODE_ENV !== 'production';

  return (...args) => {
    if (shouldCheck && !type(...args) && typeof onError === 'function') {
      onError({ args, options: arguments[0] });  
    }
    return fn(...args);
  };
};
