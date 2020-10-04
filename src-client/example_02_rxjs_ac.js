import $ from "jquery";
import Rx from "rxjs/Rx";

const $title = $("#title");
const $results = $("#results");
// ------------------------------------------------------------------------
// Concide layout of setting up observable and subscribing the items //

// No external state - everything depends on the line above it.
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

// ------------------------------------------------------------------------
// Long way of doing function //

// Takes keyup event on element and returns an observable stream on the event
// $ on righthand side to work with observable
const keyups$ = Rx.Observable.fromEvent($title, "keyup");

// Fixes issue with non character input - this creates another stream and waits until
// the value has changed with distinctUntilChanged (RxJS) to go to next line, and then debounceTime waits
// specified time before changing the query.

// Gets passed an item which is then used in the callback 'getItems' function
// as a whole, which then maps value to function - alias for flat map.
const queries$ = keyups$
  .map((e) => e.target.value)
  .distinctUntilChanged()
  .debounceTime(250)
  // switchMap will only produce values from the final result when the final query has completed.
  .switchMap((query) => getItems(query));

// This then returns a list of items which queries$ is subscribed to.
//   .mergeMap((query) => getItems(query));

// Access to event by subscribing to the event - pass in e
queries$.subscribe((items) => {
  $results.empty();
  $results.append(items.map((item) => $("<li />").text(item)));
});

// ------------------------------------------------------------------------
// Library //

function getItems(title) {
  console.log(`Querying ${title}`);
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      //simulating a call to an api
      resolve([title, "item 2", `Another ${Math.random()}`]);
    }, 500 + Math.random() * 1000);
  });
}
