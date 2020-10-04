"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSubscriber = createSubscriber;
// Function  returns a subscriber object which has the functions for the observable
function createSubscriber(tag) {
  return {
    next: function next(item) {
      console.log(tag + ".next " + item);
    },
    error: function error(_error) {
      console.log(tag + ".error " + (_error.stack || _error));
    },
    complete: function complete() {
      console.log(tag + ".complete");
    }
  };
}