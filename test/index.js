const test = require('tape');
const rfx = require('../source');

test('rfx.rfx()', assert => {
  const msg = 'should augment with .rfx() method';

  const actual = typeof rfx.rfx;
  const expected = 'function';

  assert.same(actual, expected, msg);
  assert.end();
});

test('fx.rfx.signature', assert => {
  const msg = 'should augment with rfx.signature string';

  const actual = rfx`string`(() => {}).rfx.signature;
  const expected = 'string';

  assert.same(actual, expected, msg);
  assert.end();
});

test('rfx preserve props', assert => {
  const msg = 'should preserve props from original';

  const fx = rfx`test`({ foo: 'foo' });
  const actual = fx.foo;
  const expected = 'foo';

  assert.equal(actual, expected, msg);
  assert.end();
});
