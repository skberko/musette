var React = require('react');

var RouteDetailStopsListGroupItem = React.createClass({
  getInitialState: function () {
    return { places: PlaceStore.all() };
  },

  render: function () {
    return(
      <h6>I am a RouteDetailStopsListGroupItem component.</h6>
    );
  }
})

module.exports = RouteDetailStopsListGroupItem;
