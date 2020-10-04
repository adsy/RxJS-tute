"use strict";

var _Rx = require("rxjs/Rx");

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require("./lib/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Rx.Observable.interval(1000)
//   .take(3)
//   .map((a) => a * a)
//   .subscribe(createSubscriber("map"));

// ---------------- MergeMap OPERATOR ---------------- //
// equivalent to select many

// function arrayMap(array, project) {
//   const returnArray = [];
//   for (let item of array) returnArray.push(project(item));

//   return returnArray;
// }

// function arrayMergeMap(array, projection) {
//   const returnArray = [];
//   for (let item of array) {
//     const projectedArray = projection(item);
//     for (let project of projectedArray) {
//       returnArray.push(project);
//     }
//   }

//   return returnArray;
// }

// const albums = [
//   {
//     title: "album1",
//     tracks: [
//       { id: 1, tile: "title1" },
//       { id: 2, tile: "title2" },
//     ],
//   },
//   {
//     title: "album2",
//     tracks: [
//       { id: 3, tile: "title3" },
//       { id: 4, tile: "title4" },
//     ],
//   },
// ];

// const tracksWrong = arrayMap(albums, (album) => album.tracks); // will return an array of arrays
// const tracksRight = arrayMergeMap(albums, (album) => album.tracks); // returns a single array of track objects

// console.log(JSON.stringify(tracksRight));

_Rx2.default.Observable.range(2, 3)
// mergemap returns a thing depending on context - in this case it is an observable
// merged into the stream
.mergeMap(function (i) {
  return _Rx2.default.Observable.timer(i * 1000).map(function () {
    return "After " + i + " seconds";
  });
}).subscribe((0, _util.createSubscriber)("mergemap"));

function getTracks() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(["track 1", "track 2", "track 3"]);
    }, 1000);
  });
}

_Rx2.default.Observable.fromPromise(getTracks())
// tracks track array and emits each individual item as an observable
.mergeMap(function (tracks) {
  return _Rx2.default.Observable.from(tracks);
}).subscribe((0, _util.createSubscriber)("promise"));

function query(value) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("THIS IS THE VALUE: " + value);
    }, 1000);
  });
}

_Rx2.default.Observable.of("my query").mergeMap(function (a) {
  return query(a);
}).subscribe((0, _util.createSubscriber)("query"));