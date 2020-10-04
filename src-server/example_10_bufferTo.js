import Rx from "rxjs/Rx";
import { createSubscriber } from "./lib/util";

// // ---------------- BUFFER OPERATOR ---------------- //

// // BufferCount Operator - Buffering items into arrays and outputted with the next operator.

// Rx.Observable.range(1, 200)
//   .bufferCount(50)
//   .subscribe(createSubscriber("items"));

// // bufferTime - emits the stream of items as an array after the amount of time specified.
// // interval pops out value every half second, and is outputted as an array with each next method call every 2 seconds

// Rx.Observable.interval(500)
//   .bufferTime(2000)
//   .subscribe(createSubscriber("bufferTime"));

// // buffer operator - takes in observable, and everytime that observable produces an event
// // it will cause the buffer to flush to output.
// // Can use this to buffer items until for example, a user presses a button.

// Rx.Observable.interval(500)
//   .buffer(Rx.Observable.interval(2000))
//   .subscribe(createSubscriber("buffer"));

// const stopSubject$ = new Rx.Subject();
// Rx.Observable.interval(500)
//   .buffer(stopSubject$)
//   .subscribe(createSubscriber("subjectBuffer"));

// setTimeout(() => {
//   setTimeout(() => {
//     stopSubject$.next();
//   }, 3000);
//   stopSubject$.next();
// }, 3000);

// ---------------- ToArray OPERATOR ---------------- //

// ToArray operator - converts what would normally be outputed in individual next operators, into
// an array.
// ToArray will collect all off the previous operations next and then output it in 1 array.

Rx.Observable.range(1, 10).toArray().subscribe(createSubscriber("range1"));
