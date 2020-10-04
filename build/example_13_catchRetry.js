"use strict";

var _Rx = require("rxjs/Rx");

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require("./lib/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// // Code below will not output 3rd observable due to error that is thrown.
// Rx.Observable.concat(
//   Rx.Observable.of(42),
//   Rx.Observable.throw(new Error("BLEGH")),
//   Rx.Observable.of(10)
// ).subscribe(createSubscriber("catch"));

// function getAPI() {
//   console.log("getting API");
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       //   resolve("hello");
//       reject(new Error());
//     }, 1000);
//   });
// }

// when an error is throw in the API, we immediately unsubscribed and the source gets unsubscribed from.
// without a catch, the do operator will not be called due to the error.
// including catch operator - wraps error into an item and is outputted in next operator.
// *** This is what you do when you want to display error to a user ***

// Rx.Observable.fromPromise(getAPI())
//   .catch((error) => Rx.Observable.of(error))
//   .do(() => console.log("thing"))
//   .subscribe(createSubscriber("faux API"));

// Example below shows how getAPI2 function returns an a new observable which will start the pipeline again.
// Passing a number to retry will limit the amount of retries the pipeline performs.
// If there is an error with retry - only works with cold observables as it unsubscribes each time it fails
// and then resubscribes.

function getAPI2() {
  return new _Rx2.default.Observable(function (observer) {
    console.log("Getting API");
    setTimeout(function () {
      observer.error(new Error());
    }, 1000);
  });
}

getAPI2().retry(4)
// leaving the catch operator out of this pipeline will cause the pipeline to unsubscribe after the 4 retries.
.catch(function (error) {
  return _Rx2.default.Observable.of(error);
}).do(function () {
  return console.log("thing");
}).subscribe((0, _util.createSubscriber)("faux API retry"));