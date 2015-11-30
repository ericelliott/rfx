# rfx

Self documenting runtime interfaces.

In `rfx`, interfaces are called `fx`. The `r` stands for [rtype](https://github.com/ericelliott/rtype#rtype).

What does `rfx` do?

`rfx` lets you easily specify [rtypes](https://github.com/ericelliott/rtype#rtype) in standard JavaScript. What could be possible with rtypes?
  - Generate docs like JSDoc.
  - Generate external TypeScript annotation files for IDE tooling.
  - Access type metadata inside your program at runtime.
  - Optional runtime typechecking in development.

It's driven by the idea originally inspired by Lisp: Code as data. We're extending this concept to type information and documentation metadata.

This provides several benefits, but importantly, it makes your code literally self-documenting, and opens up the possibility of serious realtime development using live coding systems like React Transform, and powerful in-app developer tooling that is not available using compile-time type systems such as TypeScript. (Note: The TypeScript team is actively working on [runtime type reflection](http://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-4), but it currently requires you to opt-in to experimental TypeScript features, and it works using the unstable `Reflect` API proposal for ES7+).


## Status - Developer Preview

You've arrived while the band was doing the sound check. Score! Free backstage passes!

`rfx` is not fully implemented, yet. However, feel free to experiment with `React.PropTypes` or regular predicate functions. What's a predicate function, you ask? Give it some arguments, and get back a `true` or `false` value indicating whether or not the arguments passed the test.

Here's the [Rtype signature](https://github.com/ericelliott/rtype#rtype) for the predicate function:

```js
(...args?: Any[]) => Boolean
```

Roadmap:
* [x] Predicate function support
* [x] Add rtype builtins
* [ ] Add rtype string support

See also: proposals in [rfx future](https://github.com/ericelliott/rfx/blob/master/doc/future.md).


## Getting Started

`rfx` is super easy to use. In place of a regular function expression or declaration, call `rfx` with the type information, and pass in the metadata.

**Old 'n' busted:**

```js
/**
 * A one-line description of the function’s purpose
 *
 * More docs. Just static text.
 *
 * @function myFxName
 * @param {string} param
 * @param {array} otherParam
 * @param {number} otherParam[0]
 * @param {number} otherParam[1]
 * @param {number} otherParam[2]
 * @param {object} options
 * @param {boolean} [options.beep=false]
 * @return {number}
 *
 * (Lots of info. Not too readable.)
 */
function myFunction (param, otherParam, options) {
  if (typeof param !== 'string') throw new TypeError('Oh noes!');
  if (typeof otherParam !== 'object' || otherParam.length <= 3) /* ...
  ...
  ...
  ... (Manual type checking. Dreadful!)
  ... (jsDoc info from above can’t be used in any way.)
  ...
  ...
  */

  /* (Business logic.) */
}
```


**New Hotness:**

```sh
npm install --save rfx
```

```js
import rfx, { isArray, isString } from 'rfx';

export const myFunction = (param, otherParam, options) => {
  /* (Just business logic.) */
}

const type = (param, otherParam, options) => (
  isString(param) &&
  isArray(otherParam) &&
  /* ... (Type checking optional and neatly separated!) */
);

export const myInterface = rfx({
  type,
  name: 'myFxName',
  description: 'A one-line description of the function purpose.',
  doc: `A nice multiline description here. Since
  we're in ES6, it supports injected ${ vars }.`,
  example:`
    // Example usage goes here.
    // Should be written in JavaScript.
  `,
  fn: myFunction
});

myInterface(1, 2, {}); // Run `myFunction` with optional runtime type checking
```


**There’s more!**

Soon you won’t need to write the `type` and `name` by hand!

```js
import r from 'parse-rtype';  // Watch out! This is dreamcode!

export const myInterface = rfx({
  type: r`
    myFxName(
      param: String,
      otherParam: [x: Number, y: Number, z: Number],
      options?: {beep = false: Boolean},
    ) => Number
  `,

  description: /* ... */,
  doc: /* ... */,
  example: /* ... */,
  fn: myFunction,
})
```

See [rtype](https://github.com/ericelliott/rtype#rtype) for more info.


## rfx()

Take a POJO interface description. Return a working interface, complete with optional run time type checking.

```js
rfx({
  type?: Rtype,
  name?: String,
  description?: String,
  doc?: String,
  example?: String,
  onError?: (error: TypeError) => Void,
  ...metadata?: Object,
  fn: Function
}) => Function
```

### The `type` Parameter

The `type` parameter expects an `rtype` interface, which comes in many different forms, including standard JS literal notations.

It can also take a `predicate` function:

```js
predicate(...args?: Any[]) => Boolean
```

### Error handling

Whenever the type check fails the `onError` callback will be called. This behavior is opt-out – if the environment variable `NODE_ENV` is set to `production`, no type checking will be performed.

If the type check fails and you don’t specify an `onError` callback, we’ll throw a descriptive `TypeError`. This behavior is opt-in – if you want us to throw by default, you need to set the environment variable `NODE_ENV` to `development`. You can use *[envify](https://github.com/hughsk/envify)* to make this work in your browser.

### Additional `metadata`

All properties attached to the `fn` function and to the interface description will be copied over to the interface.

You can use this to attach additional metadata to your function. We recommend namespacing your metadata to one property for better protection against name conflicts.


Brought to You by Learn JavaScript with Eric Elliott
====================================================
<a href="https://ericelliottjs.com"><img width="1200" alt="eejs-screenshot" src="https://cloud.githubusercontent.com/assets/364727/8640836/76d86618-28c3-11e5-8b6e-27d9cd72180e.png"></a>

[![Join the chat at https://gitter.im/learn-javascript-courses/javascript-questions](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/learn-javascript-courses/javascript-questions?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

An online course series for application developers. Ready to jump in? [Learn more](https://ericelliottjs.com/).
