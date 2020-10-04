import Rx from "rxjs/Rx";
import { createSubscriber } from "./lib/util";

// What if you had an observal that is producing all these individual items but you want to perform
// an operation on them and collect them into a single value (sum all numbers produced by observable)

// ---------------- REDUCE OPERATOR ---------------- //
function arrayReduce(array, accumulator, startValue) {
  let value = startValue;
  for (let item of array) {
    value = accumulator(value, item);
  }
  return value;
}

const values = [324, 342, 565, 341];

console.log(arrayReduce(values, (acc, i) => acc + i, 0));

// Turns the above code into an observable
// Reduce will never output unless the observables outputs its complete function
Rx.Observable.range(1, 10)
  .merge(Rx.Observable.range(50, 10))
  .reduce((acc, val) => acc + val)
  .subscribe(createSubscriber("reduce"));

// ---------------- SCAN OPERATOR ---------------- //
// Scan outputs each observable with the next operator, even if complete is never called.
Rx.Observable.range(1, 10)
  .merge(Rx.Observable.range(50, 10))
  .scan((acc, val) => acc + val)
  .subscribe(createSubscriber("scan"));

// Example below will output arrays of the current and last value of the observable.
Rx.Observable.range(1, 10)
  .map((i) => i * i)
  .scan(([last, _], current) => [current, last], [])
  .subscribe(createSubscriber("scan2"));
