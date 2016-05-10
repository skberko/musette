var Dispatcher = require('../dispatcher/dispatcher.js');
var PlaceGroupIdxConstants = require('../constants/placeGroupIdxConstants.js');

var PlaceGroupIdxActions = {
  receivePlaceGroupIdx: function (placeGroupIdx) {
    Dispatcher.dispatch({
      actionType: PlaceGroupIdxConstants.PLACE_GROUP_IDX_RECEIVED,
      placeGroupIdx: placeGroupIdx
    });
  },

  setInitialPlaceGroupIdx: function () {
    Dispatcher.dispatch({
      actionType: PlaceGroupIdxConstants.SET_INITIAL_PLACE_GROUP_IDX,
      placeGroupIdx: 0
    })
  }
}

module.exports = PlaceGroupIdxActions;
