"use strict";

var _Rx = require("rxjs/Rx");

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require("./lib/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ---------------------------------- Part 1 ----------------------------------

// Promise example to compare to observables

var promise = new Promise(function (resolve, reject) {
  console.log("promise contents");
  resolve("hey");
});

promise.then(function (item) {
  return console.log(item);
});

//  Observables example
// 1. Pass in generator object for observer which we can call next/complete method on.
// 2. MUST HAVE A SUBSCRIPTION FUNCTION - generator wont run until one is created.

var simple$ = new _Rx2.default.Observable(function (observer) {
  console.log("Generating observable");
  setTimeout(function () {
    observer.next("an item");
    setTimeout(function () {
      observer.next("another item");
      observer.complete();
    }, 1000);
  }, 1000);
});

var error$ = new _Rx2.default.Observable(function (observer) {
  observer.error(new Error("Error printed out in Error object "));
});

// First function is the next function above^
// Second function is the error callback
// Third function is the complete function
// This maps the next, complete and error functions to the pipeline of the observable

error$.subscribe(function (item) {
  return console.log("one.next " + item);
}, // Next
function (error) {
  return console.log("one.error " + error.stack);
}, // Error
function () {
  return console.log("one.complete");
} // Complete
);

// First function is the next function above^
// Second function is the error callback
// Third function is the complete function
// This maps the next, complete and error functions to the pipeline of the observable

simple$.subscribe(function (item) {
  return console.log("one.next " + item);
}, // Next
function (error) {
  return console.log("one.error " + error);
}, // Error
function () {
  return console.log("one.complete");
} // Complete
);

// Sets another subscription on the pipeline, which starts 3 seconds afterwards.

setTimeout(function () {
  simple$.subscribe({
    next: function next(item) {
      return console.log("two.next " + item);
    },
    error: function error(_error) {
      console.log("two.error " + _error);
    },

    complete: function complete() {
      console.log("two.complete");
    }
  });
}, 3000);

// ---------------------------------- Part 2 ----------------------------------

// Create a function that returns an Observable object and also create a function
// that returns a subscriber object as well which we can then use to create multiple
// pipeline/subscriptions.

function createInterval$(time) {
  return new _Rx2.default.Observable(function (observer) {
    var index = 0;
    var interval = setInterval(function () {
      console.log("Generating " + index);
      observer.next(index++);
    }, time);

    // Function is called when the unsubscribe function is called on the observable object
    return function () {
      clearInterval(interval);
    };
  });
}

// Funciton creates a version of the take() function
function take$(sourceObservable$, amount) {
  return new _Rx2.default.Observable(function (observer) {
    var count = 0;
    var subscription = sourceObservable$.subscribe({
      next: function next(item) {
        observer.next(item);
        if (++count >= amount) observer.complete();
      },
      error: function error(_error2) {
        observer.error(_error2);
      },
      complete: function complete() {
        observer.complete();
      }
    });

    return function () {
      return subscription.unsubscribe();
    };
  });
}

// Uncomment code below to run the observable/subscription
var everySecond$ = createInterval$(1000);
var firstFiveSeconds$ = take$(everySecond$, 5);
var subscription = firstFiveSeconds$.subscribe((0, _util.createSubscriber)("Count"));

// Function below is invoked by the return function within the Observable object that was created.
// setTimeout(() => {
//   subscription.unsubscribe();
// }, 3000);

//// An observable is nothing more than a generator function like above, which is invoked everytime its subscribed to
//// A subscription is nothing more than a next method, error method and a complete method and you can despose of them.
//// Observables can clean up memory and can execute when they are unsubscribed frmo (unhook from event handlers)
//// Operators are nothing more than wrappers around observables - you return a new observable and take
// source observable and subscribe to it, perform transformation and pass along errors and complete
// and when done, unsubscribe.