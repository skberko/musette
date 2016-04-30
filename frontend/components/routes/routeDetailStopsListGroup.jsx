var React = require('react');
// var Tab = require("react-bootstrap").Tab;
var RouteDetailStopsListGroupItem = require('./routeDetailStopsListGroupItem.jsx')

var RouteDetailStopsListGroup = React.createClass({
  getInitialState: function () {
    return { places: PlaceStore.all() };
  },

  convertMetersToMiles: function (distanceInMeters) {
    return Number(distanceInMeters) / 1609.344
  },

  render: function () {
    if (this.props.stopGroup.places.length === 0) {
      return(
        <div>
          Sorry, there do not appear to be any stopping points here.
        </div>
      )
    }

    return(
      <div>
        {this.props.stopGroup.places.map(function (stopGroupPlace, index) {
          return(<RouteDetailStopsListGroupItem
                key={index}
                stopGroupPlace={stopGroupPlace}/>);
        })}
      </div>
    )
  }
})

module.exports = RouteDetailStopsListGroup;
