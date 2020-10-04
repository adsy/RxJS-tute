import Rx from "rxjs/Rx";
import { createSubscriber } from "./lib/util";

// Simple operators are for when you want to be able to perform some side effect with an intermediate result.

// Do operator will perform code - do doesn't affect the observable sequence at all.
// Do is a way to create side effects for the workflow.
Rx.Observable.range(1, 10)
  .do((a) => console.log(`From do operator ${a}`))
  .map((a) => a * a)
  .subscribe(createSubscriber("simple"));

// Finally operator only executes after the range has completed - it knows its in the pipeline
// Every operator creates a new observable
Rx.Observable.range(1, 10)
  .finally((a) => console.log(`From finally operator`))
  .map((a) => a * a * a)
  .subscribe(createSubscriber("finally"));

// Filter operator - filter by a predicate (just like .where and where in SQL)
// This wont complete until the range is output full values, but will only produce via filter
Rx.Observable.range(1, 10)
  .filter((a) => a < 5)
  .subscribe(createSubscriber("filter"));

// startWith operator - sets an interval to start with a certain value instantly instead of
// waiting for first interval before producing values.
Rx.Observable.interval(1000)
  .startWith(-1)
  .subscribe(createSubscriber("interval"));
