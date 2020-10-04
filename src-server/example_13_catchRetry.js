import Rx from "rxjs/Rx";
import { createSubscriber } from "./lib/util";

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
  return new Rx.Observable((observer) => {
    console.log("Getting API");
    setTimeout(() => {
      observer.error(new Error());
    }, 1000);
  });
}

getAPI2()
  .retry(4)
  // leaving the catch operator out of this pipeline will cause the pipeline to unsubscribe after the 4 retries.
  .catch((error) => Rx.Observable.of(error))
  .do(() => console.log("thing"))
  .subscribe(createSubscriber("faux API retry"));
