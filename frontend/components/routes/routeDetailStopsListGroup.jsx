var React = require('react');
// var Tab = require("react-bootstrap").Tab;
var RouteDetailStopsListGroupItem = require('./routeDetailStopsListGroupItem.jsx')

var RouteDetailStopsListGroup = React.createClass({
  getInitialState: function () {
    return { places: PlaceStore.all() };
  },

  convertMetersToRoundedMiles: function (distanceInMeters) {
    return Math.round(Number(distanceInMeters) / 1609.344 * 10) / 10
  },

  render: function () {
    var distanceInMiles =
      this.convertMetersToRoundedMiles(this.props.stopGroup.distanceIntoRoute);


    if (this.props.stopGroup.places.length === 0) {
      return(
        <div>This stop is at mile: {distanceInMiles}<br/>
          Sorry, there do not appear to be any stopping points here.
        </div>
      )
    }

    return(
      <div>
        This stop is at mile: {distanceInMiles}
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
