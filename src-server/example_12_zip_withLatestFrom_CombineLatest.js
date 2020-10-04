import Rx from "rxjs/Rx";
import { createSubscriber } from "./lib/util";

// // ---------------- STANDARD ZIP OPERATOR ---------------- //
// // Example function below shows how zip works with lodash for example - multiples arrays against each other.

// function arrayZip(array1, array2, selector) {
//   const count = Math.min(array1.length, array2.length);
//   const results = [];

//   for (let i = 0; i < count; i++) {
//     const combined = selector(array1[i], array2[i]);
//     results.push(combined);
//   }

//   return results;
// }

// const array1 = [32, 2, 52, 43, 54];
// const array2 = [1, 2, 3, 4, 5, 6, 7];

// const results = arrayZip(array1, array2, (left, right) => left * right);

// console.log(results);

// // ---------------- RX ZIP OPERATOR ---------------- //
// // How Rx works with zip - first and second item must produce an item before zip operator is called.
// // left operator is the source observable, right is the observable passed in as first parameter.

// Rx.Observable.range(1, 10)
//   .zip(
//     Rx.Observable.interval(500),
//     (left, right) => `item:${left}, at ${right * 500}`
//   )
//   .subscribe(createSubscriber("zip"));

// // ---------------- RX With Latest From OPERATOR ---------------- //
// // observable passed to the operator.
// // withLatestFrom operator - takes in an observable and combines the first observable ouput with the latest from the 2nd
// // observable pass to the operator. This outputs everytime the 2nd observable produces an item.

// Rx.Observable.interval(1000)
//   .withLatestFrom(Rx.Observable.interval(500))
//   .take(5)
//   .subscribe(createSubscriber("withLatestFrom"));

// // ---------------- RX Combine Latest OPERATOR ---------------- //
// // combineLatest operator - takes in an observable and combines the second observable ouput with the latest from the 1st
// // observable passed to the operator. This outputs everytime the 2nd observable produces an item.

// Rx.Observable.interval(1000)
//   .combineLatest(Rx.Observable.interval(500))
//   .subscribe(createSubscriber("combineLatest"));

// // ** can also pass in selector function after the observable as a 2nd parameter for combine latest / with latest from operators.

// // HOW/WHERE WOULD YOU USE THIS - lots of scenarios, one for example is current user logged in for withLatestFrom.

// const currentUser$ = new Rx.BehaviorSubject({ isLoggedIn: false });

// Rx.Observable.interval(1000)
//   .withLatestFrom(currentUser$)
//   .filter(([i, user]) => user.isLoggedIn)
//   .subscribe(createSubscriber("withLatestFrom"));

// setTimeout(() => {
//   currentUser$.next({ isLoggedIn: true });
// }, 3000);

// // Once current user does the next function, it will start producing values.
// // If we want this to happen when the user joins, we use combineLatest as it will get all the values immediately. The second the user changes over, it produces the next value.
// // We can pause these observables until the user logs in by combining it with currentUser$.
