var PlacesActions = require('../actions/placesActions.js');
var placesSearchResults;

var PlacesUtil = {

  // Pass in PlacesActions.receiveAllPlaces(placesSearchResults) as a callback
  // to ensure it doesn't receive placesSearchResults until placesSearchResults
  // is fully populated:
  // SKB: this solution not yet implemented; using setTimeout below as a stopgap
  searchForGooglePlaces: function (placesSearchObject, callback) {
    debugger;
    placesSearchResults = []

    placesSearchRequests = this.createPlacesSearchRequests(placesSearchObject);
    placesSearchRequests.forEach(function (placesSearchRequest) {
      this.googlePlacesSearch(placesSearchRequest);
    }.bind(this));
    // remove this setTimeout once I have a solution using a callback instead;
    // could using a 'for' loop above solve this async problem? investigate.
    setTimeout(function() { PlacesActions.receiveAllPlaces(placesSearchResults); }, 3000);
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
        // using a 'types' array to support multiple types in one api call is
        // now deprecated and will cease to be supported entirely on Feb 16,
        // 2017; must refactor to make multiple calls to multiple types
        types: ['cafe', 'convenience_store', 'grocery_or_supermarket'],
        location: searchLocation
      };

      placesSearchRequests.push(placesSearchRequest)
    };
    return placesSearchRequests
  },

  bsearch: function (numbers, target) {
    if (numbers.length === 0) {
      return -1;
    }

    var probeIdx = Math.floor(numbers.length / 2);
    var probe = numbers[probeIdx];
    if (target === probe) {
      return probeIdx;
    } else if (target < probe) {
      var left = numbers.slice(0, probeIdx);
      return bsearch(left, target);
    } else {
      var right = numbers.slice(probeIdx + 1);
      var subproblem = bsearch(right, target);

      return subproblem === -1 ? -1 : subproblem + (probeIdx + 1);
    }
  },

  // to find evenly-spaced lng-lat pair indices:
  calculateLatLngPairIndices: function (distanceArray, desiredStopCount) {
    equidistantStopDistances = this.calculateEquidistantStopDistances(
        placesSearchObject.routeTotalDistance, desiredStopCount);


  },

  // e.g. returns [20, 40, 60, 80] for 100-mile route w/ 4 stops:
  calculateEquidistantStopDistances: function (routeTotalDistance, desiredStopCount) {
    var equidistantStopDistances = [];
    var distanceBetweenStops =
      routeTotalDistance / (desiredStopCount + 1);
    for (var i = 1; i <= desiredStopCount; i++) {
      equidistantStopDistances.push(i * distanceBetweenStops);
    }

    return equidistantStopDistances;
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
    };
  }

}

module.exports = PlacesUtil;
window.PlacesUtil = PlacesUtil;
