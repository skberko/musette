var React = require('react');
var PlaceStore = require('../../stores/placeStore.js');
var PlaceGroupIdxStore = require('../../stores/placeGroupIdxStore.js');

var routeDetailMap = React.createClass({

  // equivalent to '_onChange':
  setMarkers: function() {
    // clears the previous markers from the map:
    this.markers.forEach(function (marker) {
      marker.setMap(null);
    });

    var currentTabIdx = PlaceGroupIdxStore.placeGroupIdx();
    // currentTabPlaces is an Array of place Objects:
    // temporarily slice just the few handful of places for clarity's sake:
    var currentTabPlaces = PlaceStore.all()[currentTabIdx].places.slice(0, 5);


    // creates new markers from currentTabPlaces and pushes them into this.markers Array:
    currentTabPlaces.forEach(this.createMarkerFromPlace);


    // info on removing marker using marker.setMap(null):
    // https://developers.google.com/maps/documentation/javascript/markers#remove
  },

  createMarkerFromPlace: function (place) {
    var marker = new google.maps.Marker({
      position: place.geometry.location,
      map: this.map,
      placeId: place.id,
      title: place.name + ": " + place.vicinity
    });

    this.markers.push(marker);
  },

  componentDidMount: function(){
    this.markers = [];
    // 'setMarkers' is equivalent to '_onChange':
    this.placeGroupIdxListener = PlaceGroupIdxStore.addListener(this.setMarkers);

    var decodedPolylineCoordPairs = google.maps.geometry.encoding.decodePath(this.props.routeDetail.route.map.polyline);

    var routePath = new google.maps.Polyline({
      path: decodedPolylineCoordPairs,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    var coordinates = this.props.routeDetail.route_stream[0].data;
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < coordinates.length; i++) {
      var latLng = new google.maps.LatLng(coordinates[i][0], coordinates[i][1])
      bounds.extend(latLng);
    }

    var mapDOMNode = this.refs.map;

    // following can take an options mapOptions argument for great customization:
    this.map = new google.maps.Map(mapDOMNode);

    var latLngPairs = this.props.routeDetail.route_stream[0].data
    var startLatLng = new google.maps.LatLng(latLngPairs[0][0], latLngPairs[0][1])
    var lLLastIdx = (latLngPairs.length - 1)
    var finishLatLng = new google.maps.LatLng(latLngPairs[lLLastIdx][0], latLngPairs[lLLastIdx][1])

    var startIcon = {
      url: 'http://res.cloudinary.com/dz5btfj9w/image/upload/c_scale,w_28/v1462234376/start_flag_298_288_thhem0.png',
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      // anchor: new google.maps.Point(0, 32)
    };

    var finishIcon = {
      url: 'http://res.cloudinary.com/dz5btfj9w/image/upload/c_scale,h_40/v1462234772/red_flag_13_vu4rzt.png',
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(6, 38)
    };

    var startMarker = new google.maps.Marker({
      position: startLatLng,
      map: this.map,
      title: 'Start',
      fillColor: 'green',
      icon: startIcon
    });

    var finishMarker = new google.maps.Marker({
      position: finishLatLng,
      map: this.map,
      title: 'Finish',
      fillColor: 'red',
      icon: finishIcon
    });

    this.map.fitBounds(bounds)
    routePath.setMap(this.map);
  },

  componentWillUnmount: function () {
    this.placeGroupIdxListener.remove();
  },

  render: function () {

    // the ref 'map' refers to this.map created in componentDidMount fcn above
    return(<div className="route-detail-map" ref="map" id="rdm">Map</div>);
  }
})

module.exports = routeDetailMap;
