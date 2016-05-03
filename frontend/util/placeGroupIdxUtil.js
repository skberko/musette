var PlaceGroupIdxActions = require('../actions/placeGroupIdxActions.js');

var PlaceGroupIdxUtil = {

  fetchPlaceGroupIdx: function (placeGroupIdx) {
    // console.log('PlaceGroupIdxUtil has received placeGroupIdx: ' + placeGroupIdx)
    PlaceGroupIdxActions.receivePlaceGroupIdx(placeGroupIdx);
  }

};

module.exports = PlaceGroupIdxUtil;
