var Dispatcher = require('../dispatcher/dispatcher.js');
var PlaceGroupIdxConstants = require('../constants/placeGroupIdxConstants.js');

var PlaceGroupIdxActions = {
  receivePlaceGroupIdx: function (placeGroupIdx) {
    Dispatcher.dispatch({
      actionType: PlaceGroupIdxConstants.PLACE_GROUP_IDX_RECEIVED,
      placeGroupIdx: placeGroupIdx
    });
  }
}

module.exports = PlaceGroupIdxActions;
window.PlaceActions = PlaceGroupIdxActions;
