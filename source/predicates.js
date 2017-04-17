import is from 'is';

// isVoid

export function isAny () {
  return true;
}

export function isArray (...args) {
  return !!args.length && args.every((x) => is.array(x));
}

export function isBoolean (...args) {
  return !!args.length && args.every((x) => is.bool(x));
}

export function isFunction (...args) {
  return !!args.length && args.every((x) => is.fn(x));
}

export function isNumber (...args) {
  return !!args.length && args.every((x) => is.number(x));
}

export function isObject (...args) {
  return !!args.length && args.every((x) => is.object(x));
}

export function isString (...args) {
  return !!args.length && args.every((x) => is.string(x));
}

export function isVoid (...args) {
  return args.every((x) => is.undef(x));
}
