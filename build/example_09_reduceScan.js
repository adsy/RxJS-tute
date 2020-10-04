"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Rx = require("rxjs/Rx");

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require("./lib/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// What if you had an observal that is producing all these individual items but you want to perform
// an operation on them and collect them into a single value (sum all numbers produced by observable)

// ---------------- REDUCE OPERATOR ---------------- //
function arrayReduce(array, accumulator, startValue) {
  var value = startValue;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      value = accumulator(value, item);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return value;
}

var values = [324, 342, 565, 341];

console.log(arrayReduce(values, function (acc, i) {
  return acc + i;
}, 0));

// Turns the above code into an observable
// Reduce will never output unless the observables outputs its complete function
_Rx2.default.Observable.range(1, 10).merge(_Rx2.default.Observable.range(50, 10)).reduce(function (acc, val) {
  return acc + val;
}).subscribe((0, _util.createSubscriber)("reduce"));

// ---------------- SCAN OPERATOR ---------------- //
// Scan outputs each observable with the next operator, even if complete is never called.
_Rx2.default.Observable.range(1, 10).merge(_Rx2.default.Observable.range(50, 10)).scan(function (acc, val) {
  return acc + val;
}).subscribe((0, _util.createSubscriber)("scan"));

// Example below will output arrays of the current and last value of the observable.
_Rx2.default.Observable.range(1, 10).map(function (i) {
  return i * i;
}).scan(function (_ref, current) {
  var _ref2 = _slicedToArray(_ref, 2),
      last = _ref2[0],
      _ = _ref2[1];

  return [current, last];
}, []).subscribe((0, _util.createSubscriber)("scan2"));