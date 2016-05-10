var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var PlaceConstants = require('../constants/placeConstants.js');
var PlaceStore = new Store(Dispatcher);

var _places = {};

var resetPlaces = function (places) {
  _places = {};
  for (var i = 0; i < places.length; i++) {
    // the index value i represents the stop number of the group of places:
    _places[i] = places[i];
  }
}

PlaceStore.all = function () {
  var places = [];
  var keys = Object.keys(_places).sort();

  keys.forEach( function (key) {
    places.push(_places[key]);
  });

  return places;
}

PlaceStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case PlaceConstants.PLACES_RECEIVED:
      resetPlaces(payload.places);
      PlaceStore.__emitChange();
      break;
  }
}

module.exports = PlaceStore;
