// ----------------------------------- using RxJS with DOM elements, Node functions and Promises ----------------------------------- //

import Rx from "rxjs/Rx";
import { createSubscriber } from "./lib/util";
import fs from "fs";

// ----------------------------------- DOM ELEMENTS ----------------------------------- //

// JQUERY is used to grab the elements of the page and then passsed into the fromEvent operator
const $title = $("#title");
const $results = $("#results");

// fromEvent operator - creates observable which hooks into the element or object (1st parameter) passed in using the event (2nd parameter)
Rx.Observable.fromEvent($title, "keyup")
  .map((e) => e.target.value)
  .distinctUntilChanged()
  .debounceTime(500)
  .switchMap(getItems)
  // observables are lazy - if not subscribed, event would never be bound to the DOM.
  .subscribe((items) => {
    $results.empty();
    $results.append(items.map((item) => $("<li />").text(item)));
  });

// ----------------------------------- NODE FUNCTIONS ----------------------------------- //

fs.readdir("./src-server", (error, items) => {
  if (error) console.log(error);
  else {
    console.log(items);
  }
});

// ----------------------------------- TURN THE ABOVE SYNCHRONOUS CODE INTO AN OBSERVABLE CODE BELOW ----------------------------------- //

// Converts previous function into new reactive function so it can be called with just first parameter
const readdir$ = Rx.Observable.bindNodeCallback(fs.readdir);
// subscribe to this new observable function which prints out as an array.
readdir$("./src-server")
  // mergemap - it merges an observable into our stream. Rx.Observable.from takes in array of items, and creates observable that emits each item individually
  // converted the observable to use the next function for each item.
  .mergeMap((files) => Rx.Observable.from(files))
  // manipulate each individual file passed through the next function.
  .map((file) => `MANIPULAREDW ${file}`)
  .subscribe(createSubscriber("readdir"));

// ----------------------------------- PROMISES ----------------------------------- //

function getItem() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("HELLO");
    }, 1000);
  });
}

// Convert promise code to reactive stream.
Rx.Observable.fromPromise(getItem()).subscribe(createSubscriber("Promise"));
