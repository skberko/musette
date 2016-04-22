var PlacesActions = require('../actions/placesActions.js');

var ApiUtil = {

  createLatLngPairs: function () {

  },

  searchForGooglePlaces: function (placesSearchParamObjects) {
    var placesResults = [];

    placesSearchParamObjects.forEach(function (placesSearchParamObject) {
      var placesSearchResult = googlePlacesSearch(placesSearchParamObject);
      placesResults.push(placesSearchResult);
    });

    PlaceActions.receiveAllPlaces(placesResults);
  },

  googlePlacesSearch: function () {
    var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

    var request = {
      location: pyrmont,
      radius: '500',
      types: ['store']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }


  //pseudocode for searchForGooglePlaces:
  // - create an empty placesResults array
  // - take take an array of search param objects, each with a different
  // center latlng value
  // - iterate over each of the search param objects, hitting the google places
  // api on each one, then pushing the results of this into the placesResults
  // array
  // - pass the array
}

module.exports = PlacesUtil;

// For console testing purposes only;
// to be removed before app goes into production:
window.PlacesUtil = PlacesUtil;
