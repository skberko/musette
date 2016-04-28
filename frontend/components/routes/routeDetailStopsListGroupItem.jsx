var React = require('react');

var RouteDetailStopsListGroup = React.createClass({
  getInitialState: function () {
    return { places: PlaceStore.all() };
  },

  render: function () {
    return(
      <h4 id="route-detail-list">I am the RouteDetailStopsList react component for {this.props.routeDetail.route.name}.</h4>
    );
  }
})
