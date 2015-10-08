import test from 'tape';
import rfx from '../../source/index';
import { isComposable } from 'stamp-utils';

test('.compose()', assert => {
  const fx = rfx({
    fn () {}
  });
  const actual = isComposable(fx);
  const expected = true;

  assert.equal(actual, expected,
    'should return a composable');

  assert.end();
});
