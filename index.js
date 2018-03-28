export default function createMixin(propertyDescriptors) {
  const mixed = new WeakSet();

  function mixin(obj) {
    Object.defineProperties(obj, propertyDescriptors);
    mixed.add(obj);
    return obj;
  }

  function checkInstance(obj) {
    for (let o = obj; o; o = Object.getPrototypeOf(o)) {
      if (mixed.has(o)) {
        return true;
      }
    }
  }

  Object.defineProperty(mixin, Symbol.hasInstance, { value: checkInstance });

  return mixin;
}
