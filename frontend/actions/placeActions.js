var Dispatcher = require('../dispatcher/dispatcher.js');
var PlaceConstants = require('../constants/placeConstants.js');

var PlaceActions = {
  receiveAllPlaces: function (places) {
    console.log("PlaceActions.receiveAllPlaces has been hit.");
    console.log(places);
    Dispatcher.dispatch({
      actionType: PlaceConstants.PLACES_RECEIVED,
      places: places
    });
  }
}

module.exports = PlaceActions;
window.PlaceActions = PlaceActions;
