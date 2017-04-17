export default class Mixin {
  constructor(propertyDescriptors) {
    this.propertyDescriptors = propertyDescriptors;
    this.mixed = new WeakSet();
  }

  mix(obj) {
    Object.defineProperties(obj, this.propertyDescriptors);
    this.mixed.add(obj);
  }

  [Symbol.hasInstance](obj) {
    return this.mixed.has(obj);
  }
}
