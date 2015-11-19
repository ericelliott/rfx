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

  nest.test('...predicate rtype, dev env & default error handling', assert => {
    assert.plan(4);

    process.env.NODE_ENV = 'development';

    const signature = '(a: String): Void';

    const type = Object.assign(
      (a) => {
        assert.pass('should type check');
        return typeof a === 'string';
      },
      { signature }
    );

    const fx = rfx({
      type,
      fn () {
        assert.fail('should not call fn');
      }
    });

    try {
      fx();
    } catch (error) {
      {
        const actual = error.constructor;
        const expected = TypeError;

        assert.equal(actual, expected,
          'should throw a TypeError');
      }

      {
        const expectedContent = /type check failed/i;
        const actualContent = error.message;

        assert.ok(expectedContent.test(actualContent),
          'should throw a descriptive error');
      }

      {
        const expectedString = signature;
        const actualString = error.message;

        assert.ok(actualString.indexOf(expectedString) !== -1,
          'should include signature in error message');
      }
    }
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

  nest.test('...predicate rtype, prod env, default error handling', assert => {
    assert.plan(2);

    process.env.NODE_ENV = 'production';

    const fx = rfx({
      type () {
        assert.fail('should not type check');
        return false;
      },

      fn () {
        assert.pass('should call fn');
      }
    });

    assert.doesNotThrow(
      () => fx(),
      'should not throw an error'
    );
  });

  nest.test('...predicate rtype, unknown env & onError', assert => {
    assert.plan(3);

    process.env.NODE_ENV = null;

    rfx({
      type () {
        assert.pass('should type check');
        return false;
      },

      fn () {
        assert.pass('should call fn');
      },

      onError () {
        assert.pass('should call onError');
      }
    })();
  });

  nest.test('...predicate rtype, unknown env & default error handling', assert => {
    assert.plan(3);

    process.env.NODE_ENV = null;

    const fx = rfx({
      type () {
        assert.pass('should type check');
        return false;
      },

      fn () {
        assert.pass('should call fn');
      }
    });

    assert.doesNotThrow(
      () => fx(),
      'should not throw an error'
    );
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

  nest.test('...with metadata', assert => {
    const myNamespace = {};

    const fn = () => null;
    const myFunctionProperty = {};
    fn.myFunctionProperty = 'should be overridden!';

    const fx = rfx({
      myNamespace,
      myFunctionProperty,
      fn
    });

    {
      const actual = fx.myNamespace;
      const expected = myNamespace;

      assert.equal(actual, expected,
        'should attach extra properties to the interface');
    }

    {
      const actual = fx.myFunctionProperty;
      const expected = myFunctionProperty;

      assert.equal(actual, expected,
        'should overwrite function properties with interface properties');
    }

    assert.end();
  });
});
