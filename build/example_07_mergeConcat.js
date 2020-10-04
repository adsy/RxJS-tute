"use strict";

var _Rx = require("rxjs/Rx");

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require("./lib/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ---------------- MERGE OPERATOR ---------------- //

// Merge operator - merges one sequence into another

// Rx.Observable.interval(1000)
//   .merge(Rx.Observable.interval(500))
//   .subscribe(createSubscriber("merge1"));

// Rx.Observable.merge(
//   Rx.Observable.interval(1000).map((i) => `${i} seconds`),
//   Rx.Observable.interval(500).map((i) => `${i} half seconds`)
// )
//   .take(10)
//   .subscribe(createSubscriber("merge2"));

// Code below is an example of creating current user observable - merges in login
// and logout events but processing them differently.

// const currentUser$ = Rx.Observable.merge(
//   socket.on$("login").map((user) => processUser(user)),
//   socket.on$("logout").map((user) => null)
// );

// ---------------- CONCAT OPERATOR ---------------- //

// concat only subscribes to 2nd operator and onwards after the previous one has completed.

// Rx.Observable.range(1, 5)
//   .concat(Rx.Observable.range(10, 3))
//   .subscribe(createSubscriber("concat1"));

// // Example below shows how interval will take 3, and range will complete
// // immediately but at end of interval is concated to end.
// Rx.Observable.interval(500)
//   .take(3)
//   .concat(Rx.Observable.range(10, 3))
//   .subscribe(createSubscriber("concat2"));

_Rx2.default.Observable.concat(_Rx2.default.Observable.interval(1000).map(function (i) {
  return i + " seconds";
}).take(3), _Rx2.default.Observable.interval(500).map(function (i) {
  return i + " half seconds";
}).take(3)).subscribe((0, _util.createSubscriber)("concat3"));