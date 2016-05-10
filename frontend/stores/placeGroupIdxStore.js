var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var PlaceGroupIdxConstants = require('../constants/placeGroupIdxConstants.js');
var PlaceGroupIdxStore = new Store(Dispatcher);

var _placeGroupIdx = -1;

var setInitialPlaceGroupIdx = function () {
  _placeGroupIdx = 0;
}

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
    case PlaceGroupIdxConstants.SET_INITIAL_PLACE_GROUP_IDX:
      setInitialPlaceGroupIdx();
      PlaceGroupIdxStore.__emitChange();
      break;
  }
}

module.exports = PlaceGroupIdxStore;
