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
    '(...args: obj[]): obj',
    '(input: string): foo',
    'interface foo { bar: string }'
  ],
  fn (input, ...args) { /* ... */ }
});
```
