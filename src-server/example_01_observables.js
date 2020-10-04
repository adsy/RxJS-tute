import Rx from "rxjs/Rx";
import { createSubscriber } from "./lib/util";

// ---------------------------------- Part 1 ----------------------------------

// Promise example to compare to observables

const promise = new Promise((resolve, reject) => {
  console.log("promise contents");
  resolve("hey");
});

promise.then((item) => console.log(item));

//  Observables example
// 1. Pass in generator object for observer which we can call next/complete method on.
// 2. MUST HAVE A SUBSCRIPTION FUNCTION - generator wont run until one is created.

const simple$ = new Rx.Observable((observer) => {
  console.log("Generating observable");
  setTimeout(() => {
    observer.next("an item");
    setTimeout(() => {
      observer.next("another item");
      observer.complete();
    }, 1000);
  }, 1000);
});

const error$ = new Rx.Observable((observer) => {
  observer.error(new Error("Error printed out in Error object "));
});

// First function is the next function above^
// Second function is the error callback
// Third function is the complete function
// This maps the next, complete and error functions to the pipeline of the observable

error$.subscribe(
  (item) => console.log(`one.next ${item}`), // Next
  (error) => console.log(`one.error ${error.stack}`), // Error
  () => console.log("one.complete") // Complete
);

// First function is the next function above^
// Second function is the error callback
// Third function is the complete function
// This maps the next, complete and error functions to the pipeline of the observable

simple$.subscribe(
  (item) => console.log(`one.next ${item}`), // Next
  (error) => console.log(`one.error ${error}`), // Error
  () => console.log("one.complete") // Complete
);

// Sets another subscription on the pipeline, which starts 3 seconds afterwards.

setTimeout(() => {
  simple$.subscribe({
    next: (item) => console.log(`two.next ${item}`),
    error(error) {
      console.log(`two.error ${error}`);
    },
    complete: function () {
      console.log(`two.complete`);
    },
  });
}, 3000);

// ---------------------------------- Part 2 ----------------------------------

// Create a function that returns an Observable object and also create a function
// that returns a subscriber object as well which we can then use to create multiple
// pipeline/subscriptions.

function createInterval$(time) {
  return new Rx.Observable((observer) => {
    let index = 0;
    let interval = setInterval(() => {
      console.log(`Generating ${index}`);
      observer.next(index++);
    }, time);

    // Function is called when the unsubscribe function is called on the observable object
    return () => {
      clearInterval(interval);
    };
  });
}

// Funciton creates a version of the take() function
function take$(sourceObservable$, amount) {
  return new Rx.Observable((observer) => {
    let count = 0;
    const subscription = sourceObservable$.subscribe({
      next(item) {
        observer.next(item);
        if (++count >= amount) observer.complete();
      },
      error(error) {
        observer.error(error);
      },
      complete() {
        observer.complete();
      },
    });

    return () => subscription.unsubscribe();
  });
}

// Uncomment code below to run the observable/subscription
let everySecond$ = createInterval$(1000);
const firstFiveSeconds$ = take$(everySecond$, 5);
const subscription = firstFiveSeconds$.subscribe(createSubscriber("Count"));

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
