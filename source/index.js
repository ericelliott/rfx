const runCheck = ({ rtype, onError, options }) => {
  return (...args) => {
    if (!rtype(...args)) {
      onError({ args, options });
    }
  };
};

const defaultOnError = () => {
  return ({ args, options }) => {
    console.warn(`TypeError:
      Expected: ${ options }
      Actual: ${ JSON.stringify(args) }`);
    throw new Error('Should not call default onError');
  };
};

const buildCheck = ({ shouldCheck, rtype, onError, options }) => {
  const err = onError || defaultOnError;
  return shouldCheck ?
    typeof rtype === 'function' ?
      runCheck({ rtype, onError: err, options }) :
      null :
    null;
};

const rfx = (rtype) => {
  return {
    with (options = {}) {
      const { onError } = options;

      const shouldCheck = process.env.NODE_ENV === 'development';
      const check = buildCheck({ shouldCheck, rtype, onError, options });

      return (...args) => {
        const { fn } = options;
        if (typeof check === 'function') check(...args);
        fn(...args);
      };
    }
  };
};

export default rfx;
