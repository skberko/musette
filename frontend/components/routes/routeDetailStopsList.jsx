var React = require('react');

var RouteDetailStopsList = React.createClass({
  render: function () {
    return(
      <h4 id="route-detail-list">I am the RouteDetailStopsList react component for {this.props.routeDetail.route.name}.</h4>
    );
  }
})

module.exports = RouteDetailStopsList;
