var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var PlaceGroupIdxConstants = require('../constants/placeGroupIdxConstants.js');
var PlaceGroupIdxStore = new Store(Dispatcher);

// set to -1 for time being until a stop tab is selected;
// should it be defaulted to 0 to auto-show first tab's stops upon rendering
// search results from form?
var _placeGroupIdx = 0;

var resetPlaceGroupIdx = function (placeGroupIdx) {
  _placeGroupIdx = placeGroupIdx;
}

PlaceGroupIdxStore.placeGroupIdx = function () {
  return _placeGroupIdx;
}

PlaceGroupIdxStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case PlaceGroupIdxConstants.PLACE_GROUP_IDX_RECEIVED:
      resetPlaceGroupIdx(payload.placeGroupIdx);
      PlaceGroupIdxStore.__emitChange();
      break;
  }
}

module.exports = PlaceGroupIdxStore;
window.PlaceGroupIdxStore = PlaceGroupIdxStore;
