'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

require('core-js');

var runCheck = function runCheck(_ref) {
  var rtype = _ref.rtype;
  var onError = _ref.onError;
  var options = _ref.options;

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!rtype.apply(undefined, args) && typeof onError === 'function') {
      onError({ args: args, options: options });
    }
  };
};

var buildCheck = function buildCheck(_ref2) {
  var shouldCheck = _ref2.shouldCheck;
  var rtype = _ref2.rtype;
  var onError = _ref2.onError;
  var options = _ref2.options;

  return shouldCheck ? typeof rtype === 'function' ? runCheck({ rtype: rtype, onError: onError, options: options }) : null : null;
};

var rfx = function rfx() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var type = options.type;
  var onError = options.onError;

  var shouldCheck = process && process.env.NODE_ENV !== 'production';

  var check = buildCheck({ shouldCheck: shouldCheck, rtype: type, onError: onError, options: options });

  return Object.assign(function fx() {
    var fn = options.fn;

    if (typeof check === 'function') check.apply(undefined, arguments);
    return fn.apply(undefined, arguments);
  }, options.fn);
};

exports['default'] = rfx;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map