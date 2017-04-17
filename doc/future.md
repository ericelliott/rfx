# rfx Future

Ideas / dream code for where to take rfx in the future.

## Replace with Tagged Template Literal

```js
const add2 = rfx`
// Take two values, a & b, and return the sum.
add2(a: n, b: n) => Number
`(
  (a, b) => a + b
);
```

More complex example:

```js
const composeMixins = rfx`
/*
  Take any number of functional mixins
  and return their composition as a
  factory function.
*/
composeMixins(...mixins: [...Function]) => (
  obj = {}: o,
  piped?: o => m
) => m
`((...mixins) => (
  obj = {},
  piped = obj => mixins.reduce((a, fn) => fn(a), obj)
) => piped(obj));
```
