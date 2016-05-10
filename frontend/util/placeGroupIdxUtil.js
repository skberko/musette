var PlaceGroupIdxActions = require('../actions/placeGroupIdxActions.js');

var PlaceGroupIdxUtil = {

  fetchPlaceGroupIdx: function (placeGroupIdx) {
    PlaceGroupIdxActions.receivePlaceGroupIdx(placeGroupIdx);
  },

  setInitialPlaceGroupIdx: function () {
    PlaceGroupIdxActions.setInitialPlaceGroupIdx();
  }

};

module.exports = PlaceGroupIdxUtil;
