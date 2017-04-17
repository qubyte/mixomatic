# mixomatic

Create mixins which work with `instanceof` (friendly for unit tests). Internally
references are handled by a `WeakSet` instances so there's no need to manually
keep records of which objects have been mixed onto and risk memory leaks.

## Install

With `npm`:
```
npm install --save mixomatic
```

With `yarn`:
```
yarn add mixomatic
```

## Usage

Make a new mixin which appends [`propertyDescriptors`][1] to an object.
```javascript
const myMixin = new Mixin(propertyDescriptors)
```

Mix onto an object.
```javascript
const obj = {};

myMixin.mix(obj);
```

Check if an object has been modified by a given mixin:

```javascript
obj instanceof myMixin;
```

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
