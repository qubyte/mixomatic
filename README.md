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
const mixomatic = require('mixomatic');
const myMixin = mixomatic(propertyDescriptors)
```

Mix onto an object.
```javascript
const obj = {};

myMixin(obj);
```

Check if an object has been modified by a given mixin:

```javascript
obj instanceof myMixin; // true
```

Also works with classes!

```javascript
class MyClass {}

myMixin(MyClass.prototype);

const obj = new MyClass();

obj instanceof MyClass; // true
obj instanceof myMixin; // true
```

## Example

You're making a game with a little ship which shoots space-bound rocks before
they can bash into it. Both the ship and the rocks have position and velocity
properties. You _could_ make a class, which provides a `move` method, which they
would both inherit from. However, that could be the beginning of a class
hierarchy and you've heard bad things about those being hard to modify in the
future. JavaScript also has no way to do multiple inheritance with classes, so
your options are limited with classes anyway.

Instead you make the wise choice to use `mixomatic`! You use mixomatic to create
a mixin called `movable`, which takes a time difference and uses it to update
the position of its host object.

```javascript
const movable = mixomatic({
  move: {
    value(dt) {
      this.position.x += dt * this.velocity.x;
      this.position.y += dt * this.velocity.y;
    }
    configurable: true,
    enumerable: false,
    writable: true
  }
});
```

Since there'll only be one ship, you define it directly as an object and apply
`movable` to it to give it the `move` method.

```javascript
const ship = {
  position: { x: 0, y: 0 };
  velocity: { x: 0, y: 0 };
};

movable(ship);
```

Asteroids are more numerous and can appear in all sorts of places, so you decide
to go with a class for those.

```javascript
class Asteroid {
  constructor(position, velocity) {
    this.position = { x: position.x, y: position.y };
    this.velocity = { x: velocity.x, y: velocity.y };
  }
}

movable(Asteroid.prototype);
```

Now both `ship` and `Asteroid` instances will have the `move` method, and will
both appear to be instances of `movable`, yet are not part of the same class
hierarchy. All sorts of behaviour can be written as mixins (for example, the
ship can fire missiles, and so can UFOs).

This is useful because mixins can be tested in isolation, and you can avoid
duplication of tests for mixed properties by using an `instanceof` check in the
test suites of host objects like `ship` and `Asteroid`.

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
