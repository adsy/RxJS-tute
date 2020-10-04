import Rx from "rxjs/Rx";
import { createSubscriber } from "./lib/util";

// ---------------------------------- SUBJECTS ---------------------------------- //

// Both an observable, and an observer.
// Often used to bridge non reactive code with reactive code.

// Big debate going on about when it is appropiate to use subjects - should only consider them as a last resort when bridging reactive and non-reactive code.

const simple$ = new Rx.Subject();

simple$.subscribe(createSubscriber("simple$"));

simple$.next("HELLO");
simple$.next("WORLD");
simple$.complete();
simple$.next("HELLO"); // this does not output as the subject has been completed.

// ---------------------------------- PROXIES FOR OBSERVABLE ---------------------------------- //

// Creates an interval observable which emits a value every second. IntervalSubject is subscribed to interval observable, acting as a proxy for another observable.
// Can subscribe a subject to another observable

const interval$ = new Rx.Observable.interval(1000).take(5);
const intervalSubject$ = new Rx.Subject();
interval$.subscribe(intervalSubject$);

intervalSubject$.subscribe(createSubscriber("sub1"));
intervalSubject$.subscribe(createSubscriber("sub2"));
intervalSubject$.subscribe(createSubscriber("sub3"));

// Using setTimeout will delay the intial values from the interval as the subscription is created 3 seconds later after the interval is created.
setTimeout(() => {
  intervalSubject$.subscribe(createSubscriber("TEST TEST TEST"));
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

const currentUser$ = new Rx.BehaviorSubject({ isLoggedIn: false });
const isLoggedIn$ = currentUser$.map((u) => u.isLoggedIn);

currentUser$.next({ isLoggedIn: false });
isLoggedIn$.subscribe(createSubscriber("isLoggedIn"));

setTimeout(() => {
  currentUser$.next({ isLoggedIn: true, name: "adam" });
}, 3000);

setTimeout(() => {
  isLoggedIn$.subscribe(createSubscriber("delayed"));
}, 1500);

// ---------------------------------- REPLAY SUBJECT ---------------------------------- //
// The parameter passed into the ReplaySubject is the amount of items thatwill be passed into the buffer and replayed.
const replay$ = new Rx.ReplaySubject(3);

// 1 + 2 are saved into the buffer for the next functions
replay$.next(1);
replay$.next(2);

// create a subscriber called 1 - it will get all of the previous next values and all following.
replay$.subscribe(createSubscriber("1"));
replay$.next(3);
replay$.next(4);
replay$.next(5);

// create a subscriber called 2 = it will only get last 3 values as they only fit within the buffer but all following.
replay$.subscribe(createSubscriber("2"));

replay$.next(6);

// ---------------------------------- ASYNC SUBJECT ---------------------------------- //
// ASYNC Subject - only omits the final item before its completed.
// final item will only be outputted once the complete() function is called.

const apiCall$ = new Rx.AsyncSubject();

// one observable below will only output 2 after the complete function is called.
apiCall$.next(1);
apiCall$.subscribe(createSubscriber("one"));
apiCall$.next(2);
apiCall$.complete();

// this will output only the last item as it was subscribed after it was completed
setTimeout(() => {
  apiCall$.subscribe(createSubscriber("two"));
}, 2000);

// Use subjects sparingly, think of where is my data coming from? And then create observable workflow that hooks into those sources.
// Using subjects allows us to get around this, using reactive features.
