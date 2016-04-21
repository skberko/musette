var React = require('react');

var routeDetailMap = React.createClass({
  componentDidMount: function(){
    var mapDOMNode = this.refs.map;
    var mapOptions = {
      center: {lat: 37.7758, lng: -122.435},
      zoom: 13
    };
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
  },

  render: function () {
    return(<div className="route-detail-map" ref="map">Map</div>);
  }
})

module.exports = routeDetailMap;


// <div>I am the RouteDetailMap react component for {this.props.routeDetail.route.name}.</div>
