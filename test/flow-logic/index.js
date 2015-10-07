import test from 'tape';

import rfx from '../../source/index';

/*
rfx(myInterface).with({
  name: 'myFxName',
  doc: `A nice multiline description here... and since
  we're in ES6, it supports injected ${ vars }.`,
  fn: myFunction
});
*/

test('rfx', nest => {
  nest.test('...with lambda as rtype, dev env, & no args', assert => {
    process.env.NODE_ENV = 'development';

    rfx(() => {
      assert.pass('should call typecheck function');
      assert.end();
    }).with({
      fn () {}
    })();
  });

  nest.test('...with lambda as rtype, dev env, & invalid args', assert => {
    assert.plan(4);

    process.env.NODE_ENV = 'development';

    rfx((input) => {
      assert.pass('should type check');

      return typeof input === 'boolean';
    }).with({
      fn () {
        assert.pass('should call fn');
      },
      onError ({ args, options }) {
        assert.test(' - onError signature', a => {
          const actual = {
            hasArgs: args.length === 3,
            hasOptions: options
          };
          const expected = {
            hasArgs: true,
            hasOptions: options
          };

          a.deepEqual(actual, expected,
            'should pass args to onError');
          a.end();
        });

        assert.pass('should call onError');
      }
    })('foo', 'bar', 'baz');
  });
});
