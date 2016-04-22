var PlacesActions = require('../actions/placesActions.js');

var PlacesUtil = {

  searchForGooglePlaces: function (placesSearchObjects) {
    // SKB: assuming this will eventually become a 2-d array of arrays of results
    // associated with multiple searched places
    var placesSearchResults = [];

    placesSearchRequests = this.createPlacesSearchRequests(placesSearchObjects);
    placesSearchRequests.forEach(function (placesSearchRequest) {
      // SKB: will the place be an Array of places returned by Google Places API?
      var placesSearchResult = this.googlePlacesSearch(placesSearchRequest);
      placesSearchResults.push(placesSearchResult);
    }.bind(this));

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
        types: ['cafe', 'bicycle_shop'],
        location: searchLocation
      };

      placesSearchRequests.push(placesSearchRequest)
    };
    console.log(placesSearchRequests)
    return placesSearchRequests
  },

  googlePlacesSearch: function (placesSearchRequest) {
    var container = document.getElementById('route-detail-list');
    var service = new google.maps.places.PlacesService(container);

    placesSearchResult = service.nearbySearch(placesSearchRequest,
      this.googlePlacesSearchCallback);

    return placesSearchResult
  },

  googlePlacesSearchCallback: function (results, status) {
    debugger
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        // var place = results[i];
        // createMarker(results[i]);
        console.log(results[i]);
      }
    }
  }

}

module.exports = PlacesUtil;
window.PlacesUtil = PlacesUtil;
