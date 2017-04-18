export default function createMixin(propertyDescriptors) {
  const mixed = new WeakSet();

  function mixin(obj) {
    Object.defineProperties(obj, propertyDescriptors);
    mixed.add(obj);
  }

  Object.defineProperty(mixin, Symbol.hasInstance, {
    value(obj) {
      return mixed.has(obj);
    },
    configurable: false,
    enumerable: false,
    writable: false
  });

  return mixin;
}
