# rfx

Self documenting runtime interfaces.

In `rfx`, interfaces are called `fx`. The `r` stands for [rtype](https://github.com/ericelliott/rtype#rtype).

What does `rfx` do?

`rfx` lets you easily specify [rtypes](https://github.com/ericelliott/rtype#rtype) in standard JavaScript. What could be possible with rtypes?
  - Write code that documents itself.
  - Access type metadata inside your program at runtime.
  - Generate docs like JSDoc. (Future)
  - Enhance IDE tooling. (Future)
  - Optional runtime type checking. (Future)

It's driven by the idea originally inspired by Lisp: Code as data. We're extending this concept to type information and documentation metadata.

This provides several benefits, but importantly, it makes your code literally self-documenting, and paves the way for powerful in-app developer tooling that is not available using compile-time type systems such as TypeScript. (Note: The TypeScript team is actively working on [runtime type reflection](http://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-4), but it currently requires you to opt-in to experimental TypeScript features, and it works using the unstable `Reflect` API proposal for some future ES Next).


## Status - Request for Comments

The documentation features of `rfx` are working today. Feel free to experiment and open an issue with your comments.


## Getting Started

`rfx` is super easy to use. In place of a regular function expression or declaration, call the `rfx` with a tagged template literal containing your rtype documentation. The rtype function is a curried function that will return a function that you pass your code into.

```sh
npm install --save rfx
```

```js
import rfx from 'rfx';

const add2 = rfx`
// Take two values, a & b, and return the sum.
add2(a: n, b: n) => Number
`(
  (a, b) => a + b
);

add2.rfx(); // logs tagged description to the console.
```

See [rtype](https://github.com/ericelliott/rtype#rtype) for more info.


Brought to You by Learn JavaScript with Eric Elliott
====================================================
<a href="https://ericelliottjs.com"><img width="1200" alt="eejs-screenshot" src="https://cloud.githubusercontent.com/assets/364727/8640836/76d86618-28c3-11e5-8b6e-27d9cd72180e.png"></a>

[![Join the chat at https://gitter.im/learn-javascript-courses/javascript-questions](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/learn-javascript-courses/javascript-questions?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

An online course series for application developers. Ready to jump in? [Learn more](https://ericelliottjs.com/).
