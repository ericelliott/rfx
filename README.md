# rfx

Easy composable interfaces for JavaScript.

In `rfx`, interfaces are called `fx`. The `r` stands for [rtype](https://github.com/ericelliott/rtype#rtype).

`rfx` does two pretty amazing things:

1. Lets you easily specify Rtypes in standard JavaScript. What could be possible with rtypes?
  - Generate docs like JSDoc.
  - Generate external TypeScript annotation files for IDE tooling.
  - Access type metadata inside your program at runtime.
  - Optional runtime typechecking in development.
2. Creates composable interfaces. See the [Stamp specification](https://github.com/stampit-org/stamp-specification/tree/master#stamp-specification-composables) for composition details.

It's driven by the idea originally inspired by Lisp: Code as data. We're extending this concept to type information and documentation metadata.

This provides several benefits, but importantly, it makes your code literally self-documenting, and opens up the possibility of serious realtime development using live coding systems like React Transform, and powerful in-app developer tooling that is not available using compile-time type systems such as TypeScript. (Note: The TypeScript team is actively working on [runtime type reflection](http://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-4), but it currently requires you to opt-in to experimental TypeScript features, and it works using the unstable `Reflect` API proposal for ES7+).


## Status - Developer Preview

You've arrived while the band was doing the sound check. Score! Free backstage passes!

`rfx` is not fully implemented, yet. However, feel free to experiment with `React.PropTypes` or regular predicate functions. What's a predicate function, you ask? Give it some arguments, and get back a `true` or `false` value indicating whether or not the arguments passed the test.

Here's the [Rtype signature](https://github.com/ericelliott/rtype#rtype) for the predicate function:

```js
(...args?: any): boolean
```

Roadmap:
* [x] Predicate function support
* [ ] Make composable
* [ ] Add rtype builtins
* [ ] Add rtype string support


## Getting Started

`rfx` is super easy to use. In place of a regular function expression or declaration, call `rfx` with the type information, and pass in the metadata.

**Old 'n' busted:**

```js
function myInterface (options) {
  /* do stuff with options here */
}
```


**New Hotness:**

```sh
npm install --save rfx
```

```js
import rfx from 'rfx';

const predicate = (foo) => {
  return typeof 'foo' === string;
};

const myInterface = rfx({
  type: predicate, // see rtypes
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

myInterface({}); // Runtime type warning.
```

## rfx()

Take a POJO interface description. Return a working interface, complete with optional run time type checking.

```js
rfx({
  type?: rtype,
  name?: string,
  description?: string,
  doc?: string,
  example?: string,
  fn: Function
}): composableFunction
```

### The `type` Parameter

The `type` parameter expects an `rtype` interface, which comes in many different forms, including standard JS literal notations.

It can also take a `predicate` function:

```js
predicate(...args?: any): boolean
```

### composableFunction

`rfx` Interfaces support composition using the [Stamp Specification](https://github.com/stampit-org/stamp-specification), which means that you can compose the interface with other interfaces, with stamps, or even with React components via [react-stamp](https://github.com/stampit-org/react-stamp).

```js
interface composableFunction {
  (...args?: any): any,
  compose: (...args?: stamp|descriptor): Function
}
```
