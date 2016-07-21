var PlaceActions = require('../actions/placeActions.js');
var bSearch = require('binarysearch');
var PlaceGroupIdxUtil = require('./placeGroupIdxUtil.js');

var placesSearchResults;

var PlacesUtil = {
  searchForGooglePlaces: function (placesSearchObject) {
    placesSearchResults = {}
    desiredStopCount = placesSearchObject.desiredStopCount;

    placesSearchRequests = this.createPlacesSearchRequests(placesSearchObject);
    for (var i=0; i < placesSearchRequests.length; i++) {
      this.googlePlacesSearch(placesSearchRequests[i], i);
    }
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

      // 'distance' below is to be used to pass stop distance
      // info to React components, not Google:
      var placesSearchRequest = {
        radius: googlePlacesSearchParameters.radiusTolerance,
        // multiple 'types' search not supported starting 2/16/2017 - refactor:
        types: ['cafe', 'convenience_store', 'grocery_or_supermarket'],
        location: searchLocation,
        distance: googlePlacesSearchParameters.routeDistances[latLngPairIndices[i]]
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

  googlePlacesSearch: function (placesSearchRequest, placeGroupIdx) {
    var container = document.getElementById('maps-placeholder');
    var service = new google.maps.places.PlacesService(container);
    service.nearbySearch(placesSearchRequest,
      this.googlePlacesSearchCallback.bind(this, placeGroupIdx));
  },

// https://developers.google.com/maps/documentation/javascript/places#place_search_requests
  googlePlacesSearchCallback: function (results, status, placeGroupIdx) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      placesSearchResults[placeGroupIdx] = (results);
    } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
      placesSearchResults[placeGroupIdx] = [];
    } else if (status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
      alert(
        "You have exceeded the Google Place API query limit! Please wait a moment, then try again."
      );
      placesSearchResults = {};
    } else {
      alert("There was a Google Places API error unrelated to the query limit!")
    }

    // Send search results over to PlacesAction only after Google Places has
    // searched for places at each stop geo point:
    if (Object.keys(placesSearchResults).length === desiredStopCount) {
      console.log(placesSearchResults);

    //   // put placesSearchResults places into groups based on proximity to each stop,
    //   // keeping in mind that I have access to placesSearchRequests, which has map items:
    //   var sortedPlacesSearchResults = [];
    //   for (var i = 0; i < desiredStopCount; i++) {
    //     sortedPlacesSearchResults.push([]);
    //   }
    //
    //   // create flattened version of placesSearchResults:
    //   var flatPlacesSearchResults = [].concat.apply([], placesSearchResults)
    //   var radius = placesSearchRequests[0].radius;
    //
    //   for (var i = 0; i < flatPlacesSearchResults.length; i++) {
    //     var resultPoint = flatPlacesSearchResults[i].geometry.location;
    //
    //     for (var j = 0; j < placesSearchRequests.length; j++) {
    //       var searchPoint = placesSearchRequests[j].location;
    //       var distance = google.maps.geometry.spherical.computeDistanceBetween(resultPoint, searchPoint);
    //
    //       if (distance < radius) {
    //         sortedPlacesSearchResults[j].push(flatPlacesSearchResults[i]);
    //       }
    //     }
    //   }
    //
    //   // ensure sortedPlacesSearchResults subarrays contain only unique elements
    //   var uniqueSortedPlacesSearchResults = [];
    //   for (var i = 0; i < sortedPlacesSearchResults.length; i++) {
    //     uniqueSubarray = PlacesUtil.createNoDupsArray(sortedPlacesSearchResults[i]);
    //     uniqueSortedPlacesSearchResults.push(uniqueSubarray);
    //   }
    //
    //   // Convert sortedPlacesSearchResults, which contains only Arrays, to a
    //   // collection of Objects, each of which can be used in the React views:
    //   var objectResults = [];
    //   for (var i = 0; i < uniqueSortedPlacesSearchResults.length; i++) {
    //     var objectResult = {};
    //     objectResult.stopGroupId = i;
    //     objectResult.distanceIntoRoute = placesSearchRequests[i].distance;
    //     objectResult.places = [];
    //
    //     for (var j = 0; j < uniqueSortedPlacesSearchResults[i].length; j++) {
    //       objectResult.places.push(uniqueSortedPlacesSearchResults[i][j]);
    //     }
    //     objectResults.push(objectResult);
    //   }
    //
    //
    //   PlaceActions.receiveAllPlaces(objectResults);
    //
    //   // allows markers to be set for first tab places after submitting search terms:
    //   PlaceGroupIdxUtil.setInitialPlaceGroupIdx();
    }
  },
  //
  // createNoDupsArray: function (array) {
  //   var idCollection = {}
  //   var newArray = []
  //
  //   for (var i = 0; i < array.length; i++) {
  //     var currId = array[i].id
  //
  //     if (typeof idCollection[currId] === "undefined") {
  //       idCollection[currId] = true;
  //       newArray.push(array[i]);
  //     }
  //   }
  //
  //   return newArray;
  // }

}

module.exports = PlacesUtil;
