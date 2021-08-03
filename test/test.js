import { strict as assert } from 'assert';
import createMixin from 'mixomatic';

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

    it('makes the Symbol.hasInstance property of the mixin not configurable, not enumerable, and not writable', () => {
      const { configurable, enumerable, writable } = Object.getOwnPropertyDescriptor(mixin, Symbol.hasInstance);

      assert.equal(configurable, false);
      assert.equal(enumerable, false);
      assert.equal(writable, false);
    });

    it('returns the object passed to it', () => {
      const obj = {};

      assert.equal(obj, mixin(obj));
    });

    it('Appends properties to the object according to descriptors', () => {
      const obj = {};

      mixin(obj);

      assert.deepEqual(Object.getOwnPropertyDescriptors(obj), descriptors);
    });

    it('does not drop existing properties', () => {
      const obj = { a: 1, b: 2, c: 3 };

      mixin(obj);

      const allDescriptors = {
        ...descriptors,
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
      };

      assert.deepEqual(Object.getOwnPropertyDescriptors(obj), allDescriptors);
    });

    it('considers mixed objects to be instances of itself', () => {
      const obj = {};

      mixin(obj);

      assert.equal(obj instanceof mixin, true);
    });

    it('considers unmixed objects not to be instances of itself', () => {
      const obj = {};

      assert.equal(obj instanceof mixin, false);
    });

    it('works with classes via prototypes', () => {
      class MyClass {}

      mixin(MyClass.prototype);

      assert.equal(new MyClass() instanceof mixin, true);
    });
  });
});
