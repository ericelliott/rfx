import test from 'tape';
import rfx from '../../source/index';
import { compose, isComposable } from 'stamp-utils';

test('rfx with composable', assert => {
  const msg = 'should return a composable';
  const fx = rfx({
    fn: compose()
  });
  const actual = isComposable(fx);
  const expected = true;

  assert.equal(actual, expected, msg);
  assert.end();
});
