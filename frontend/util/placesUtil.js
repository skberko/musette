var PlacesActions = require('../actions/placesActions.js');
var bSearch = require('binarysearch');
var placesSearchResults;

var PlacesUtil = {
  searchForGooglePlaces: function (placesSearchObject) {
    placesSearchResults = []
    desiredStopCount = placesSearchObject.desiredStopCount;

    placesSearchRequests = this.createPlacesSearchRequests(placesSearchObject);
    placesSearchRequests.forEach(function (placesSearchRequest) {
      this.googlePlacesSearch(placesSearchRequest);
    }.bind(this));
  },

  createPlacesSearchRequests: function (googlePlacesSearchParameters) {
    placesSearchRequests = []

    var routeTotalDistance = googlePlacesSearchParameters.routeTotalDistance;
    var distanceArray = googlePlacesSearchParameters.routeDistances;
    var stopCount = googlePlacesSearchParameters.desiredStopCount;
    var latLngPairIndices = this.calculateLatLngPairIndices(routeTotalDistance, distanceArray, stopCount);

    for (i = 0; i < latLngPairIndices.length; i++) {
      var lat = googlePlacesSearchParameters.routeLatLngPairs[latLngPairIndices[i]][0];
      var lng = googlePlacesSearchParameters.routeLatLngPairs[latLngPairIndices[i]][1];
      var searchLocation = new google.maps.LatLng(lat, lng);

      var placesSearchRequest = {
        radius: googlePlacesSearchParameters.radiusTolerance,
        // multiple 'types' search not supported starting 2/16/2017 - refactor:
        types: ['cafe', 'convenience_store', 'grocery_or_supermarket'],
        location: searchLocation
      };

      placesSearchRequests.push(placesSearchRequest)
    };

    return placesSearchRequests;
  },

  // to find relatively evenly-spaced lng-lat pair indices:
  calculateLatLngPairIndices: function (routeTotalDistance, distanceArray, desiredStopCount) {
    equidistantStopDistances = this.calculateEquidistantStopDistances(
        routeTotalDistance, desiredStopCount);

    closestEquidistantStopIndices = this.findClosestEquidistantStopIndices(
        distanceArray, equidistantStopDistances);

    return closestEquidistantStopIndices;
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

  // uses closest match binary search to find stream indices of points at
  // distances closest to those returned by calculateEquidistantStopDistances:
  findClosestEquidistantStopIndices: function (distanceStream, equidistantStopDistances) {
    var closestEquidistantStopIndices = [];

    for (i = 0; i < equidistantStopDistances.length; i++) {
      var match = bSearch.closest(distanceStream, equidistantStopDistances[i]);
      closestEquidistantStopIndices.push(match);
    }

    return closestEquidistantStopIndices;
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

    if (placesSearchResults.length === desiredStopCount) {
      PlacesActions.receiveAllPlaces(placesSearchResults);
    }
  }

}

module.exports = PlacesUtil;
window.PlacesUtil = PlacesUtil;
