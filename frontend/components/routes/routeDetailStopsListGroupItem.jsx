var React = require('react');

var RouteDetailStopsListGroupItem = React.createClass({
  getInitialState: function () {
    return { places: PlaceStore.all() };
  },

  render: function () {
    return(
      <li>I am a RouteDetailStopsListGroupItem item for {this.props.stopGroupPlace.name}.</li>
    );
  }
})

module.exports = RouteDetailStopsListGroupItem;
