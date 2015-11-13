# rfx

Self documenting, runtime interfaces.

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
(...args?: Any[]): Boolean
```

Roadmap:
* [x] Predicate function support
* [ ] Add rtype builtins
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
 * ... (Lots of info. Not too readable.)
 */
function myFunction (param, otherParam, options) {
  if (typeof param !== 'string') throw new TypeError('Oh noes!');
  if (typeof otherParam !== 'object' || /* ...
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
import rfx from 'rfx';

export const myFunction = (param, otherParam, options) => {
  /* (Just business logic.) */
}

const type = (param, otherParam, options) => (
  typeof param === 'string' &&
  typeof otherParam === 'object' &&
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

myInterface(1, 2, {}); // Run `myFunction` with runtime type checking…

myFunction(1, 2, {}); // …or just the raw thing. Lightning-fast!
```


**There’s more!**

Soon you won’t need to write the `type` and `name` by hand!

```js
import r from 'parse-rtype';  // Watch out! This is dreamcode!

export const myInterface = rfx({
  type: r`
    myFxName(
      param: string,
      otherParam: [x, y]: number[],
      options?: {beep = false: boolean},
    ): number
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
  fn: Function
}): Function
```

### The `type` Parameter

The `type` parameter expects an `rtype` interface, which comes in many different forms, including standard JS literal notations.

It can also take a `predicate` function:

```js
predicate(...args?: Any[]): Boolean
```
