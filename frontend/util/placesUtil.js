var PlacesActions = require('../actions/placesActions.js');
var placesSearchResults;

var PlacesUtil = {

  searchForGooglePlaces: function (placesSearchObjects) {
    placesSearchResults = []

    placesSearchRequests = this.createPlacesSearchRequests(placesSearchObjects);

    placesSearchRequests.forEach(function (placesSearchRequest) {
      this.googlePlacesSearch(placesSearchRequest);
    }.bind(this));

    console.log(placesSearchResults)
    PlacesActions.receiveAllPlaces(placesSearchResults);
  },

  createPlacesSearchRequests: function (googlePlacesSearchParameters) {
    placesSearchRequests = []
    var streamLength = googlePlacesSearchParameters.routeDistances.length

    for (i = googlePlacesSearchParameters.desiredStopCount; i > 0 ; i--) {
      // subtract 1 from streamIdx for now to account for last idx position
      // in the stream arrays; when actual search alg is written later, this
      // may not be an issue:
      var streamIdx = Math.floor(streamLength / i) - 1;
      var lat = googlePlacesSearchParameters.routeLatLngPairs[streamIdx][0];
      var lng = googlePlacesSearchParameters.routeLatLngPairs[streamIdx][1];
      var searchLocation = new google.maps.LatLng(lat, lng);

      var placesSearchRequest = {
        radius: googlePlacesSearchParameters.radiusTolerance,
        type: ['cafe'],
        location: searchLocation
      };

      placesSearchRequests.push(placesSearchRequest)
    };
    return placesSearchRequests
  },

  googlePlacesSearch: function (placesSearchRequest) {
    var container = document.getElementById('route-detail-list');
    var service = new google.maps.places.PlacesService(container);
    service.nearbySearch(placesSearchRequest,
      this.googlePlacesSearchCallback);
  },

// https://developers.google.com/maps/documentation/javascript/places#place_search_requests
  googlePlacesSearchCallback: function (results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      placesSearchResults.push(results);
    } else {
      placesSearchResults.push([]);
    }
    console.log(placesSearchResults)
  }

}

module.exports = PlacesUtil;
window.PlacesUtil = PlacesUtil;
