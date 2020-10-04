import Rx from "rxjs/Rx";
import { createSubscriber } from "./lib/util";

// Bunch of simple operators that do something specifically in regards to returning items.

const simple$ = new Rx.Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.next(4);
  observer.complete();
});

// ---------------- FIRST OPERATOR ---------------- //
// first gets the first item and then completes - safeguards item.
// other items DO NOT get emitted into the stream - first will take the first item and call complete.
// if there are NO next functions and only a complete function, we will receive an 'EmptyError'

simple$.first().subscribe(createSubscriber("first-operator"));

// ---------------- LAST OPERATOR ---------------- //
// last gets the last item and then completes - safeguards item.
// other items DO NOT get emitted into the stream - last will take the last item and call complete.
// if there are NO next functions and only a complete function, we will receive an 'EmptyError'

simple$.last().subscribe(createSubscriber("last-operator"));

// ---------------- SINGLE OPERATOR ---------------- //
// single operator - kind of like first and last, get an error if there are no next functions.
// Will output an error - sequence contains more than one element if there is more than 1 next function.

simple$.single().subscribe(createSubscriber("single-operator"));

// ---------------- TAKE OPERATOR ---------------- //
// take operator - Will take the first amount of next function outputs specified.
// This is a COLD observable

simple$.take(2).subscribe(createSubscriber("take-operator"));

// ---------------- SKIP OPERATOR ---------------- //
// skip operator - Will skip the amount of next function outputs specified.
// This is a COLD observable

simple$.skip(2).subscribe(createSubscriber("skip-operator"));

// ---------------- SKIP/TAKE OPERATOR ---------------- //
// skip operator - Will skip the amount of next function outputs specified.
// This is a COLD observable

simple$.skip(1).take(2).subscribe(createSubscriber("skip-operator"));

// ---------------- SKIPWHILE OPERATOR ---------------- //
// SkipWhile operator - will skip observable output until expression evaluates true
// SkipWhile operator - will output observable output until expression evaluates false

Rx.Observable.interval(500)
  .skipWhile((i) => i < 4)
  .takeWhile((i) => i < 10)
  .subscribe(createSubscriber("skipWhile/takeWhile-operator"));

// ---------------- SKIPUNTIL OPERATOR ---------------- //
// skip operator - Will skip the amount of next function outputs specified.
// This is a COLD observable

Rx.Observable.interval(500)
  .skipUntil((i) => i < 4)
  .takeUntil((i) => i < 10)
  .subscribe(createSubscriber("skipUnitl/takeUntil-operator"));
