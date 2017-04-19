'use strict';

const assert = require('assert');
const createMixin = require('..');

describe('Mixin', () => {
  it('is a function', () => {
    assert.ok(createMixin instanceof Function);
  });

  describe('mixins', () => {
    let descriptors;
    let mixin;

    beforeEach(() => {
      descriptors = {
        aProperty: {
          value: 'abc',
          enumerable: true,
          configurable: true,
          writable: true
        },
        aMethod: {
          value() {
            return 'A method';
          },
          enumerable: false,
          configurable: false,
          writable: false
        }
      };

      mixin = createMixin(descriptors);
    });

    it('Appends properties to the object according to descriptors', () => {
      const obj = {};

      mixin(obj);

      assert.deepStrictEqual(Object.getOwnPropertyDescriptors(obj), descriptors);
    });

    it('does not drop existing properties', () => {
      const obj = { a: 1, b: 2, c: 3 };

      mixin(obj);

      const allDescriptors = Object.assign({}, descriptors, {
        a: {
          value: 1,
          configurable: true,
          writable: true,
          enumerable: true
        },
        b: {
          value: 2,
          configurable: true,
          writable: true,
          enumerable: true
        },
        c: {
          value: 3,
          configurable: true,
          writable: true,
          enumerable: true
        }
      });

      assert.deepStrictEqual(Object.getOwnPropertyDescriptors(obj), allDescriptors);
    });

    it('considers mixed objects to be instances of itself', () => {
      const obj = {};

      mixin(obj);

      assert.strictEqual(obj instanceof mixin, true);
    });

    it('considers unmixed objects not to be instances of itself', () => {
      const obj = {};

      assert.strictEqual(obj instanceof mixin, false);
    });

    it('works with classes via prototypes', () => {
      class MyClass {}

      mixin(MyClass.prototype);

      assert.strictEqual(new MyClass() instanceof mixin, true);
    });
  });
});
