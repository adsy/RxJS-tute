"use strict";

var _Rx = require("rxjs/Rx");

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require("./lib/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Bunch of simple operators that do something specifically in regards to returning items.

var simple$ = new _Rx2.default.Observable(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.next(4);
  observer.complete();
});

// ---------------- FIRST OPERATOR ---------------- //
// first gets the first item and then completes - safeguards item.
// other items DO NOT get emitted into the stream - first will take the first item and call complete.
// if there are NO next functions and only a complete function, we will receive an 'EmptyError'

simple$.first().subscribe((0, _util.createSubscriber)("first-operator"));

// ---------------- LAST OPERATOR ---------------- //
// last gets the last item and then completes - safeguards item.
// other items DO NOT get emitted into the stream - last will take the last item and call complete.
// if there are NO next functions and only a complete function, we will receive an 'EmptyError'

simple$.last().subscribe((0, _util.createSubscriber)("last-operator"));

// ---------------- SINGLE OPERATOR ---------------- //
// single operator - kind of like first and last, get an error if there are no next functions.
// Will output an error - sequence contains more than one element if there is more than 1 next function.

simple$.single().subscribe((0, _util.createSubscriber)("single-operator"));

// ---------------- TAKE OPERATOR ---------------- //
// take operator - Will take the first amount of next function outputs specified.
// This is a COLD observable

simple$.take(2).subscribe((0, _util.createSubscriber)("take-operator"));

// ---------------- SKIP OPERATOR ---------------- //
// skip operator - Will skip the amount of next function outputs specified.
// This is a COLD observable

simple$.skip(2).subscribe((0, _util.createSubscriber)("skip-operator"));

// ---------------- SKIP/TAKE OPERATOR ---------------- //
// skip operator - Will skip the amount of next function outputs specified.
// This is a COLD observable

simple$.skip(1).take(2).subscribe((0, _util.createSubscriber)("skip-operator"));

// ---------------- SKIPWHILE OPERATOR ---------------- //
// SkipWhile operator - will skip observable output until expression evaluates true
// SkipWhile operator - will output observable output until expression evaluates false

_Rx2.default.Observable.interval(500).skipWhile(function (i) {
  return i < 4;
}).takeWhile(function (i) {
  return i < 10;
}).subscribe((0, _util.createSubscriber)("skipWhile/takeWhile-operator"));

// ---------------- SKIPUNTIL OPERATOR ---------------- //
// skip operator - Will skip the amount of next function outputs specified.
// This is a COLD observable

_Rx2.default.Observable.interval(500).skipUntil(function (i) {
  return i < 4;
}).takeUntil(function (i) {
  return i < 10;
}).subscribe((0, _util.createSubscriber)("skipUnitl/takeUntil-operator"));