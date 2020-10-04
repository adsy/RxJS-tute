import $ from "jquery";
import Rx from "rxjs/Rx";

// alias elements in jQuery objects
const $drag = $("#drag");
const $document = $(document);
const $dropAreas = $(".drop-area");

// 3 event streams - hot observables for mouse movement.
const beginDrag$ = Rx.Observable.fromEvent($drag, "mousedown");
const endDrag$ = Rx.Observable.fromEvent($document, "mouseup");
const mouseMove$ = Rx.Observable.fromEvent($document, "mousemove");

// how to get the current area the mouse is over when the drag is performed.
// merge together mouseover events (produce jquery object which points to element the mouse was over)
// 'mouseout' will produce null
const currentOverAreas$ = Rx.Observable.merge(
  Rx.Observable.fromEvent($dropAreas, "mouseover").map((e) => $(e.target)),
  Rx.Observable.fromEvent($dropAreas, "mouseout").map((e) => null)
);

// beginDrags is going to return an event so we preventDefault.
// hook in beginDrags - mouse down on drag
const drops$ = beginDrag$
  .do((e) => {
    // perform sideeffect - prevent default of selecting text
    e.preventDefault();
    // add dragging class to drag element
    $drag.addClass("dragging");
  })
  // extract startEvent in mergeMap
  .mergeMap((startEvent) => {
    // look at mouseMoves observable, take until the mouseup (endDrag$ observable) stops outputting
    return (
      mouseMove$
        .takeUntil(endDrag$)
        // perform sideeffect of calling the moveDrag function with both startEvent and moveEvent for coords.
        .do((moveEvent) => moveDrag(startEvent, moveEvent))
        // dont do anything until it has stopped outputting.
        .last()
        // combine the stream from the currentOverArea observable and return the area.
        .withLatestFrom(currentOverAreas$, (_, $area) => $area)
    );
  })
  // when the mergeMap is done it takes the last element and removes the dragging element from the screen
  // and animates the square moving back to the top left corner.
  .do(() => {
    $drag.removeClass("dragging").animate({ top: 0, left: 0 }, 250);
  });

// subscribe to the drops$ observable
drops$.subscribe(($dropArea) => {
  // remove the dropped class from the observable
  $dropAreas.removeClass("dropped");
  // if dropArea is not null - add the class dropped to the area (div)
  if ($dropArea) $dropArea.addClass("dropped");
});

function moveDrag(startEvent, moveEvent) {
  $drag.css({
    left: moveEvent.clientX - startEvent.offsetX,
    top: moveEvent.clientY - startEvent.offsetY,
  });
}
