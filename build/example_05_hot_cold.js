"use strict";

var _Rx = require("rxjs/Rx");

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require("./lib/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// // ---------------- TURN COLD  OBSERVABLE TO HOT OBSERVABLE ---------------- //

// // publish operator - it returns a connectable observable - intially will not output
// // without connecting to it.
// const interval$ = Rx.Observable.interval(1000).take(10).publish();

// // create observable, call publish method on it which wont subscribe to the underlying
// // observable until interval$.connect() is called.
// interval$.connect();

// // as soon as the above is called, the observable will start and make the observable hot.

// setTimeout(() => {
//   interval$.subscribe(createSubscriber("interval1"));
// }, 1200);

// setTimeout(() => {
//   interval$.subscribe(createSubscriber("interval2"));
// }, 3000);

// // ---------------- EXAMPLE ---------------- //
// //

// const socket = { on: () => {} };

// const chatMessages$ = new Rx.Observable((observer) => {
//   socket.on("chat:message", (message) => observer.next(message));
// }).publish();

// chatMessages$.connect();

// chatMessages$.subscribe(createSubscriber("one"));
// chatMessages$.subscribe(createSubscriber("two"));

// ---------------- PUBLISH FUNCTIONS ---------------- //
// ---------------- PUBLISH LAST ---------------- //

// const simple$ = new Rx.Observable((observer) => {
//   observer.next("one");
//   observer.next("two");
//   observer.complete();
// });

// // function will only published the last next, no matter if it was subscribed before
// // or after the connection function is called.
// const published$ = simple$.publishLast();

// published$.subscribe(createSubscriber("one"));
// published$.connect();
// published$.subscribe(createSubscriber("two"));

// // ---------------- PUBLISH REPLAY ---------------- //
// // This hot observable is producing values even when the observables are unsubscribed.
// // Must unsubscribe to the connection value.

var simple2$ = new _Rx2.default.Observable(function (observer) {
  observer.next("one");
  observer.next("two");
  observer.next("three");

  return function () {
    console.log("DISPOSED");
  };
});

// // function will only published the last next, no matter if it was subscribed before
// // or after the connection function is called.
// const published2$ = simple2$.publishReplay(2);

// let sub1 = published2$.subscribe(createSubscriber("one"));
// let connection = published2$.connect();
// let sub2 = published2$.subscribe(createSubscriber("two"));

// // using this bunch of methods in this way, we stay in control of when it is disposed of
// // to avoid memory leaks.
// sub1.unsubscribe();
// sub2.unsubscribe();

// connection.unsubscribe();

// // ---------------- PUBLISH REF COUNT ---------------- //
// RefCount operator - automatically handles connecting to observable and disconnecting when its done.
// Will connect to observable on first subscription and disconnect once the last description has unsubscribed.

var published3$ = simple2$.publishReplay(2).refCount();

var sub3 = published3$.subscribe((0, _util.createSubscriber)("one"));
var sub4 = published3$.subscribe((0, _util.createSubscriber)("two")); // just because another subscriber is connected, hot
// observables will not repeat withing publishReplay

// using this bunch of methods in this way, we stay in control of when it is disposed of
// to avoid memory leaks.
sub3.unsubscribe();
// if this line is commented out, the observable will not dispose and will still be
// listening to events.
sub4.unsubscribe();

// // ---------------- SHARE OPERATOR ---------------- //
// Exact same behaviour as calling publish, followed by refCount
// Connect to observable on first subscription, and disconnect on last subscription.

var published4$ = simple2$.share();

var sub5 = published4$.subscribe((0, _util.createSubscriber)("one"));
var sub6 = published4$.subscribe((0, _util.createSubscriber)("two")); // just because another subscriber is connected, hot
// observables will not repeat withing publishReplay

// using this bunch of methods in this way, we stay in control of when it is disposed of
// to avoid memory leaks.
sub5.unsubscribe();
// if this line is commented out, the observable will not dispose and will still be
// listening to events.
sub6.unsubscribe();

// Very important for connecting into a socket or websocket - want it to be hot. You dont want ever sub to result in resubscription to underlying data source.
// You only want to connect to underlying data souce once and share with all subscribers with these operators.
// Huge workflow - you want to be able to subscribe, but you dont want to repeat those operations - answer to fixing that is making it hot.