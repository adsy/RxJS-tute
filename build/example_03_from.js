"use strict";

var _Rx = require("rxjs/Rx");

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require("./lib/util");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ----------------------------------- DOM ELEMENTS ----------------------------------- //

// JQUERY is used to grab the elements of the page and then passsed into the fromEvent operator
var $title = $("#title"); // ----------------------------------- using RxJS with DOM elements, Node functions and Promises ----------------------------------- //

var $results = $("#results");

// fromEvent operator - creates observable which hooks into the element or object (1st parameter) passed in using the event (2nd parameter)
_Rx2.default.Observable.fromEvent($title, "keyup").map(function (e) {
  return e.target.value;
}).distinctUntilChanged().debounceTime(500).switchMap(getItems)
// observables are lazy - if not subscribed, event would never be bound to the DOM.
.subscribe(function (items) {
  $results.empty();
  $results.append(items.map(function (item) {
    return $("<li />").text(item);
  }));
});

// ----------------------------------- NODE FUNCTIONS ----------------------------------- //

_fs2.default.readdir("./src-server", function (error, items) {
  if (error) console.log(error);else {
    console.log(items);
  }
});

// ----------------------------------- TURN THE ABOVE SYNCHRONOUS CODE INTO AN OBSERVABLE CODE BELOW ----------------------------------- //

// Converts previous function into new reactive function so it can be called with just first parameter
var readdir$ = _Rx2.default.Observable.bindNodeCallback(_fs2.default.readdir);
// subscribe to this new observable function which prints out as an array.
readdir$("./src-server")
// mergemap - it merges an observable into our stream. Rx.Observable.from takes in array of items, and creates observable that emits each item individually
// converted the observable to use the next function for each item.
.mergeMap(function (files) {
  return _Rx2.default.Observable.from(files);
})
// manipulate each individual file passed through the next function.
.map(function (file) {
  return "MANIPULAREDW " + file;
}).subscribe((0, _util.createSubscriber)("readdir"));

// ----------------------------------- PROMISES ----------------------------------- //

function getItem() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("HELLO");
    }, 1000);
  });
}

// Convert promise code to reactive stream.
_Rx2.default.Observable.fromPromise(getItem()).subscribe((0, _util.createSubscriber)("Promise"));