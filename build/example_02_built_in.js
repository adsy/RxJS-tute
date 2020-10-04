"use strict";

var _lodash = require("lodash");

var _Rx = require("rxjs/Rx");

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require("./lib/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Take operator takes an amount of next operations and then unsubscribes
// interval operator emits a sequence of values every set millisecond

_Rx2.default.Observable.interval(500).take(5).subscribe((0, _util.createSubscriber)("interval"));

// Timer operator - After given duration, emit numbers in sequence every specified duration.
// If 2 parameters are passed, 1st parameter is inital delay and 2nd parameter is the interval

_Rx2.default.Observable.timer(1000, 500).take(3).subscribe((0, _util.createSubscriber)("timer"));

// Of operator - prints out to console.
// Can pass in multiple items which iterates with the next function, each item becomes an 'on next'

_Rx2.default.Observable.of("Hello World").subscribe((0, _util.createSubscriber)("of"));
_Rx2.default.Observable.of("Hello World", "hello").subscribe((0, _util.createSubscriber)("of"));

// From operator - takes an array like item and flattens that item out - can pass string, array.
// Great way to convert existing array into a stream of items so you can perform transformations
// on them

_Rx2.default.Observable.from("hello").subscribe((0, _util.createSubscriber)("from"));
_Rx2.default.Observable.from(["hey", "hi", "hello"]).subscribe((0, _util.createSubscriber)("from"));
_Rx2.default.Observable.from([1, 2, 3, 4, 5]).map(function (i) {
  return i * 5;
}).subscribe((0, _util.createSubscriber)("from"));

// Throw operator - useful for throwing errors.
// Passing an error into a from or of function will now throw the error but it will print it out -
// this is useful in some cases.

_Rx2.default.Observable.throw(new Error("HEY")).subscribe((0, _util.createSubscriber)("Error"));
_Rx2.default.Observable.throw(12345).subscribe((0, _util.createSubscriber)("Error"));

// Empty operator - returns an empty observable object - uses the complete function.
// This is useful when we need to still return an observable in a workflow

_Rx2.default.Observable.empty().subscribe((0, _util.createSubscriber)("Empty"));

// Defer operator - takes in a function which is called everytime the observable is subscribed to.
// Example below shows how sideEffect is kept within the same scope as well.

var sideEffect = 0;
var defer$ = _Rx2.default.Observable.defer(function () {
  sideEffect++;
  return _Rx2.default.Observable.of(sideEffect);
});

defer$.subscribe((0, _util.createSubscriber)("defer$.one"));
defer$.subscribe((0, _util.createSubscriber)("defer$.two"));
defer$.subscribe((0, _util.createSubscriber)("defer$.three"));

// Never operator - produces no items and never completes
// This is useful when observables are used to signal to other observables - useful to pass in never
// so it wont signal other observable

_Rx2.default.Observable.never().subscribe((0, _util.createSubscriber)("never"));

// range operator - produces an output with the next operator inbetween the range
//

_Rx2.default.Observable.range(10, 50).subscribe((0, _util.createSubscriber)("range"));