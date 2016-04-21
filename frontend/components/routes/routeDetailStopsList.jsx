var React = require('react');

var RouteDetailStopsList = React.createClass({
  render: function () {
    return(
      <div>I am the RouteDetailStopsList react component for {this.props.routeDetail.route.name}.</div>
    );
  }
})

module.exports = RouteDetailStopsList;
