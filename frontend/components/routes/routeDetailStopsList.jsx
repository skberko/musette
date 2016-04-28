var React = require('react');
var PlaceStore = require('../../stores/placeStore.js');

var RouteDetailStopsList = React.createClass({
  getInitialState: function () {
    return { places: PlaceStore.all() };
  },

  render: function () {
    return(
      <h4 id="route-detail-list">I am the RouteDetailStopsList react component for {this.props.routeDetail.route.name}.</h4>
    );
  }
})

module.exports = RouteDetailStopsList;
