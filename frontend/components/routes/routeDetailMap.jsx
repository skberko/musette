var React = require('react');

var routeDetailMap = React.createClass({
  componentDidMount: function(){
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
    this.map.fitBounds(bounds)
    routePath.setMap(this.map);
  },

  render: function () {
    // the ref 'map' refers to this.map created in componentDidMount fcn above
    return(<div className="route-detail-map route-detail-map-form-container-item" ref="map" id="rdm">Map</div>);
  }
})

module.exports = routeDetailMap;
