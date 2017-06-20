export default function createMixin(propertyDescriptors) {
  const mixed = new WeakSet();

  function mixin(obj) {
    Object.defineProperties(obj, propertyDescriptors);
    mixed.add(obj);
  }

  function checkInstance(obj) {
    for (let o = obj; o; o = Object.getPrototypeOf(o)) {
      if (mixed.has(o)) {
        return true;
      }
    }
  }

  return Object.defineProperty(mixin, Symbol.hasInstance, {
    value: checkInstance,
    configurable: false,
    enumerable: false,
    writable: false
  });
}
