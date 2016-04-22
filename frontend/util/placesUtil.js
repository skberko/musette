var PlacesActions = require('../actions/placesActions.js');

var PlacesUtil = {

  createLatLngPairs: function () {

  },

  searchForGooglePlaces: function (googlePlacesSearchParameters) {
    var placesSearchResults = [];

    // create an array of latlng pairs to pass into google places search
    // using a helper method

    // use a helper method to figure out which coord pairs to search:
    placesSearchObjects = this.createPlacesSearchObjects(googlePlacesSearchParameters);
    debugger
    // placesSearchObjects.forEach(function (placesSearchObject) {
    //   var placesSearchResult = googlePlacesSearch(placesSearchObject);
    //   placesSearchResults.push(placesSearchResult);
    // });
    //
    // PlaceActions.receiveAllPlaces(placesSearchResults);
  },

  createPlacesSearchObjects: function (googlePlacesSearchParameters) {
    placesSearchObjects = []
    var streamLength = googlePlacesSearchParameters.routeDistances.length

    for (i = googlePlacesSearchParameters.desiredStopCount; i > 0 ; i--) {
      // subtract 1 from streamIdx for now to account for last idx position
      // in the stream arrays; when actual search alg is written later, this
      // may not be an issue:
      var streamIdx = Math.floor(streamLength / i) - 1;
      var lat = googlePlacesSearchParameters.routeLatLngPairs[streamIdx][0];
      var lng = googlePlacesSearchParameters.routeLatLngPairs[streamIdx][1];
      var searchCenter = new google.maps.LatLng(lat, lng);

      var placesSearchObject = {
        radius: googlePlacesSearchParameters.radiusTolerance,
        types: ['store', 'cafe', 'bicycle_shop'],
        center: searchCenter
      };

      placesSearchObjects.push(placesSearchObject)
    };



    return placesSearchObjects
  },

  createPlacesSearchLatLngPairs: function () {

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
