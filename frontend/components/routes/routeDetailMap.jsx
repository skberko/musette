var React = require('react');

var routeDetailMap = React.createClass({
  componentDidMount: function(){
    var mapDOMNode = this.refs.map;
    var mapOptions = {
      center: {lat: 37.7758, lng: -122.435},
      zoom: 13
    };

    var decodedPolylineCoordPairs = google.maps.geometry.encoding.decodePath(this.props.routeDetail.route.map.polyline);

    var routePath = new google.maps.Polyline({
      path: decodedPolylineCoordPairs,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    routePath.setMap(this.map);
  },

  render: function () {
    // debugger
    // the ref 'map' refers to this.map created in componentDidMount fcn above
    return(<div className="route-detail-map" ref="map">Map</div>);
  }
})

module.exports = routeDetailMap;
// function initMap() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 3,
//     center: {lat: 0, lng: -180},
//     mapTypeId: google.maps.MapTypeId.TERRAIN
//   });
//
//   var flightPlanCoordinates = [
//     {lat: 37.772, lng: -122.214},
//     {lat: 21.291, lng: -157.821},
//     {lat: -18.142, lng: 178.431},
//     {lat: -27.467, lng: 153.027}
//   ];
//
//
//   flightPath.setMap(map);
// }

// <div>I am the RouteDetailMap react component for {this.props.routeDetail.route.name}.</div>
