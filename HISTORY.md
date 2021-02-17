# History

## v4.0.0

Drop support for UMD modules and Node 10. Use v3 if you still need that
functionality (this module is otherwise unchanged). In the past this would have
had an impact on Node.js projects, but Node (since v12) now has good support for
ES modules.

## v3.0.0

Mixins will now consider an object an instance of themselves if the object or
any member the prototype chain of the object has had the mixin applied to it.

## v2.0.0

Now implemented as a function which returns a function rather than as a class.

## v1.0.0

Initial release.
