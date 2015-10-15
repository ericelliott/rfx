import test from 'tape';

import rfx from '../../source/index';

test('rfx', nest => {
  nest.test('...predicate rtype, dev env, onError & invalid args', assert => {
    assert.plan(4);

    process.env.NODE_ENV = 'development';

    rfx({
      type (input) {
        assert.pass('should type check');

        return typeof input === 'boolean';
      },
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

  nest.test('...predicate rtype, prod env, onError & invalid args', assert => {
    assert.plan(1);

    process.env.NODE_ENV = 'production';

    rfx({
      type (input) {
        assert.fail('should not type check');

        return typeof input === 'boolean';
      },
      fn () {
        assert.pass('should call fn');
      },
      onError () {
        assert.fail('should not call onError');
      }
    })('foo', 'bar', 'baz');
  });

  nest.test('...predicate rtype, dev env, & no args', assert => {
    process.env.NODE_ENV = 'development';

    rfx({
      type () {
        assert.pass('should call typecheck function');
        assert.end();
      },
      fn () {}
    })();
  });

  nest.test('...with fn return', assert => {
    const fx = rfx({
      fn () {
        return 'a';
      }
    });

    const actual = fx();
    const expected = 'a';

    assert.equal(actual, expected,
      'should pass return value from function');

    assert.end();
  });
});
