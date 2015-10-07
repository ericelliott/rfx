# rfx

Easy composable interfaces for JavaScript.

In `rfx`, interfaces are called `fx`. The `r` stands for [rtype](https://github.com/ericelliott/rtype#rtype).

`rfx` does two pretty amazing things:

* Lets you easily specify Rtypes in standard JavaScript. What's possible with rtypes?
  - Generate docs like JSDoc.
  - Generate external TypeScript annotation files for IDE tooling.
  - Access type metadata inside your program at runtime.
  - Optional runtime typechecking in development.

## Status - Developer Preview

`rfx` is not fully implemented, yet. We still have to write an rtype parser. However, feel free to experiment with `React.PropTypes` or regular predicate functions. What's a predicate function, you ask? Give it some arguments, and get back a `true` or `false` value indicating whether or not the arguments passed the test.

Here's the [Rtype signature](https://github.com/ericelliott/rtype#rtype) for the predicate function:

```js
(...args: any): boolean
```


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

const myInterface = rfx(predicate).with({
  name: 'myFxName',
  doc: `A nice multiline description here... and since
  we're in ES6, it supports injected ${ vars }.`,
  fn: myFunction
});
```
