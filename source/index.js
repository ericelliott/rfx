import 'core-js';

const runCheck = ({ rtype, onError, options }) => {
  return (...args) => {
    if (!rtype(...args) && typeof onError === 'function') {
      const errorMessage = (
        `Type check failed!${ rtype.signature ?
          (
            ` Expected signature: \`${ rtype.signature }\`. More info: ` +
            'https://git.io/rtype .'
          ) :
          ''
        }`
      );

      const error = Object.assign(
        new TypeError(errorMessage),
        { args, options }
      );

      onError(error);
    }
  };
};

const buildCheck = (params) => {
  const { shouldCheck, rtype, options } = params;

  const shouldThrowByDefault = typeof process !== 'undefined' &&
    process.env.NODE_ENV === 'development';

  const onError = (typeof options.onError === 'function' ?
    options.onError :
    (shouldThrowByDefault ?
      (error) => { throw error; } :
      null
    )
  );

  return shouldCheck ?
    typeof rtype === 'function' ?
      runCheck({ rtype, onError, options }) :
      null :
    null;
};

const rfx = (options = {}) => {
  const { type, onError } = options;

  const shouldCheck = typeof process !== 'undefined' &&
    process.env.NODE_ENV !== 'production';

  const check = buildCheck({ shouldCheck, rtype: type, onError, options });

  return Object.assign(function fx (...args) {
    const { fn } = options;
    if (typeof check === 'function') check(...args);
    return fn(...args);
  }, options.fn, options);
};

export * from './predicates';

export default rfx;
