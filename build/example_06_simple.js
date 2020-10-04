"use strict";

var _Rx = require("rxjs/Rx");

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require("./lib/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Simple operators are for when you want to be able to perform some side effect with an intermediate result.

// Do operator will perform code - do doesn't affect the observable sequence at all.
// Do is a way to create side effects for the workflow.
_Rx2.default.Observable.range(1, 10).do(function (a) {
  return console.log("From do operator " + a);
}).map(function (a) {
  return a * a;
}).subscribe((0, _util.createSubscriber)("simple"));

// Finally operator only executes after the range has completed - it knows its in the pipeline
// Every operator creates a new observable
_Rx2.default.Observable.range(1, 10).finally(function (a) {
  return console.log("From finally operator");
}).map(function (a) {
  return a * a * a;
}).subscribe((0, _util.createSubscriber)("finally"));

// Filter operator - filter by a predicate (just like .where and where in SQL)
// This wont complete until the range is output full values, but will only produce via filter
_Rx2.default.Observable.range(1, 10).filter(function (a) {
  return a < 5;
}).subscribe((0, _util.createSubscriber)("filter"));

// startWith operator - sets an interval to start with a certain value instantly instead of
// waiting for first interval before producing values.
_Rx2.default.Observable.interval(1000).startWith(-1).subscribe((0, _util.createSubscriber)("interval"));