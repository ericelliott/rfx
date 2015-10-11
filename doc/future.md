# rfx Future

## Alias `type` as `t`:

```js
rfx({
  t: signature
  fn () { /* ... */ }
});
```

## Multiple type signatures:

```js
rfx({
  t: [
    sig`(...args: obj[]): obj`,
    sig`(input: string): foo`,
    rt`interface foo { bar: string }`
  ],
  fn (input, ...args) { /* ... */ }
});
```
