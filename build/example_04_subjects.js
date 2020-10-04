"use strict";

var _Rx = require("rxjs/Rx");

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require("./lib/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ---------------------------------- SUBJECTS ---------------------------------- //

// Both an observable, and an observer.
// Often used to bridge non reactive code with reactive code.

// Big debate going on about when it is appropiate to use subjects - should only consider them as a last resort when bridging reactive and non-reactive code.

var simple$ = new _Rx2.default.Subject();

simple$.subscribe((0, _util.createSubscriber)("simple$"));

simple$.next("HELLO");
simple$.next("WORLD");
simple$.complete();
simple$.next("HELLO"); // this does not output as the subject has been completed.

// ---------------------------------- PROXIES FOR OBSERVABLE ---------------------------------- //

// Creates an interval observable which emits a value every second. IntervalSubject is subscribed to interval observable, acting as a proxy for another observable.
// Can subscribe a subject to another observable

var interval$ = new _Rx2.default.Observable.interval(1000).take(5);
var intervalSubject$ = new _Rx2.default.Subject();
interval$.subscribe(intervalSubject$);

intervalSubject$.subscribe((0, _util.createSubscriber)("sub1"));
intervalSubject$.subscribe((0, _util.createSubscriber)("sub2"));
intervalSubject$.subscribe((0, _util.createSubscriber)("sub3"));

// Using setTimeout will delay the intial values from the interval as the subscription is created 3 seconds later after the interval is created.
setTimeout(function () {
  intervalSubject$.subscribe((0, _util.createSubscriber)("TEST TEST TEST"));
}, 3000);

// ------------------------------------------------------------------------------------------------------ //

// const currentUser$ = new Rx.Subject();
// const isLoggedIn$ = currentUser$.map((u) => u.isLoggedIn);

// isLoggedIn$.subscribe(createSubscriber("isLoggedIn"));

// currentUser$.next({ isLoggedIn: false });

// setTimeout(() => {
//   currentUser$.next({ isLoggedIn: true, name: "adam" });
// }, 2000);

// ---------------------------------- BEHAVIOUR SUBJECTS ---------------------------------- //
// Need to pass the initial state of the object - takes in parameter of initial state
// Everytime next is called, it saves the back value back into its initial state
// When subscribed, it will produce that next value, and then any sequential next values.

var currentUser$ = new _Rx2.default.BehaviorSubject({ isLoggedIn: false });
var isLoggedIn$ = currentUser$.map(function (u) {
  return u.isLoggedIn;
});

currentUser$.next({ isLoggedIn: false });
isLoggedIn$.subscribe((0, _util.createSubscriber)("isLoggedIn"));

setTimeout(function () {
  currentUser$.next({ isLoggedIn: true, name: "adam" });
}, 3000);

setTimeout(function () {
  isLoggedIn$.subscribe((0, _util.createSubscriber)("delayed"));
}, 1500);

// ---------------------------------- REPLAY SUBJECT ---------------------------------- //
// The parameter passed into the ReplaySubject is the amount of items thatwill be passed into the buffer and replayed.
var replay$ = new _Rx2.default.ReplaySubject(3);

// 1 + 2 are saved into the buffer for the next functions
replay$.next(1);
replay$.next(2);

// create a subscriber called 1 - it will get all of the previous next values and all following.
replay$.subscribe((0, _util.createSubscriber)("1"));
replay$.next(3);
replay$.next(4);
replay$.next(5);

// create a subscriber called 2 = it will only get last 3 values as they only fit within the buffer but all following.
replay$.subscribe((0, _util.createSubscriber)("2"));

replay$.next(6);

// ---------------------------------- ASYNC SUBJECT ---------------------------------- //
// ASYNC Subject - only omits the final item before its completed.
// final item will only be outputted once the complete() function is called.

var apiCall$ = new _Rx2.default.AsyncSubject();

// one observable below will only output 2 after the complete function is called.
apiCall$.next(1);
apiCall$.subscribe((0, _util.createSubscriber)("one"));
apiCall$.next(2);
apiCall$.complete();

// this will output only the last item as it was subscribed after it was completed
setTimeout(function () {
  apiCall$.subscribe((0, _util.createSubscriber)("two"));
}, 2000);

// Use subjects sparingly, think of where is my data coming from? And then create observable workflow that hooks into those sources.
// Using subjects allows us to get around this, using reactive features.