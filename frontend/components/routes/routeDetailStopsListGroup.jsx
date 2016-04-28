var React = require('react');

var RouteDetailStopsListGroup = React.createClass({
  getInitialState: function () {
    return { places: PlaceStore.all() };
  },

  render: function () {
    return(
      <li>I am the RouteDetailStopsListGroup for group: {this.props.stopGroupId + 1}</li>
    );
  }
})

module.exports = RouteDetailStopsListGroup;
