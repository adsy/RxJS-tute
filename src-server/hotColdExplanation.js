// Hot and Cold observables - whether it is hot or cold affects how its expected to behave.

// ------------------------------ HOT ------------------------------ //
// Hot observable - concept of what you are prescribing to regardless of whether you
// are listening. Do not expect to receive historical data, only when it is plugged into.

// ------------------------------ COLD ------------------------------ //
// Cold observable - all examples in built in examples are cold observable.
// When it is subscribed to is when the observable starts doing something and producing
// values.
// Expect every item from the start, and when subscribed to once again it gets every item
// from start again.
// Everytime it is subscribed to, we get a new instance of that pipeline.
