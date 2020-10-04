import { create } from "lodash";
import Rx from "rxjs/Rx";
import { createSubscriber } from "./lib/util";

// Take operator takes an amount of next operations and then unsubscribes
// interval operator emits a sequence of values every set millisecond

Rx.Observable.interval(500).take(5).subscribe(createSubscriber("interval"));

// Timer operator - After given duration, emit numbers in sequence every specified duration.
// If 2 parameters are passed, 1st parameter is inital delay and 2nd parameter is the interval

Rx.Observable.timer(1000, 500).take(3).subscribe(createSubscriber("timer"));

// Of operator - prints out to console.
// Can pass in multiple items which iterates with the next function, each item becomes an 'on next'

Rx.Observable.of("Hello World").subscribe(createSubscriber("of"));
Rx.Observable.of("Hello World", "hello").subscribe(createSubscriber("of"));

// From operator - takes an array like item and flattens that item out - can pass string, array.
// Great way to convert existing array into a stream of items so you can perform transformations
// on them

Rx.Observable.from("hello").subscribe(createSubscriber("from"));
Rx.Observable.from(["hey", "hi", "hello"]).subscribe(createSubscriber("from"));
Rx.Observable.from([1, 2, 3, 4, 5])
  .map((i) => i * 5)
  .subscribe(createSubscriber("from"));

// Throw operator - useful for throwing errors.
// Passing an error into a from or of function will now throw the error but it will print it out -
// this is useful in some cases.

Rx.Observable.throw(new Error("HEY")).subscribe(createSubscriber("Error"));
Rx.Observable.throw(12345).subscribe(createSubscriber("Error"));

// Empty operator - returns an empty observable object - uses the complete function.
// This is useful when we need to still return an observable in a workflow

Rx.Observable.empty().subscribe(createSubscriber("Empty"));

// Defer operator - takes in a function which is called everytime the observable is subscribed to.
// Example below shows how sideEffect is kept within the same scope as well.

let sideEffect = 0;
const defer$ = Rx.Observable.defer(() => {
  sideEffect++;
  return Rx.Observable.of(sideEffect);
});

defer$.subscribe(createSubscriber("defer$.one"));
defer$.subscribe(createSubscriber("defer$.two"));
defer$.subscribe(createSubscriber("defer$.three"));

// Never operator - produces no items and never completes
// This is useful when observables are used to signal to other observables - useful to pass in never
// so it wont signal other observable

Rx.Observable.never().subscribe(createSubscriber("never"));

// range operator - produces an output with the next operator inbetween the range
//

Rx.Observable.range(10, 50).subscribe(createSubscriber("range"));
